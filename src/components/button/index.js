import { h, Component } from 'preact';
import styles from './style.css';

export default class Button extends Component {
  render() {
    let props = Object.assign({}, this.props);

    let className = styles.container;
    if(this.props.className) {
      className += " " + this.props.className;
    }

    return (
      <div className={className}>
        <button className={styles.button}>{this.props.children}</button>
      </div>
    );
  }
}
