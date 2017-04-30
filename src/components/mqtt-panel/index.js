import { h, Component } from 'preact';
import Input from '../input';
import BinaryInput from '../binary-input';
import * as Validation from '../../validation/validator.js';

export const AUTH_MODE_NONE = '0';
export const AUTH_MODE_USERNAME = '1';
export const AUTH_MODE_CERTIFICATE = '2';

const MQTT_PORT = '1883';
const MQTT_SECURE_PORT = '8883';

const TEXT_VALIDATORS = [ Validation.required(), Validation.length(255) ];

import styles from './style.css';

export default class MQTTPanel extends Component {
  constructor(props) {
    super(props);

    let certAuthMode = this.props.mqttAuthMode == AUTH_MODE_CERTIFICATE;
    let ssl = certAuthMode ? true : this.props.mqttTLS;

    this.state = Object.assign({}, props, {
      ssl: ssl,
      sslDisabled: certAuthMode,
      portChanged: this.props.mqttPort != "",
      portDefault: this.defaultPort(ssl)
    })

    if(!this.state.portChanged) {
      this.props.onUpdate({ mqttPort: this.state.portDefault });
    }
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

    let props = { mqttTLS: ssl };
    if(!this.state.portChanged) {
      props.mqttPort = portDefault;
    }
    this.props.onUpdate(props);
  }

  renderUsernameAuth() {
    if(this.props.mqttAuthMode == AUTH_MODE_USERNAME) {
      return (
        <div>
          <Input
            label="Username"
            name="mqttUsername"
            type="text"
            autocomplete="off"
            autocapitalize="off"
            value={this.props.mqttUsername}
            onInput={this.onFieldChange('mqttUsername').bind(this)}
            validators={TEXT_VALIDATORS}
          />

          <Input
            label="Password"
            name="mqttPassword"
            type="password"
            autocomplete="off"
            autocapitalize="off"
            value={this.props.mqttPassword}
            onInput={this.onFieldChange('mqttPassword').bind(this)}
            validators={TEXT_VALIDATORS} />
        </div>
       );
    } else {
      return "";
    }
  }

  renderCertificateAuth() {
    if(this.props.mqttAuthMode == AUTH_MODE_CERTIFICATE) {
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
            name="mqttServerName"
            type="text"
            placeholder="server.local"
            value={this.props.mqttServerName}
            autocomplete="off"
            autocapitalize="off"
            onInput={this.onFieldChange('mqttServerName').bind(this)}
            className={styles.server}
            validators={TEXT_VALIDATORS}
            />

          <Input
            label="Port"
            name="mqttPort"
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
          <BinaryInput
            label="Use SSL"
            name="mqttTLS"
            type="checkbox"
            checked={this.props.mqttTLS}
            disabled={this.state.sslDisabled}
            onChange={this.onSSLChange.bind(this)}
            />
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
                checked={this.props.mqttAuthMode == mode[0]}
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
            name="mqttPublishChannel"
            type="text"
            value={this.props.mqttPublishChannel}
            autocomplete="off"
            autocapitalize="off"
            onInput={this.onFieldChange('mqttPublishChannel').bind(this)}
            validators={TEXT_VALIDATORS}
            />

          <Input
            label="Subscribe Channel"
            name="mqttSubscribeChannel"
            type="text"
            value={this.props.mqttSubscribeChannel}
            autocomplete="off"
            autocapitalize="off"
            onInput={this.onFieldChange('mqttSubscribeChannel').bind(this)}
            validators={TEXT_VALIDATORS}
            />
        </section>
      </section>
    );
  }
}
