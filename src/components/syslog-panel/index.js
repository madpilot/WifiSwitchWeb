import { h, Component } from 'preact';
import Input from '../input';

export default class SyslogPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <h3>Syslog settings</h3>
        <div>
          <Input label="Server" type="text" placeholder="server.local" value="" autocomplete="off" autocapitalize="off" />
          <Input label="Port" type="number" placeholder="514" min="0" max="32768" value="514" />
        </div>
      </section>
    );
  }
}
