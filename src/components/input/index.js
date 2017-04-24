import { h, Component } from 'preact';
import styles from './style.css';
import Validator from '../../validation/validator.js';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this._id = "input_" + Math.random().toString(36).substring(2, 7);
    this.validator = new Validator(this.props.validators || []);

    this.state = {
      valid: false,
      changed: this.props.value != (this.props.initial || ""),
      value: this.props.value,
      inital: this.props.initial || ""
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

  renderError() {
    if(!this.state.valid) {
      return (
        <span className={styles.error}>{this.state.error}</span>
      );
    } else {
      return "";
    }
  }

  renderLabel() {
    if(typeof(this.props.label) != "undefined") {
      return (
        <label for={this._id} className={styles.label}>
          {this.props.label}
          {this.renderError()}
        </label>
      );
    } else {
      return "";
    }
  }

  render() {
    let props = Object.assign({}, this.props);
    delete props['label'];
    delete props['className'];
    delete props['onInvalid'];
    delete props['validators'];

    props.onInput = this.update();

    let className = styles.container;
    if(this.props.className) {
      className += " " + this.props.className;
    }

    return (
      <div className={className}>
        {this.renderLabel()}
        <span className={styles.wrapper}>
          <input id={this._id} {...props} className={styles.input} />
        </span>
      </div>
    );
  }
}
