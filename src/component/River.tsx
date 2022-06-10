import ChatComment from "@/type/ChatComment";
import {
  Accessor,
  Component,
  createResource,
  createSignal,
  For, 
} from "solid-js";

import {
  getNewChatMessageObserver, 
} from "../script/InPageElement";

import Flow from "./Flow";
import styles from './River.module.styl';

type ScheduledToFlow<T> = {
  value: T,
  startTime: number,
  duplicatedCount: number,
}

const River: Component<{
  playbackTime: Accessor<number>
}> = (props) => {
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
  createResource(() =>
    getNewChatMessageObserver((added) => {
      const initDrawCount =
        inInitDraws()
          .map((it) => it.height)
          .length;
          
      setComments((prev) => {
        const timeStumped =
          added.map((it, index) => ({
            value: it,
            startTime: props.playbackTime(),
            inInitDraw: false,
            duplicatedCount: initDrawCount + index,
          }));
        return [...prev, ...timeStumped];
      });
    })
  );

  let element!: HTMLDivElement;
  return (
    <div ref={element} class={styles.River}>
      <For each={comments()}>{(it) => (
        <Flow
          screenLength={element.clientWidth}
          currentTime={props.playbackTime() - it.startTime}
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
