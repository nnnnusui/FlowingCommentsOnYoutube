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

type ScheduledToFlow<T> = {
  value: T,
  startTime: number,
  duplicatedCount: number,
}

const River: Component = () => {
  const [comments, setComments] = createSignal<ScheduledToFlow<ChatComment>[]>([]);
  const [inInitDraws, setInInitDraws] = createSignal<{
    id: string,
    height: number,
  }[]>([]);
  const setInInitDraw = (id: string, height: number) =>
    setInInitDraws((prev) => [
      ...prev,
      {
        id, height, 
      },
    ]);
  const removeInInitDraw = (id: string) =>
    setInInitDraws((prev) => prev.filter((it) => it.id != id)); 
  const [videoResource] =
    createResource(() => getVideo());
  const [time, setTime] = createSignal(0);
  createResource(() =>
    getNewChatMessageObserver((added) => {
      const initDrawCount =
        inInitDraws()
          .map((it) => it.height)
          .reduce((sum, it) => sum + it, 0);
          
      setComments((prev) => {
        const timeStumped =
            added.map((it) => ({
              value: it,
              startTime: time(),
              inInitDraw: false,
              duplicatedCount: initDrawCount,
            }));
        return [...prev, ...timeStumped];
      });
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
          currentTime={time() - it.startTime}
          duplicatedCount={it.duplicatedCount}
          comment={it.value}
          setInInitDraw={setInInitDraw}
          removeInInitDraw={removeInInitDraw}
        />
      )}</For>
    </div>
  );
};

export default River;
