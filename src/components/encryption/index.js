import { h, Component } from 'preact';

import Select from '../select';

const NONE = "7";
const WEP = "1";
const WPA = "2";
const WPA2 = "4";

const types = [
  [ NONE, "None" ],
  [ WEP, "WEP" ],
  [ WPA, "WPA Personal" ],
  [ WPA2, "WPA2 Personal" ]
];

export default class Encryption extends Component {
  constructor() {
    super();
    this._id = "encryption_" + Math.random().toString(36).substring(2, 7);
  }

  render() {
    return (
      <div>
        <label for={this._id}>
          Security
        </label>
        <span>
          <Select id={this._id} onChange={(e) => this.props.onChange(e.target.value)} value={this.props.selected}>
            {types.map((type) => {
              return <option value={type[0]}>{type[1]}</option>
            })}
          </Select>
        </span>
      </div>
    );
  }
}
