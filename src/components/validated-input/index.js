import { h, Component } from 'preact';
import Validator from '../../validation/validator.js';

export default class ValidatedInput extends Component {
  constructor(props) {
    super(props);
    this.validator = new Validator(this.props.validators || []);

    let initial = this.props.initial || "";

    this.state = {
      valid: false,
      changed: this.props.value != initial,
      value: this.props.value,
      initial: initial
    }
    this.validate();
  }

  componentWillMount() {
    if(this.context.validation) {
      this.context.validation.register(this);
    }
  }

  componentWillUnmount() {
    if(this.context.validation) {
      this.context.validation.unregister(this);
    }
  }

  validate() {
    this.setState(this.validator.validate(this.state));
    if(this.props.onValidate) {
      this.props.onValidate({
        valid: this.state.valid,
        error: this.state.error
      })
    }
  }

  valid() {
    return this.state.valid;
  }

  update() {
    var context = this;

    return function(e) {
      context.setState({ value: e.target.value, changed: true });
      context.validate();

      if(context.props.onInput) {
        context.props.onInput.apply(this, arguments);
      }
    }
  }

  render() {
    let props = Object.assign({}, this.props);
    delete props['validators'];

    props.onInput = this.update();

    return (
      <input {...props} />
    );
  }
}
