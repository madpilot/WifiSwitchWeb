import { h, Component } from 'preact';

import Header from './header';
import Firmware from './firmware';
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

  update(section) {
    return ((settings) => {
      let state = {}
      state[section] = settings;
      this.setState(state);
    });
  }

  render() {
    return (
      <div id="app">
        <Header />
        <form>
          <WifiPanel
            {...this.state.wifi}
            onUpdate={this.update('wifi').bind(this)}
            />
          
          <NetworkPanel
            {...this.state.network}
            onUpdate={this.update('network').bind(this)}
            />

          <MQTTPanel
            {...this.state.mqtt}
            onUpdate={this.update('mqtt').bind(this)}
            />

          <SyslogPanel
            {...this.state.syslog}
            onUpdate={this.update('syslog').bind(this)}
            />
          
          <Firmware />
        </form>
      </div>
    )
  }
}
