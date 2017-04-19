import { h, Component } from 'preact';

export default class Input extends Component {
  constructor() {
    super();
    this._id = "input_" + Math.random().toString(36).substring(2, 7);
  }

  render() {
    let props = Object.assign({}, this.props);
    delete props['label'];

    return (
      <div>
        <label for={this._id}>
          {this.props.label}
        </label>
        <span>
          <input id={this._id} {...props} />
        </span>
      </div>
    );
  }
}
