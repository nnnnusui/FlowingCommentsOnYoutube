import {
  children,
  Component,
  JSX, Show,
} from "solid-js";

import styles from './DebugInfo.module.styl';
import manifest from "../manifest.json";

const DebugInfo: Component<{
  children?: JSX.Element
}> = (props) => {
  const showDebugInfo = true;
  const childs = children(() => props.children);

  return (
    <Show when={showDebugInfo}>
      <div class={styles.DebugInfo}>
        <h1>Chrome extension `{manifest.name}` in Dev.</h1>
        {childs()}
      </div>
    </Show>
  );
};

export default DebugInfo;
