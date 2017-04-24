import { h, Component } from 'preact';
import SSID from '../ssid';
import Encryption from '../encryption';
import Input from '../input';
import * as Validation from '../../validation/validator.js';

import styles from './style.css';

const textValidators = [ Validation.required(), Validation.length(255) ];
export default class WifiPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scan: props.scan,
      ssid: props.ssid,
      encryption: props.encryption,
      passkey: props.passkey
    }
  }

  updateAP(state) {
    this.setState(state);

    this.props.onUpdate({
      scan: this.state.scan,
      ssid: this.state.ssid,
      encryption: this.state.encryption,
      passkey: (this.state.encryption == "7" ? "" : this.state.passkey)
    });
  }

  changePasskey(value) {
    this.updateAP({ passkey: value });
  }

  changeEncryption(value) {
    this.updateAP({ encryption: value });
  }

  toggleScan(scan) {
    this.updateAP({ scan: scan });
  }

  renderSSID() {
    return <SSID
            ssid={this.state.ssid}
            encryption={this.state.encryption}
            passkey={this.state.passkey}
            scan={this.state.scan}
            onModeChange={this.toggleScan.bind(this)}
            onChange={this.updateAP.bind(this)}
            />
  }

  renderEncryption() {
    if(this.state.scan) {
      return '';
    } else {
      return <Encryption selected={this.state.encryption} onChange={this.changeEncryption.bind(this)} />
    }
  }

  renderPasskey() {
    if(this.state.encryption != "7") {
      return <Input
              label="Password"
              type="password"
              value={this.state.passkey}
              autocomplete="off"
              autocapitalize="off"
              onChange={this.changePasskey.bind(this)}
              validators={textValidators}
              />
    } else {
      return "";
    }
  }

  render() {
    return (
      <section className={styles.panel}>
        <h3 className={styles.heading}>WiFi Settings</h3>
        {this.renderSSID()}
        {this.renderEncryption()}
        {this.renderPasskey()}
      </section>
    );
  }
}
