import { h, Component } from 'preact';
import Input from '../input';
import BinaryInput from '../binary-input';
import Select from '../select';

import styles from './style.css';

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
          <section class={styles['server-port']}>
            <Input label="Server" type="text" placeholder="server.local" value="" autocomplete="off" autocapitalize="off" value={this.props.server} onInput={this.onFieldChange('server').bind(this)} className={styles.server}  />
            <Input label="Port" type="number" placeholder="514" min="0" max="32768" value="514" value={this.props.port} onInput={this.onFieldChange('port').bind(this)} className={styles.port}  />
          </section>

          <Select label="Level" onInput={this.onFieldChange('level').bind(this)} value={this.props.level}>
            {Object.keys(levels).map((index) => { return <option value={index}>{levels[index]}</option> })}
          </Select>
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
        <BinaryInput label="Send logs to a remote syslog server" type="checkbox" checked={this.props.syslog ? "checked" : null} onChange={this.onSyslogChange.bind(this)} />
        {this.renderForm()}
      </section>
    );
  }
}
