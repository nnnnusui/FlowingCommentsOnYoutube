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
  duplicatedCount: number,
  setInInitDraw: (id: string, height: number) => void,
  removeInInitDraw: (id: string) => void,
}> = (props) => {
  const [inInitialSection, setInInitialSection] = createSignal(true);
  const [isShown, setIsShown] = createSignal(true);
  const [movementedProgress, setMovementedProgress] = createSignal(0);

  let element!: HTMLSpanElement;
  createEffect(() => {
    if (!element) return;
    const contentLength = element.clientWidth;
    const screenLength = props.screenLength;
    const shiftLength = contentLength;
    const movementedLength = props.currentTime * pixelPerSec;
    const fullLength = screenLength + contentLength * 2;
    const isShown = movementedLength < fullLength;
    const movementedRate = movementedLength / screenLength;
    const shiftRate = shiftLength / screenLength;
    setIsShown(isShown);
    setMovementedProgress(movementedRate - shiftRate);
    setInInitialSection(movementedLength < contentLength);
  });
  createEffect(() => {
    if (!element) return;
    if (inInitialSection()) {
      props.setInInitDraw(props.comment.id, element.clientHeight);
    } else {
      props.removeInInitDraw(props.comment.id);
    }
  });

  return (
    <Show when={isShown()}>
      <span ref={element} class={`${styles.Flow} flow`}
        style={{
        '--length': props.screenLength,
          '--height': `${props.duplicatedCount}`,
        '--progress': `${movementedProgress() * 100}%`,
        }}
        // eslint-disable-next-line solid/no-innerhtml
        innerHTML={props.comment.message}
      />
    </Show>
  );
};

export default Flow;
