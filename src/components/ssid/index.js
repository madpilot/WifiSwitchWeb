import { h, Component } from 'preact';
import Validator, * as Validation from '../../validation/validator.js';

const SCANNING = 0;
const SCANNING_COMPLETE = 1;

import styles from './style.css';
const textValidators = [ Validation.required(), Validation.length(255) ];

export default class SSID extends Component {
  constructor(props) {
    super(props);
    this._id = "ssid_" + Math.random().toString(36).substring(2, 7);
    this.validator = new Validator(textValidators);

    this.state = {
      connection: SCANNING_COMPLETE,
      scanned: {
        ssid: this.props.ssid,
        encryption: this.props.encryption
      },
      manual: {
        ssid: this.props.ssid,
        encryption: this.props.encryption
      },
      validate: {
        manual: {
          ssid: {
            valid: false,
            changed: this.props.ssid != "",
            value: this.props.ssid,
            initial: ""
          }
        }
      },
      aps: [{"ssid":"OPTUSVD3C49EE8","rssi":-90,"encryption":"8"},{"ssid":"Dean&Carol.b","rssi":-92,"encryption":"7"},{"ssid":"NETGEAR19","rssi":-76,"encryption":"4"},{"ssid":"Burntos","rssi":-60,"encryption":"4"},{"ssid":"OPTUS_B8EC72","rssi":-89,"encryption":"8"},{"ssid":"OPTUS_A49184","rssi":-85,"encryption":"8"}]
    };
  }

  componentWillMount() {
    if(this.context.validation) {
      this.context.validation.register(this);
    }
  }

  componentWillUnmount() {
    if(this.context.validation) {
      this.context.validation.unregister(this);
    }
  }

  validate() {
    let state = {
      validate: {
        manual: {
          ssid: this.validator.validate(this.state.validate.manual.ssid)
        }
      }
    }
    this.setState(state);
  }

  valid() {
    if(this.props.scan) {
      return true;
    } else {
      return this.state.validate.manual.ssid.valid;
    }
  }

  setScanMode = e => {
    e.preventDefault();
    this.props.onModeChange(true);
    this.props.onChange(this.state.scanned);
    this.validate();
  };

  setManualMode = e => {
    e.preventDefault();
    this.props.onModeChange(false);
    this.props.onChange(this.state.manual);
    this.validate();
  };

  setScannedState(state) {
    this.setState({ scanned: Object.assign({}, this.state.scanned, state) });
    this.props.onChange(this.state.scanned);
  }

  setManualState(state) {
    this.setState({ manual: Object.assign({}, this.state.manual, state) });
    this.props.onChange(this.state.manual);
  }

  changeAp = e => {
    let ap = this.state.aps.filter((ap) => ap.ssid == e.target.value);

    if(ap.length > 0) {
      this.setScannedState({ ssid: ap[0].ssid, encryption: ap[0].encryption })
    }
  };

  changeManualSSID(e) {
    this.setManualState({ ssid: e.target.value });
    this.setState({
      validate: {
        manual: {
          ssid: {
            changed: true,
            value: e.target.value
          }
        }
      }
    });

    this.validate();
  }

  renderScanning() {
    return (
      <select id={this._id} disabled>
        <option>Scanning...</option>
      </select>
    );
  }

  renderAps() {
    return (
      <select id={this._id} onChange={this.changeAp.bind(this)} className={styles.select}>
        {this.state.aps.map((ap) => {
          return (
            <option value={ap.ssid} key={ap.ssid} selected={this.state.scanned.ssid == ap.ssid ? "selected" : null}>{ap.ssid}</option>
          );
        })}
      </select>
    );
  }

  renderManual() {
    return (
      <input
        type="text"
        autocomplete="off"
        autocapitalize="off"
        value={this.state.manual.ssid}
        id={this._id}
        onInput={this.changeManualSSID.bind(this)}
				className={styles.input} />
    );
  }

  renderError() {
    if(!this.props.scan && !this.state.validate.manual.ssid.valid) {
      return (
        <span className={styles.error}>{this.state.validate.manual.ssid.error}</span>
      );
    } else {
      return "";
    }
  }

  renderSelect() {
    if(this.state.connection == SCANNING) {
      return this.renderScanning();
    } else if(this.state.connection == SCANNING_COMPLETE && this.state.aps.length > 0) {
      return this.renderAps();
    } else {
      return '';
    }
  }

  renderInput() {
    if(this.props.scan) {
      return this.renderSelect();
    } else {
      return this.renderManual();
    }
  }

  renderToggle() {
    if(this.props.scan) {
      return <a href="#" onClick={this.setManualMode} className={styles.tab}>Join another network</a>
    } else {
      return <a href="#" onClick={this.setScanMode} className={styles.tab}>Scan for networks</a>
    }
  }

  render() {
    return (
      <div>
        <label for={this._id} className={styles.label}>
          Name
          {this.renderToggle()}
          {this.renderError()}
        </label>
        <span className={styles.wrapper}>
          {this.renderInput()}
        </span>
      </div>
    );
  }
}
