import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
  Suspense,
} from "solid-js";

import DebugInfo from "./DebugInfo";
import River from "./River";
import SettingsMenu from "./SettingsMenu";
import styles from './App.module.styl';

import Comments from './type/Comments';
import getNewChatMessageObserver from "@/inPageElement/getNewChatMessageObserver";
import getVideo from "@/inPageElement/getVideo";
import settingsMenu from "./signal/settingsMenu";

const App: Component<{
  id: string
}> = (props) => {
  const [videoResource] = createResource(() => getVideo());
  const [time, setTime] = createSignal(0);
  const [comments, setComments] = createSignal<Comments>([]);
  const [commentsQueue, setCommentsQueue] = createSignal<Comments>([]);

  createEffect(() => {
    const video = videoResource();
    if (!video) return;
    const loop = () => {
      setTime(video.currentTime);
      setCommentsQueue((prev) => {
        const [head, ...tails] = prev;
        if (!head) return prev;
        setComments((prev) => [...prev, head]);
        return tails;
      });
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  });


  createResource(() =>
    getNewChatMessageObserver((added) => {
      setCommentsQueue((prev) => (
        added.reduce((sum, it) => (
          [
            ...sum,
            {
              content: it.message,
              startTime: time(),
            },
          ]
        ), prev)
      ));
    })
  );

  const addDummy = () => {
    setCommentsQueue((prev) => (
      [
        ...prev,
        {
          content: "てすと",
          startTime: time(),
        },
      ]
    ));
  };

  return (
    <div
      id={props.id}
      class={styles.App}
    >
      <Show when={settingsMenu.get.debugMenuIsShown}>
        <DebugInfo>
          <p>playback time: {time()}</p>
          <p>comments count: {comments().length}</p>
          <p>queued count: {commentsQueue().length}</p>
          <button onClick={addDummy}>addDummyComment</button>
        </DebugInfo>
      </Show>
      <Suspense fallback={<h1>Loading...</h1>}>
        <River
          playbackTime={time}
          comments={comments}
          setComments={setComments}
        />
      </Suspense>
      <Show when={settingsMenu.isShown()}>
        <SettingsMenu />
      </Show>
    </div>
  );
};

export default App;
