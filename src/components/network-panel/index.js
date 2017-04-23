import { h, Component } from 'preact';
import Input from '../input';
import BinaryInput from '../binary-input';
import styles from './style.css';

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
      return (
        <div>
          <Input label="IP Address" type="text" autocomplete="off" autocapitalize="off" value={this.props.ipAddress} onInput={this.onFieldChange('ipAddress').bind(this)} />
          <Input label="DNS Server" type="password" autocomplete="off" autocapitalize="off" value={this.props.dnsServer} onInput={this.onFieldChange('dnsServer').bind(this)} />
          <Input label="Gateway" type="text" autocomplete="off" autocapitalize="off" value={this.props.gateway} onInput={this.onFieldChange('gateway').bind(this)} />
          <Input label="Subnet" type="text" autocomplete="off" autocapitalize="off" value={this.props.subnet} onInput={this.onFieldChange('subnet').bind(this)} />
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
        <Input label="Device Name" type="text" placeholder="device" value="" autocomplete="off" autocapitalize="off" value={this.props.deviceName} onInput={this.onFieldChange('deviceName').bind(this)} />

				<div className={styles.group}>
          <BinaryInput type="radio" name="dhcp" label="DHCP" inline={true} value="1" checked={this.props.dhcp ? "checked" : null} onChange={this.onDHCPChange.bind(this)} />
          <BinaryInput type="radio" name="dhcp" label="Static" inline={true} value="0" checked={this.props.dhcp ? null : "checked"} onChange={this.onDHCPChange.bind(this)} />
				</div>

        {this.renderStaticPanel()}
      </section>
    );
  }
}
