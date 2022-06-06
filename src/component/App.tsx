import { Component, Show, Suspense } from "solid-js";

import DebugInfo from "./DebugInfo";
import River from "./River";
import styles from './App.module.styl';

const App: Component = () => {
  const showDebugInfo = true;
  return (
    <div class={styles.App}>
      <Show when={showDebugInfo}>
        <DebugInfo />
      </Show>
      <Suspense fallback={<h1>Loading...</h1>}>
        <River />
      </Suspense>
    </div>
  );
};

export default App;
