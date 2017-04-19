import { h, Component } from 'preact';
import Input from '../input';

export default class SyslogPanel extends Component {
  update(state) {
    this.props.onUpdate(Object.assign({}, this.props, state));
  }

  onFieldChange(field) {
    return (e) => {
      let s = {}
      s[field] = e.target.value;
      this.update(s);
    }
  }

  onSyslogChange(e) {
    if(e.target.checked) {
      this.update({ syslog: false });
    } else {
      this.update({ syslog: true });
    }
  }

  renderForm() {
    if(this.props.syslog) {
      return (
        <div>
          <div>
            <Input label="Server" type="text" placeholder="server.local" value="" autocomplete="off" autocapitalize="off" value={this.props.server} onInput={this.onFieldChange('server').bind(this)}  />
            <Input label="Port" type="number" placeholder="514" min="0" max="32768" value="514" value={this.props.port} onInput={this.onFieldChange('port').bind(this)}  />
          </div>

          <div>
            <label for={this._id}>
              Level
            </label>
            <span>
              <select onInput={this.onFieldChange('level').bind(this)}>
                <option value="0" selected={this.props.level == "0" ? "selected" : null}>Emergency</option>
                <option value="1" selected={this.props.level == "1" ? "selected" : null}>Alert</option>
                <option value="2" selected={this.props.level == "2" ? "selected" : null}>Critical</option>
                <option value="3" selected={this.props.level == "3" ? "selected" : null}>Error</option>
                <option value="4" selected={this.props.level == "4" ? "selected" : null}>Warning</option>
                <option value="5" selected={this.props.level == "5" ? "selected" : null}>Notice</option>
                <option value="6" selected={this.props.level == "6" ? "selected" : null}>Information</option>
                <option value="7" selected={this.props.level == "7" ? "selected" : null}>Debug</option>
              </select>
            </span>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <section>
        <h3>Syslog settings</h3>
        <div>
					<label>
						<input type="checkbox" checked={this.props.syslog ? "checked" : null} onChange={this.onSyslogChange.bind(this)} />
						Send log messages to a remote syslog server
					</label>
				</div>
        {this.renderForm()}
      </section>
    );
  }
}
