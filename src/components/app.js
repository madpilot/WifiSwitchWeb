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
      network: {
        ssid: "",
        encryption: "7",
        passkey: '',
        scan: true
      }
    };
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
              scan={this.state.network.scan} 
              ssid={this.state.network.ssid} 
              encryption={this.state.network.encryption} 
              passkey={this.state.network.passkey} 
              onUpdate={this.updateNetwork.bind(this)} 
              />
            <NetworkPanel />
            <MQTTPanel />
            <SyslogPanel />
          </form>
        </div>
      </div>
    )
  }
}
