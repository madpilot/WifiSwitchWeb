import { h, Component } from 'preact';

import Header from './header';
import NetworkPanel from './network-panel';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      network: {
        ssid: {
          selected: "",
          scan: true
        }
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
            <NetworkPanel network={this.state.network} onUpdate={this.updateNetwork.bind(this)} />
          </form>
        </div>
      </div>
    )
  }
}
