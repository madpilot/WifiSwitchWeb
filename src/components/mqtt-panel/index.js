import { h, Component } from 'preact';
import Input from '../input';

const AUTH_MODE_NONE = '0';
const AUTH_MODE_USERNAME = '1';
const AUTH_MODE_CERTIFICATE = '2';

export default class MQTTPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authMode: this.props.authMode,
      ssl: this.props.authMode == AUTH_MODE_CERTIFICATE ? true : this.props.ssl,
      sslDisabled: this.props.authMode == AUTH_MODE_CERTIFICATE
    }
  }

  update(state) {
    this.setState(state);
    this.props.onUpdate({
      authMode: this.state.authMode,
      ssl: this.state.ssl
    });
  }

  onAuthModeChange(e) {
    let mode = e.target.value;
    if(mode == AUTH_MODE_CERTIFICATE) {
      this.setState({ authMode: mode, sslDisabled: true });

      this.props.onUpdate({
        authMode: mode,
        ssl: true
      });
    } else {
      this.setState({ authMode: mode, sslDisabled: false });
      
      this.props.onUpdate({
        authMode: mode,
        ssl: this.state.ssl
      });
    }
  }

  onSSLChange(e) {
    this.update({ ssl: e.target.checked });
  }

  renderUsernameAuth() {
    if(this.state.authMode == AUTH_MODE_USERNAME) {
        return (
          <div>
            <Input label="Username" type="text" autocomplete="off" autocapitalize="off" />
            <Input label="Password" type="password" autocomplete="off" autocapitalize="off" />
          </div>
         );
    } else {
      return "";
    }
  }

  renderSSLCheckbox() {
    return <input type="checkbox" checked={this.props.ssl ? "checked" : null} disabled={this.state.sslDisabled ? "disabled" : null} onChange={this.onSSLChange.bind(this)} />
  }

  render() {
    return (
      <section>
        <h3>MQTT settings</h3>
        
        <div>
          <Input label="Server" type="text" placeholder="server.local" value="" autocomplete="off" autocapitalize="off" />
          <Input label="Port" type="number" placeholder="1883" min="0" max="32768" value="1883" />
        </div>

       	<div>
					<span>Authentication</span>
					<label>
						<input type="radio" name="mqttAuthMode" value={AUTH_MODE_NONE} checked={this.state.authMode == AUTH_MODE_NONE ? "checked" : null} onChange={this.onAuthModeChange.bind(this)} />
						None
					</label>
					<label>
						<input type="radio" name="mqttAuthMode" value={AUTH_MODE_USERNAME} checked={this.state.authMode == AUTH_MODE_USERNAME ? "checked" : null} onChange={this.onAuthModeChange.bind(this)} />
						Username
					</label>
					<label>
						<input type="radio" name="mqttAuthMode" value={AUTH_MODE_CERTIFICATE} checked={this.state.authMode == AUTH_MODE_CERTIFICATE ? "checked" : null} onChange={this.onAuthModeChange.bind(this)} />
						Certificate
					</label>
				</div> 

        <label class="inline-label">
          {this.renderSSLCheckbox()}
          Use SSL
        </label>

        {this.renderUsernameAuth()}
       
        <Input label="Publish Channel" type="text" autocomplete="off" autocapitalize="off" />
        <Input label="Subscribe Channel" type="text" autocomplete="off" autocapitalize="off" />
      </section>
    );
  }
}
