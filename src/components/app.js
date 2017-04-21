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
      },
      mqtt: {
        server: "",
        port: "",
        authMode: "0",
        ssl: false,
        publishChannel: "",
        subscribeChannel: ""
      },
      syslog: {
        syslog: true,
        server: "",
        port: "",
        level: "6"
      }
    };
  }

  updateWifi(wifi) {
    this.setState({ wifi: wifi });
  }

  updateNetwork(network) {
    this.setState({ network: network });
  }

  updateMQTT(mqtt) {
    this.setState({ mqtt: mqtt });
  }

  updateSyslog(syslog) {
    this.setState({ syslog: syslog });
  }

  render() {
    console.log(this.state);
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

            <MQTTPanel
              server={this.state.mqtt.server}
              port={this.state.mqtt.port}
              authMode={this.state.mqtt.authMode}
              ssl={this.state.mqtt.ssl}
              publishChannel={this.state.mqtt.publishChannel}
              subscribeChannel={this.state.mqtt.subscribeChannel}
              onUpdate={this.updateMQTT.bind(this)}
              />

            <SyslogPanel
              syslog={this.state.syslog.syslog}
              server={this.state.syslog.server}
              port={this.state.syslog.port}
              level={this.state.syslog.level}
              onUpdate={this.updateSyslog.bind(this)}
              />
          </form>
        </div>
      </div>
    )
  }
}
