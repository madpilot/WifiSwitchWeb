import { h, Component } from 'preact';
import Input from '../input';
import BinaryInput from '../binary-input';
import Select from '../select';

import { cleanProps } from '../../lib/utilities/index.js';
import * as Validation from '../../validation/validator.js';

import styles from './style.css';
const levels = ["Emergency", "Alert", "Critical", "Error", "Warning", "Notice", "Information", "Debug"]

export default class SyslogPanel extends Component {
  update(state) {
    this.props.onUpdate(cleanProps(Object.assign({}, this.props, state)));
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
    if(this.props.syslog) {
      var validators = [ Validation.required() ];

      return (
        <div class={styles.form}>
          <section class={styles['server-port']}>
            <Input
              label="Server" 
              type="text" 
              placeholder="server.local" 
              autocomplete="off" 
              autocapitalize="off" 
              value={this.props.syslogHost} 
              onInput={this.onFieldChange('server').bind(this)} 
              className={styles.server} 
              validators={validators}
              />

            <Input 
              label="Port" 
              type="number" 
              placeholder="514" 
              min="0" 
              max="32768" 
              value={this.props.syslogPort} 
              onInput={this.onFieldChange('port').bind(this)} 
              className={styles.port} />
          </section>

          <Select label="Level" onInput={this.onFieldChange('level').bind(this)} value={this.props.syslogLevel}>
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
      <section className={styles.panel}>
        <h3 className={styles.heading}>Syslog settings</h3>
        <BinaryInput 
          label="Send logs to a remote syslog server" 
          type="checkbox" 
          checked={this.props.syslog} 
          onChange={this.onSyslogChange.bind(this)} />
        {this.renderForm()}
      </section>
    );
  }
}
