import { h, Component } from 'preact';
import Input from '../input';

export default class MQTTPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <h3>MQTT settings</h3>
        <div>
          <Input label="Server" type="text" placeholder="server.local" value="" autocomplete="off" autocapitalize="off" />
          <Input label="Port" type="number" placeholder="1883" min="0" max="32768" value="1883" />
        </div>

        <Input label="Username" type="text" autocomplete="off" autocapitalize="off" />
        <Input label="Password" type="password" autocomplete="off" autocapitalize="off" />
        
        <Input label="Publish Channel" type="text" autocomplete="off" autocapitalize="off" />
        <Input label="Subscribe Channel" type="text" autocomplete="off" autocapitalize="off" />
      </section>
    );
  }
}
