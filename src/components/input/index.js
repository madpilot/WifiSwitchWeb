import { h, Component } from 'preact';
import styled from 'styled-components';

const StyledInput = styled.input`
  color: blue;
`

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
          <StyledInput id={this._id} {...props} />
        </span>
      </div>
    );
  }
}
