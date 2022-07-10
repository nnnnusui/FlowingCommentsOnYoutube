import {
  Accessor,
  batch,
  Component,
  createEffect,
  createSignal,
  onMount,
  Show,
} from "solid-js";

import styles from './Flow.module.styl';

const duration = 4;

const Flow: Component<{
  index: number,
  content: string,
  startTime: number,
  playbackTime: Accessor<number>,
}> = (props) => {
  const [drawTime, setDrawTime] = createSignal(0);
  const [isShown, setIsShown] = createSignal(false);
  const [movementedProgress, setMovementedProgress] = createSignal(0);

  onMount(() => {
    setDrawTime(props.playbackTime());
  });
  createEffect(() => {
    const offset = props.playbackTime() - drawTime();
    const progress = offset / duration;
    batch(() => {
      setIsShown(0 <= progress && progress <= 1);
      setMovementedProgress(progress);
    });
  });

  let element!: HTMLSpanElement;
  const [top, setTop] = createSignal(0);
  createEffect(() => {
    isShown();
    const screen = element?.parentElement;
    if (screen == null) return;
    const children = screen.children;
    const renderings = 
      Array.from(children)
        .map((it) => it as HTMLElement)
        .filter((it) => it !== element);
    
    const horizontalOccupiedList =
      renderings
        .filter((it) => {
          const isNotAfter = it.offsetLeft + it.offsetWidth > element.offsetLeft;
          const isNotBefore = it.offsetLeft < element.offsetLeft + element.offsetWidth;
          return isNotAfter && isNotBefore;
        });
    const gaps =
      [
        ...horizontalOccupiedList,
        {
          offsetTop: screen.offsetHeight,
          offsetHeight: 0,
        },
      ]
        .sort((prev, next) => prev.offsetTop - next.offsetTop)
        .reduce((prev, it) => {
          return {
            before: {
              top: it.offsetTop + it.offsetHeight,
            },
            gaps: [
              ...prev.gaps,
              {
                gap: it.offsetTop - prev.before.top,
                top: prev.before.top,
              },
            ],
          };
        },{
          before: {
            top: 0,
          },
          gaps: [] as { gap: number, top: number }[],
        })
        .gaps;
    
    const top =
      gaps
        .find((it) => it.gap >= element.offsetHeight)
        ?.top ?? 50;
    setTop(top);
  });

  return (
    <Show when={isShown()}>
      <span
        ref={element}
        class={`${styles.Flow} flow`}
        style={{
          '--prerendered': element ? "prerendered" : "",
          '--duration': `${duration}s`,
          '--progress': movementedProgress(),
          '--top': `${top()}px`,
        }}
        // eslint-disable-next-line solid/no-innerhtml
        innerHTML={props.content}
      />
    </Show>
  );
};

export default Flow;
