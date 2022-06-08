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

import Flow from "./Flow";
import styles from './River.module.styl';

type TimeStumped<T> = {
  value: T,
  time: number,
}

const River: Component = () => {
  const [comments, setComments] = createSignal<TimeStumped<ChatComment>[]>([]);
  const [videoResource] =
    createResource(() => getVideo());
  const [time, setTime] = createSignal(0);
  const [observer] =
    createResource(() =>
      getNewChatMessageObserver((added) => {
        const timeStumped =
          added.map((it) => ({
            time: time(),
            value: it, 
          }));
        setComments((prev) => ([...prev, ...timeStumped]));
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
  
  let element!: HTMLDivElement;
  return (
    <div ref={element} class={styles.River}>
      <h1>River</h1>
      <p>time: {time()}</p>
      <For each={comments()}>{(it) => (
        <Flow
          screenLength={element.clientWidth}
          currentTime={time() - it.time}
          comment={it.value}
        />
      )}</For>
    </div>
  );
};

export default River;
