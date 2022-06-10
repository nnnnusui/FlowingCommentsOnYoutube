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
import {
  getVideo, 
} from "@/script/InPageElement";

const App: Component = () => {
  const [videoResource] = createResource(() => getVideo());
  const [time, setTime] = createSignal(0);
  
  createEffect(() => {
    const video = videoResource();
    if (!video) return;
    const loop = () => {
      setTime(video.currentTime);
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  });
  
  return (
    <div class={styles.App}>
      <DebugInfo>
        <p>playbackTime: {time()}</p>
      </DebugInfo>
      <Suspense fallback={<h1>Loading...</h1>}>
        <River playbackTime={time}/>
      </Suspense>
    </div>
  );
};

export default App;
