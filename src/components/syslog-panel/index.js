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
					<label>
						<input type="checkbox" value="1" checked />
						Enable
					</label>
				</div> 
  
        
        <div>
          <Input label="Server" type="text" placeholder="server.local" value="" autocomplete="off" autocapitalize="off" />
          <Input label="Port" type="number" placeholder="514" min="0" max="32768" value="514" />
        </div>

        <div>
          <label for={this._id}>
            Level
          </label>
          <span>
            <select>
              <option value="0">Emergency</option>
              <option value="1">Alert</option>
              <option value="2">Critical</option>
              <option value="3">Error</option>
              <option value="4">Warning</option>
              <option value="5">Notice</option>
              <option value="6">Information</option>
              <option value="7">Debug</option>
            </select>
          </span>
        </div>

      </section>
    );
  }
}
