import { h, Component } from 'preact';

import Header from './header';
import NetworkPanel from './network-panel';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      network: {
        ssid: "",
        encryption: 7,
        passkey: '',
        scan: true
      }
    };
  }

  updateNetwork(network) {
    this.setState({ network: network });
    console.log('updateNetwork', this.state);
  }

  render() {
    return (
      <div id="app">
        <Header />
        <div>
          <form>
            <NetworkPanel 
              scan={this.state.network.scan} 
              ssid={this.state.network.ssid} 
              encryption={this.state.network.encryption} 
              passkey={this.state.network.passkey} 
              onUpdate={this.updateNetwork.bind(this)} 
              />
          </form>
        </div>
      </div>
    )
  }
}
