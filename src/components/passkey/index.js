import { h, Component } from 'preact';

export default class Passkey extends Component {
  constructor() {
    super();
    this._id = "passkey_" + Math.random().toString(36).substring(2, 7);
  }

  render() {
    return (
      <div>
        <label for={this._id}>
          Password
        </label>
        <span>
          <input type="password" autocomplete="off" autocapitalize="off" id={this.id} onInput={(e) => { this.props.onChange(e.target.value) }} />
        </span>
      </div>
    );
  }
}
