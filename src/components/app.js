import { h, Component } from 'preact';

import Header from './header';
import Tab from './tab';
import Firmware from './firmware';
import WifiPanel from './wifi-panel';
import NetworkPanel from './network-panel';
import MQTTPanel from './mqtt-panel';
import SyslogPanel from './syslog-panel';

const TAB_SETTINGS = 0;
const TAB_FIRMWARE = 1;

import styles from '../modules/app.css';

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
      },
      tab: TAB_SETTINGS
    };
  }

  update(section) {
    return ((settings) => {
      let state = {}
      state[section] = settings;
      this.setState(state);
    });
  }

  changeTab(tab) {
    return((e) => {
      e.preventDefault();
      this.setState({ tab: tab });
    });
  }

  render() {
    return (
      <div id="app" className={styles.container}>
        <Header />

        <nav>
          <ul>
            <li><a href="#" onClick={this.changeTab(TAB_SETTINGS).bind(this)}>Settings</a></li>
            <li><a href="#" onClick={this.changeTab(TAB_FIRMWARE).bind(this)}>Firmware</a></li>
          </ul>
        </nav>

        <form>
          <Tab name={TAB_SETTINGS} current={this.state.tab}>
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
          </Tab>
          <Tab name={TAB_FIRMWARE} current={this.state.tab}>
            <Firmware />
          </Tab>
        </form>
      </div>
    )
  }
}
