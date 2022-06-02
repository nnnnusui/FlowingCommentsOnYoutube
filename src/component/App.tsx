import { Component } from "solid-js";

import styles from './App.module.styl';
import manifest from "../manifest.json";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <h1>Chrome extension `{manifest.name}` in Dev.</h1>
    </div>
  );
};

export default App;
