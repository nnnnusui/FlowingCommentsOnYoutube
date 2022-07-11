import {
  Component,
  JSX,
  onMount,
} from "solid-js";

import styles from './SettingsMenu.module.styl';
import manifest from "../manifest.json";

import settingsMenu from "./signal/settingsMenu";

const SettingsMenu: Component= () => {
  const textareaOnInput: JSX.EventHandlerUnion<HTMLTextAreaElement, InputEvent> = (event) => {
    const element = event.currentTarget;
    resizeTextArea(element);
  };
  const resizeTextArea = (element: HTMLTextAreaElement) => {
    element.style.height = 'inherit';
    element.style.height = `${element.scrollHeight}px`;
    settingsMenu.setStyleOverwrite(element.value);
  };

  let styleOverwriteTextArea!: HTMLTextAreaElement;
  onMount(() => resizeTextArea(styleOverwriteTextArea));

  return (
    <div class={`${styles.SettingsMenu} ytp-popup`}>
      <h1>{manifest.name} settings menu</h1>
      <button onClick={settingsMenu.toggleDebugMenu}>
        <p>Toggle debug menu</p>
      </button>
      <p>style override</p>
      <textarea
        ref={styleOverwriteTextArea}
        cols="30"
        value={settingsMenu.get.styleOverwrite}
        onInput={textareaOnInput}
      />
    </div>
  );
};

export default SettingsMenu;
