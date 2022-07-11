import {
  Component, createSignal, onMount,
} from "solid-js";

import styles from './MenuButton.module.styl';
import settingsMenu from "./signal/settingsMenu";

const MenuButton: Component<{
  id: string
}> = (props) => {
  const [fontSize, setFontSize] = createSignal(0);

  let element!: HTMLButtonElement;
  onMount(() => {
    setFontSize(Math.min(element.clientWidth, element.clientHeight));
  });
  return (
    <button
      id={props.id}
      class={`${styles.MenuButton} ytp-button`}
      onClick={settingsMenu.toggle}
      ref={element}
    >
      <p
        class={styles.CharContainer}
        style={{
          "font-size": `${fontSize()}px`,
        }}
      >
        💭
      </p>
    </button>
  );
};

export default MenuButton;
