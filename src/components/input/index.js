import { h, Component } from 'preact';
import styles from './style.css';

export default class Input extends Component {
  constructor() {
    super();
    this._id = "input_" + Math.random().toString(36).substring(2, 7);
  }

  render() {
    let props = Object.assign({}, this.props);
    delete props['label'];
    delete props['className'];

    let className = styles.container;
    if(this.props.className) {
      className += " " + this.props.className;
    }

    return (
      <div className={className}>
        <label for={this._id} className={styles.label}>
          {this.props.label}
        </label>
        <span className={styles.wrapper}>
          <input id={this._id} {...props} className={styles.input} />
        </span>
      </div>
    );
  }
}
