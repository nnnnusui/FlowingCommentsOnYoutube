import {
  Accessor,
  Component,
  JSX,
  Setter,
} from "solid-js";

import styles from './SettingsMenu.module.styl';
import manifest from "../manifest.json";

const SettingsMenu: Component<{
  setDebugMenuIsShown: Setter<boolean>,
  debugMenuIsShown: Accessor<boolean>,
  setStyleOverwrite: Setter<string>,
  styleOverwrite: Accessor<string>,
}> = (props) => {
  const toggleDebugMenuIsShown = () => props.setDebugMenuIsShown((prev) => !prev);
  const textareaOnInput: JSX.EventHandlerUnion<HTMLTextAreaElement, InputEvent> = (event) => {
    const element = event.currentTarget;
    element.style.height = 'inherit';
    element.style.height = `${element.scrollHeight}px`; 
    props.setStyleOverwrite(element.value);
  };

  return (
    <div class={`${styles.SettingsMenu} ytp-popup`}>
      <h1>{manifest.name} settings menu</h1>
      <button onClick={toggleDebugMenuIsShown}>
        <p>Toggle debug menu</p>
      </button>
      <p>style override</p>
      <textarea
        cols="30"
        value={props.styleOverwrite()}
        onInput={textareaOnInput}
      />
    </div>
  );
};

export default SettingsMenu;
