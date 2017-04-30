import { h, Component } from 'preact';
import Input from '../input';
import BinaryInput from '../binary-input';

import * as Validation from '../../validation/validator.js';

const AUTH_MODE_NONE = '0';
const AUTH_MODE_USERNAME = '1';
const AUTH_MODE_CERTIFICATE = '2';

const MQTT_PORT = 1883;
const MQTT_SECURE_PORT = 8883;

import styles from './style.css';

const textValidators = [ Validation.required(), Validation.length(255) ];
export default class MQTTPanel extends Component {
  constructor(props) {
    super(props);

    let certAuthMode = this.props.authMode == AUTH_MODE_CERTIFICATE;
    let ssl = certAuthMode ? true : this.props.ssl;

    this.state = Object.assign({}, props, {
      ssl: ssl,
      sslDisabled: certAuthMode,
      portChanged: this.props.port != "",
      portDefault: this.defaultPort(ssl)
    })

    this.props.onUpdate({ mqttPort: this.state.portChanged ? this.props.mqttPort : this.state.portDefault });
  }

  defaultPort(ssl) {
    return ssl ? MQTT_SECURE_PORT : MQTT_PORT;
  }

  update(state) {
    this.setState(state);
    this.props.onUpdate(state);
  }

  onFieldChange(field) {
    return (e) => {
      let s = {}
      s[field] = e.target.value;
      this.update(s);
    }
  }

  onPortChange(e) {
    this.setState({ portChanged: true });
    this.props.onUpdate({ mqttPort: e.target.value });
  }

  onAuthModeChange(e) {
    let mode = e.target.value;
    let port = this.props.mqttPort;
    if(mode == AUTH_MODE_CERTIFICATE) {
      this.setState({ authMode: mode, sslDisabled: true, portDefault: this.defaultPort(true) });

      this.props.onUpdate({
        mqttAuthMode: mode,
        mqttTLS: true,
        mqttPort: port || MQTT_SECURE_PORT
      });
    } else {
      this.setState({ authMode: mode, sslDisabled: false, portDefault: this.defaultPort(false) });

      this.props.onUpdate({
        mqttAuthMode: mode,
        mqttTLS: this.state.ssl,
        mqttPort: port || MQTT_PORT
      });
    }
  }

  onSSLChange(e) {
    let ssl = e.target.checked;
    let portDefault = this.defaultPort(ssl);
    this.setState({ ssl: ssl, portDefault: portDefault });
    this.props.onUpdate({ mqttTLS: ssl, mqttPort: this.state.portChanged ? this.props.port : portDefault });
  }

  renderUsernameAuth() {
    if(this.state.mqttAuthMode == AUTH_MODE_USERNAME) {
      return (
        <div>
          <Input
            label="Username"
            type="text"
            autocomplete="off"
            autocapitalize="off"
            value={this.props.mqttUsername}
            onInput={this.onFieldChange('mqttSsername').bind(this)}
            validators={textValidators}
          />

          <Input
            label="Password"
            type="password"
            autocomplete="off"
            autocapitalize="off"
            value={this.props.mqttPassword}
            onInput={this.onFieldChange('mqttPassword').bind(this)}
            validators={textValidators} />
        </div>
       );
    } else {
      return "";
    }
  }

  renderCertificateAuth() {
    if(this.state.mqttAuthMode == AUTH_MODE_CERTIFICATE) {
      return (
        <div>
          <Input label="Certificate" type="file" />
          <Input label="Key" type="file" />
        </div>
      );
    } else {
      return "";
    }
  }

  renderSSLCheckbox() {
    return <BinaryInput
      label="Use SSL"
      type="checkbox"
      checked={this.props.mqttTLS ? "checked" : null}
      disabled={this.state.sslDisabled ? "disabled" : null}
      onChange={this.onSSLChange.bind(this)}
      />
  }

  render() {
    const authModes = [
      [ AUTH_MODE_NONE, "None" ],
      [ AUTH_MODE_USERNAME, "Username" ],
      [ AUTH_MODE_CERTIFICATE, "Certificate" ]
    ]

    return (
      <section className={styles.panel}>
        <h3 className={styles.heading}>MQTT settings</h3>

        <section class={styles['server-port']}>
          <Input
            label="Server"
            type="text"
            placeholder="server.local"
            value={this.props.mqttServerName}
            autocomplete="off"
            autocapitalize="off"
            onInput={this.onFieldChange('mqttServerName').bind(this)}
            className={styles.server}
            validators={textValidators}
            />

          <Input
            label="Port"
            type="number"
            placeholder={this.state.portDefault}
            min="0"
            max="32768"
            value={this.state.portChanged ? this.props.mqttPort : null}
            onInput={this.onPortChange.bind(this)}
            className={styles.port}
            />
        </section>

       	<section className={styles['ssl-panel']}>
          {this.renderSSLCheckbox()}
        </section>

       	<section className={styles['auth-panel']}>
					<span className={styles.label}>Authentication</span>

          <div className={styles.group}>
            {(authModes).map((mode) => {
              return <BinaryInput
                label={mode[1]}
                type="radio"
                name="mqttAuthMode"
                value={mode[0]}
                checked={this.state.mqttAuthMode == mode[0] ? "checked" : null}
                onChange={this.onAuthModeChange.bind(this)}
                />
            })}
          </div>
        </section>

        {this.renderUsernameAuth()}
        {this.renderCertificateAuth()}

        <section>
          <Input
            label="Publish Channel"
            type="text"
            value={this.props.mqttPublishChannel}
            autocomplete="off"
            autocapitalize="off"
            onInput={this.onFieldChange('mqttPublishChannel').bind(this)}
            validators={textValidators}
            />

          <Input
            label="Subscribe Channel"
            type="text"
            value={this.props.mqttSubscribeChannel}
            autocomplete="off"
            autocapitalize="off"
            onInput={this.onFieldChange('mqttSubscribeChannel').bind(this)}
            validators={textValidators}
            />
        </section>
      </section>
    );
  }
}
