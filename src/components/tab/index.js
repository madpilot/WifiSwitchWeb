import { h, Component } from 'preact';

export default class FirmwarePanel extends Component {
  render() {
    if(this.props.current == this.props.name) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
  }
}
