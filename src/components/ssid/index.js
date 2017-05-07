import { h, Component } from 'preact';
import * as Validation from '../../validation/validator.js';
import ValidatedInput from '../validated-input/index.js';
export const SCANNING = 0;
export const SCANNING_COMPLETE = 1;

import styles from './style.css';

const textValidators = [ Validation.required(), Validation.length(255) ];

// This needs a refactor
export default class SSID extends Component {
  constructor(props) {
    super(props);
    this._id = "ssid_" + Math.random().toString(36).substring(2, 7);

    this.state = {
      connection: SCANNING,
      scanned: {
        ssid: this.props.ssid,
        encryption: this.props.encryption
      },
      manual: {
        ssid: this.props.ssid,
        encryption: this.props.encryption
      },
      valid: false,
      error: '',
      aps: []
    };
  }

  scan() {
    this.setState({ connection: SCANNING, aps: [] });

    window.fetch("/aps.json").then((response) => {
      return response.json();
    }).then((aps) => {
      this.setState({
        aps: aps,
        connection: SCANNING_COMPLETE
      });

      if(aps.indexOf(this.state.ssid) > -1) {
        this.changeAp(this.state.ssid);
      } else {
        this.changeAp(aps[0].ssid);
      }
    });
  }

  componentDidMount() {
    if(this.state.connection == SCANNING) {
      this.scan();
    }
  }

  validate(state) {
    this.setState(state)
  }

  setScanMode = e => {
    e.preventDefault();
    this.props.onModeChange(true);
    this.props.onChange(this.state.scanned);
  };

  setManualMode = e => {
    e.preventDefault();
    this.props.onModeChange(false);
    this.props.onChange(this.state.manual);
  };

  setScannedState(state) {
    this.setState({ scanned: Object.assign({}, this.state.scanned, state) });
    this.props.onChange(this.state.scanned);
  }

  setManualState(state) {
    this.setState({ manual: Object.assign({}, this.state.manual, state) });
    this.props.onChange(this.state.manual);
  }

  changeAp(ssid) {
    let ap = this.state.aps.filter((ap) => ap.ssid == ssid);

    if(ap.length > 0) {
      this.setScannedState({ ssid: ap[0].ssid, encryption: ap[0].encryption })
    }
  };

  onChangeAp(e) {
    this.changeAp(e.target.value);
  }

  changeManualSSID(e) {
    this.setManualState({ ssid: e.target.value });
  }

  renderScanning() {
    return (
      <select id={this._id} disabled className={styles.select}>
        <option>Scanning&hellip;</option>
      </select>
    );
  }

  renderAps() {
    let aps = this.state.aps;

    return (
      <div className={styles.wrapper}>
        <select id={this._id} onChange={this.onChangeAp.bind(this)} className={styles['select-ap']} disabled={aps.length == 0}>
          {aps.length > 0 ?
            this.state.aps.map((ap) => {
              return (
                <option value={ap.ssid} key={ap.ssid} selected={this.state.scanned.ssid == ap.ssid ? "selected" : null}>{ap.ssid}</option>
              );
            })
          :
            <option value="">No Access Points Found</option>
          }
        </select>
        <a href="#" className={styles.rescan} onClick={(e) => { e.preventDefault(); this.scan() }}>&#8635;</a>
      </div>
    );
  }

  renderManual() {
    return (
      <ValidatedInput
        type="text"
        autocomplete="off"
        autocapitalize="off"
        value={this.state.manual.ssid}
        id={this._id}
        onInput={this.changeManualSSID.bind(this)}
        onValidate={this.validate.bind(this)}
				className={styles.input}
        validators={textValidators} />
    );
  }

  renderError() {
    if(!this.props.scan && !this.state.valid) {
      return (
        <span className={styles.error}>{this.state.error}</span>
      );
    } else {
      return "";
    }
  }

  renderSelect() {
    if(this.state.connection == SCANNING) {
      return this.renderScanning();
    } else if(this.state.connection == SCANNING_COMPLETE) {
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
