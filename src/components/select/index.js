import { h, Component } from 'preact';

export default class Select extends Component {
  renderOption(option) {
    if(option.nodeName != "option") {
      return option;
    }

    if(this.props.value == option.attributes.value) {
      option.attributes.selected = "selected";
    }
    
    return option;
  }

  render() {
    return (
      <select {...this.props}>
        {this.props.children.map((c) => { return this.renderOption(c) })}
      </select>
    );
  }
}
