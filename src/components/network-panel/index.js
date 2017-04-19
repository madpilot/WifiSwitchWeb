import { h, Component } from 'preact';
import Input from '../input';

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
      <section>
        <h3>Network Settings</h3>
        <Input label="Device Name" type="text" placeholder="device" value="" autocomplete="off" autocapitalize="off" value={this.props.deviceName} onInput={this.onFieldChange('deviceName').bind(this)} />

				<div>
					<label>
						<input type="radio" name="dhcp" value="1" checked={this.props.dhcp ? "checked" : null} onChange={this.onDHCPChange.bind(this)} />
						DHCP
					</label>
					<label>
						<input type="radio" name="dhcp" value="0" checked={this.props.dhcp ? null : "checked"} onChange={this.onDHCPChange.bind(this)} />
						Static
					</label>
				</div>

        {this.renderStaticPanel()}
      </section>
    );
  }
}
