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
import { cleanProps } from '../lib/utilities/index.js';

import { encode, decode, DEFAULTS as CONFIG_DEFAULTS } from '../lib/config';

const TAB_SETTINGS = 0;
const TAB_FIRMWARE = 1;

import styles from './app.css';

export default class App extends Component {
  constructor() {
    super();
    
    this.state = Object.assign({}, CONFIG_DEFAULTS, {
      scan: true,
      tab: TAB_SETTINGS
    });
    
    setTimeout(() => {
      this.fetchConfig();
    }, 1000);
  }

  fetchConfig() {
    window.fetch("/config.dat").then((response) => {
      return response.text();
    }).then((config) => {
      let decoded = decode(config);
      this.setState(decoded);
      console.log(this.state);
    });
  }

  saveConfig() {

  }

  update(settings) {
    console.log('cleaned', cleanProps(settings));
    this.setState(cleanProps(settings));
    console.log(this.state);
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
              {...this.state}
              onUpdate={this.update.bind(this)}
              />

            <NetworkPanel
              {...this.state}
              onUpdate={this.update.bind(this)}
              />

            <MQTTPanel
              {...this.state}
              onUpdate={this.update.bind(this)}
              />

            <SyslogPanel
              {...this.state}
              onUpdate={this.update.bind(this)}
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
