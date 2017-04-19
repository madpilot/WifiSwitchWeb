import { h, Component } from 'preact';

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
          <select id={this._id} onChange={(e) => this.props.onChange(e.target.value)}>
            {types.map((type) => {
              return <option value={type[0]} selected={this.props.selected == type[0] ? "selected" : null}>{type[1]}</option>
            })}
          </select>
        </span>
      </div>
    );
  }
}
