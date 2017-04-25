import { h, Component } from 'preact';
import Input from '../input';
import BinaryInput from '../binary-input';
import styles from './style.css';
import * as Validation from '../../validation/validator.js';

const textValidators = [ Validation.required(), Validation.length(255) ];
export default class NetworkPanel extends Component {
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

  onDHCPChange(e) {
    if(e.target.value == "1") {
      this.update({ dhcp: true });
    } else {
      this.update({ dhcp: false });
    }
  }

  renderStaticPanel() {
    if(!this.props.dhcp) {
      const fields = { ipAddress: "IP Address", dnsServer: "DNS Server", gateway: "Gateway", subnet: "Subnet" };
      return (
        <div>
          {Object.keys(fields).map((key) => {
            return <Input label={fields[key]} type="text" autocomplete="off" autocapitalize="off" value={this.props[key]} onInput={this.onFieldChange(key).bind(this)} validators={textValidators} />
          })}
        </div>
      );
    } else {
      return ""
    }
  }

  render() {
    return (
      <section className={styles.panel}>
        <h3 className={styles.heading}>Network Settings</h3>
        <Input label="Device Name" type="text" placeholder="device" value="" autocomplete="off" autocapitalize="off" value={this.props.deviceName} onInput={this.onFieldChange('deviceName').bind(this)} validators={textValidators}  />

				<div className={styles.group}>
          <BinaryInput type="radio" name="dhcp" label="DHCP" value="1" checked={this.props.dhcp ? "checked" : null} onChange={this.onDHCPChange.bind(this)} />
          <BinaryInput type="radio" name="dhcp" label="Static" value="0" checked={this.props.dhcp ? null : "checked"} onChange={this.onDHCPChange.bind(this)} />
				</div>

        {this.renderStaticPanel()}
      </section>
    );
  }
}
