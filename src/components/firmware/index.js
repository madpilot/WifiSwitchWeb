import { h, Component } from 'preact';
import Input from '../input';

export default class FirmwarePanel extends Component {
  render() {
    return (
      <section>
        <h3>Update the firmware</h3>
        <Input label="Firmware" type="file" />
      </section>
    );
  }
}
