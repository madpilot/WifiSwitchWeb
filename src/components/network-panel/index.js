import { h, Component } from 'preact';
import SSID from '../ssid';

export default class NetworkPanel extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.network;
  }

  updateSSID(ssid) {
    this.setState({ ssid: Object.assign({}, this.state.ssid, { selected: ssid }) })
    this.props.onUpdate({ ssid: this.state.ssid });
  }

  toggleScan(scan) {
    this.setState({ ssid: Object.assign({}, this.state.ssid, { scan: scan }) })
    this.props.onUpdate({ ssid: this.state.ssid });
  }

  render() {
    return (
      <section>
        <SSID scan={this.state.ssid.scan} selected={this.state.ssid.selected} onModeChange={this.toggleScan.bind(this)} onChange={this.updateSSID} />
      </section>
    );
  }
}
