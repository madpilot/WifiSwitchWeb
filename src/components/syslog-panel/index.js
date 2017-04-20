import { h, Component } from 'preact';
import Input from '../input';
import Select from '../select';

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
      this.update({ syslog: true });
    } else {
      this.update({ syslog: false });
    }
  }

  renderForm() {
    const levels = ["Emergency", "Alert", "Critical", "Error", "Warning", "Notice", "Information", "Debug"]
    
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
              <Select onInput={this.onFieldChange('level').bind(this)} value={this.props.level}>
                {Object.keys(levels).map((index) => { return <option value={index}>{levels[index]}</option> })}
              </Select>
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
