import { h, Component } from 'preact';

import Header from './header';
import Tab from './tab';
import Firmware from './firmware';
import WifiPanel from './wifi-panel';
import NetworkPanel from './network-panel';
import MQTTPanel from './mqtt-panel';
import SyslogPanel from './syslog-panel';
import Button from './button';

import Form from '../validation/form';

import { encode, decode } from '../lib/config';

const TAB_SETTINGS = 0;
const TAB_FIRMWARE = 1;

import styles from './app.css';

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
    setTimeout(() => {
    this.fetchConfig();
    }, 1000);
  }

  fetchConfig() {
    window.fetch("/config.dat").then((response) => {
      return response.text();
    }).then((config) => {
      let decoded = decode(config);
      console.log(decoded);
      this.setState({
        wifi: {
          ssid: decoded.ssid,
          encryption: decoded.encryption,
          passkey: decoded.passkey,
          scan: false
        },
        network: {
          deviceName: decoded.deviceName,
          dhcp: decoded.dhcp,
          ipAddress: decoded.staticIP,
          dnsServer: decoded.staticDNS,
          gateway: decoded.staticGateway,
          subnet: decoded.staticSubnet
        },
        mqtt: {
          server: decoded.mqttServerName,
          port: decoded.mqttPort,
          authMode: decoded.mqttAuthMode,
          ssl: decoded.mqttTLS,
          publishChannel: decoded.mqttPublishChannel,
          subscribeChannel: decoded.mqttSubscribeChannel
        },
        syslog: {
          syslog: decoded.syslog,
          server: decoded.syslogHost,
          port: decoded.syslogPort,
          level: decoded.syslogLevel
        }
      });
    });
    console.log(this.state);
  }

  saveConfig() {

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
          <ul className={styles.tabs}>
            <li><a href="#" className={this.state.tab == TAB_SETTINGS ? styles['current-tab'] : styles.tab} onClick={this.changeTab(TAB_SETTINGS).bind(this)}>Settings</a></li>
            <li><a className={this.state.tab == TAB_FIRMWARE ? styles['current-tab'] : styles.tab} href="#" onClick={this.changeTab(TAB_FIRMWARE).bind(this)}>Firmware</a></li>
          </ul>
        </nav>

        <Tab name={TAB_SETTINGS} current={this.state.tab}>
          <Form class={styles.form}>
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

            <Button>Save</Button>
          </Form>
        </Tab>
        <Tab name={TAB_FIRMWARE} current={this.state.tab}>
          <Form class={styles.form}>
            <Firmware />
            <Button>Upload</Button>
          </Form>
        </Tab>
      </div>
    )
  }
}
