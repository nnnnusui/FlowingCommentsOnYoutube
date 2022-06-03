import { Component, Show } from "solid-js";

import DebugInfo from "./DebugInfo";
import styles from './App.module.styl';

const App: Component = () => {
  const showDebugInfo = true;
  return (
    <div class={styles.App}>
      <Show when={showDebugInfo}>
        <DebugInfo />
      </Show>
    </div>
  );
};

export default App;
