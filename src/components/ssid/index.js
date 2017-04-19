import { h, Component } from 'preact';

const SCANNING = 0;
const SCANNING_COMPLETE = 1;

export default class SSID extends Component {
  constructor() {
    super();
    this.state = {
      connection: SCANNING_COMPLETE,
      aps: [
        { ssid: 'Burntos' }
      ]
    };
  }

  setScanMode = e => {
    e.preventDefault();
    this.props.onModeChange(true);
  };

  setManualMode = e => {
    e.preventDefault();
    this.props.onModeChange(false);
  };

  renderScanning() {
    return (
      <select id="ssid" disabled>
        <option>Scanning...</option>
      </select>
    );
  }

  renderAps() {
    return (
      <select id="ssid">
        {this.state.aps.map((ap) => {
          return (
            <option value={ap.ssid} key={ap.ssid} selected={this.props.selected == ap.ssid ? "selected" : null}>{ap.ssid}</option>
          );
        })}
      </select>
    );
  }

  renderManual() {
    return (
      <input type="text" autocomplete="off" autocapitalize="off" value={this.props.selected} />
    );
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
      return <a href="#" onClick={this.setManualMode}>Join another network</a>
    } else {
      return <a href="#" onClick={this.setScanMode}>Scan for networks</a>
    }
  }

  render() {
    return (
      <div>
        <label for="ssid">
          Name
          {this.renderToggle()}
        </label>
        <span class="wrapper">
          {this.renderInput()}
        </span>
      </div>
    );
  }
}
