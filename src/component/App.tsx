import {
  Component, 
  createEffect, 
  createResource, 
  createSignal,
  Suspense, 
} from "solid-js";

import DebugInfo from "./DebugInfo";
import River from "./River";
import styles from './App.module.styl';

import Comments from './type/Comments';
import getNewChatMessageObserver from "@/inPageElement/getNewChatMessageObserver";
import getVideo from "@/inPageElement/getVideo";

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
      <DebugInfo>
        <p>playbackTime: {time()}</p>
        <button onClick={addDummy}>addDummyComment</button>
      </DebugInfo>
      <Suspense fallback={<h1>Loading...</h1>}>
        <River
          playbackTime={time}
          comments={comments}
          setComments={setComments}
        />
      </Suspense>
    </div>
  );
};

export default App;
