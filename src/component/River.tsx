import {
  Accessor,
  Component,
  createSignal,
  Index,
  onMount,
  Setter,
} from "solid-js";

import Flow from "./Flow";

import styles from './River.module.styl';

import Comments from "./type/Comments";

const River: Component<{
  playbackTime: Accessor<number>,
  comments: Accessor<Comments>,
  setComments: Setter<Comments>,
}> = (props) => {
  const [size, setSize] = createSignal(0);

  let element!: HTMLDivElement;
  onMount(() => {
    setSize(element.clientHeight);
  });

  return (
    <div
      ref={element}
      class={styles.River}
      style={{
        "--height": size(),
      }}
    >
      <Index each={Array.from(props.comments().values())}>{(comment, index) => {
        return (
          <Flow
            index={index}
            playbackTime={props.playbackTime}
            content={comment().content}
            startTime={comment().startTime}
          />
        );
      }}</Index>
    </div>
  );
};

export default River;
