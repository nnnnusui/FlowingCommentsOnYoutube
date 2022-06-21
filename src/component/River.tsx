import {
  Accessor,
  Component,
  Index,
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
  let element!: HTMLDivElement;
  return (
    <div ref={element} class={styles.River}>
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
