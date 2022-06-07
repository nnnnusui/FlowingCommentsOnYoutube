import ChatComment from "@/type/ChatComment";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For, 
} from "solid-js";

import {
  getNewChatMessageObserver, getVideo, 
} from "../script/InPageElement";

import styles from './River.module.styl';

const River: Component = () => {
  const [comments, setComments] = createSignal<ChatComment[]>([]);
  const [videoResource] =
    createResource(() => getVideo());
  const [time, setTime] = createSignal(0);
  const [observer] =
    createResource(() =>
      getNewChatMessageObserver((added) => {
        setComments((prev) => ([...prev, ...added]));
      })
    );

  createEffect(() => {
    const video = videoResource();
    if (!video) return;
    const loop = () => {
      setTime(video.currentTime);
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  });
  
  return (
    <div class={styles.River}>
      <h1>River</h1>
      <p>time: {time()}</p>
      <For each={comments()}>{(it) => it.message}</For>
    </div>
  );
};

export default River;
