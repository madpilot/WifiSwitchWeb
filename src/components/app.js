import { h, Component } from 'preact';

import Header from './header';
import WifiPanel from './wifi-panel';
import NetworkPanel from './network-panel';
import MQTTPanel from './mqtt-panel';
import SyslogPanel from './syslog-panel';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      wifi: {
        ssid: "",
        encryption: "7",
        passkey: '',
        scan: true
      },
      network: {
        deviceName: "",
        dhcp: true,
        ipAddress: "",
        dnsServer: "",
        gateway: "",
        subnet: ""
      }
    };
  }

  updateWifi(wifi) {
    this.setState({ wifi: wifi });
  }

  updateNetwork(network) {
    this.setState({ network: network });
  }

  render() {
    return (
      <div id="app">
        <Header />
        <div>
          <form>
            <WifiPanel
              scan={this.state.wifi.scan}
              ssid={this.state.wifi.ssid}
              encryption={this.state.wifi.encryption}
              passkey={this.state.wifi.passkey}
              onUpdate={this.updateWifi.bind(this)}
              />
            <NetworkPanel
              deviceName={this.state.network.deviceName}
              dhcp={this.state.network.dhcp}
              ipAddress={this.state.network.ipAddress}
              dnsServer={this.state.network.dnsServer}
              gateway={this.state.network.gateway}
              subnet={this.state.network.subnet}
              onUpdate={this.updateNetwork.bind(this)}
              />

            <MQTTPanel />
            <SyslogPanel />
          </form>
        </div>
      </div>
    )
  }
}
