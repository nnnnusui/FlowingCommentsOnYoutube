import {
  Component, 
} from "solid-js";

import styles from './DebugInfo.module.styl';
import manifest from "../manifest.json";

const DebugInfo: Component = () => {
  return (
    <div class={styles.DebugInfo}>
      <h1>Chrome extension `{manifest.name}` in Dev.</h1>
    </div>
  );
};

export default DebugInfo;
