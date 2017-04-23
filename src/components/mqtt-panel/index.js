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

    this.updateProps({ port: this.state.portChanged ? this.props.port : this.state.portDefault });
  }

  defaultPort(ssl) {
    return ssl ? MQTT_SECURE_PORT : MQTT_PORT;
  }

  updateProps(state) {
    let newProps = Object.assign({}, {
      server: this.props.server,
      port: this.props.port,
      authMode: this.props.authMode,
      ssl: this.props.ssl,
      publishChannel: this.props.publishChannel,
      subscribeChannel: this.props.subscribeChannel
    });
    Object.keys(newProps).forEach((key) => {
      if(typeof(state[key]) != "undefined") {
        newProps[key] = state[key];
      }
    });
    this.props.onUpdate(newProps);
  }

  update(state) {
    this.setState(state);
    this.updateProps(state);
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
    this.update({ port: e.target.value });
  }

  onAuthModeChange(e) {
    let mode = e.target.value;
    let port = this.props.port;
    if(mode == AUTH_MODE_CERTIFICATE) {
      this.setState({ authMode: mode, sslDisabled: true, portDefault: this.defaultPort(true) });

      this.updateProps({
        authMode: mode,
        ssl: true,
        port: port || MQTT_SECURE_PORT
      });
    } else {
      this.setState({ authMode: mode, sslDisabled: false, portDefault: this.defaultPort(false) });

      this.updateProps({
        authMode: mode,
        ssl: this.state.ssl,
        port: port || MQTT_PORT
      });
    }
  }

  onSSLChange(e) {
    let ssl = e.target.checked;
    let portDefault = this.defaultPort(ssl);
    this.setState({ ssl: ssl, portDefault: portDefault });
    this.updateProps({ ssl: ssl, port: this.state.portChanged ? this.props.port : portDefault });
  }

  renderUsernameAuth() {
    if(this.state.authMode == AUTH_MODE_USERNAME) {
      var validators = [ Validation.required() ];

      return (
        <div>
          <Input label="Username" type="text" autocomplete="off" value={this.props.username} autocapitalize="off" onInput={this.onFieldChange('username').bind(this)} validators={validators} />
          <Input label="Password" type="password" autocomplete="off" value={this.props.password} autocapitalize="off" onInput={this.onFieldChange('password').bind(this)} validators={validators} />
        </div>
       );
    } else {
      return "";
    }
  }

  renderCertificateAuth() {
    if(this.state.authMode == AUTH_MODE_CERTIFICATE) {
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
    return <BinaryInput label="Use SSL" type="checkbox" checked={this.props.ssl ? "checked" : null} disabled={this.state.sslDisabled ? "disabled" : null} onChange={this.onSSLChange.bind(this)} />
  }

  render() {
    return (
      <section className={styles.panel}>
        <h3 className={styles.heading}>MQTT settings</h3>

        <section class={styles['server-port']}>
          <Input label="Server" type="text" placeholder="server.local" value={this.props.server} autocomplete="off" autocapitalize="off" onInput={this.onFieldChange('server').bind(this)} className={styles.server} validators={[Validation.required()]} />
          <Input label="Port" type="number" placeholder={this.state.portDefault} min="0" max="32768" value={this.state.portChanged ? this.props.port : null} onInput={this.onPortChange.bind(this)} className={styles.port} />
        </section>

       	<section className={styles['ssl-panel']}>
          {this.renderSSLCheckbox()}
        </section>

       	<section className={styles['auth-panel']}>
					<span className={styles.label}>Authentication</span>

          <div className={styles.group}>
            <BinaryInput label="None" type="radio" name="mqttAuthMode" value={AUTH_MODE_NONE} checked={this.state.authMode == AUTH_MODE_NONE ? "checked" : null} onChange={this.onAuthModeChange.bind(this)} />
            <BinaryInput label="Username" type="radio" name="mqttAuthMode" value={AUTH_MODE_USERNAME} checked={this.state.authMode == AUTH_MODE_USERNAME ? "checked" : null} onChange={this.onAuthModeChange.bind(this)} />
            <BinaryInput label="Certificate" type="radio" name="mqttAuthMode" value={AUTH_MODE_CERTIFICATE} checked={this.state.authMode == AUTH_MODE_CERTIFICATE ? "checked" : null} onChange={this.onAuthModeChange.bind(this)} />
          </div>
        </section>

        {this.renderUsernameAuth()}
        {this.renderCertificateAuth()}

        <section>
          <Input label="Publish Channel" type="text" value={this.props.publishChannel} autocomplete="off" autocapitalize="off" onInput={this.onFieldChange('publishChannel').bind(this)} validators={ [ Validation.required() ] }  />
          <Input label="Subscribe Channel" type="text" value={this.props.subscribeChannel} autocomplete="off" autocapitalize="off" onInput={this.onFieldChange('subscribeChannel').bind(this)} validators={ [ Validation.required() ] } />
        </section>
      </section>
    );
  }
}
