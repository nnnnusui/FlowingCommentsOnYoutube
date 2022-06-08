import ChatComment from "@/type/ChatComment";
import {
  Component,
  createEffect,
  createSignal,
  Show,
} from "solid-js";

import styles from './Flow.module.styl';

const pixelPerSec = 180;

const Flow: Component<{
  screenLength: number,
  currentTime: number,
  comment: ChatComment,
}> = (props) => {
  const [isShown, setIsShown] = createSignal(true);
  const [shiftedMovementedLength, setShiftedMovementedLength] = createSignal(0);

  let element!: HTMLSpanElement;
  createEffect(() => {
    if (!element) return;
    const contentLength = element.clientWidth;
    const shiftLength = contentLength;
    const movementedLength = props.currentTime * pixelPerSec;
    // const movementedRateParScreen = movementedLength / screenLength;
    const fullLength = props.screenLength + contentLength * 2;
    const isShown = movementedLength < fullLength;
    // const movementedRate = movementedLength / fullLength;
    // const shiftRate = contentLength / screenLength;
    setIsShown(isShown);
    setShiftedMovementedLength(movementedLength - shiftLength);
  });

  return (
    <Show when={isShown()}>
      <span ref={element} class={styles.Flow} style={{
        '--progress': `${shiftedMovementedLength()}px`,
      }}>
        {props.comment.message}
      </span>
    </Show>
  );
};

export default Flow;
