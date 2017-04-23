import { h, Component } from 'preact';
import Input from '../input';
import styles from './style.css';

export default class FirmwarePanel extends Component {
  render() {
    return (
      <section className={styles.panel}>
        <h3 className={styles.heading}>Update the firmware</h3>
        <Input label="Firmware" type="file" />
      </section>
    );
  }
}
