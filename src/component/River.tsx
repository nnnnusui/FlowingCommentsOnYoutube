import ChatComment from "@/type/ChatComment";
import {
  Component,
  createResource,
  createSignal,
  For, 
} from "solid-js";

import {
  getNewChatMessageObserver, 
} from "../script/InPageElement";

import styles from './River.module.styl';

const River: Component = () => {
  const [comments, setComments] = createSignal<ChatComment[]>([]);
  const [observer] =
    createResource(() =>
      getNewChatMessageObserver((added) => {
        setComments((prev) => ([...prev, ...added]));
      })
    );
  
  return (
    <div class={styles.River}>
      <h1>River</h1>
      <For each={comments()}>{(it) => it.message}</For>
    </div>
  );
};

export default River;
