import { h, Component } from 'preact';
import Input from '../input';

export default class DHCPPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <h3>IP Address</h3>
        
        <Input label="IP Address" type="text" autocomplete="off" autocapitalize="off" />
        <Input label="DNS Server" type="password" autocomplete="off" autocapitalize="off" />
        <Input label="Gateway" type="text" autocomplete="off" autocapitalize="off" />
        <Input label="Subnet" type="text" autocomplete="off" autocapitalize="off" />
      </section>
    );
  }
}
