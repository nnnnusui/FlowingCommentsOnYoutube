import {
  render, 
} from "solid-js/web";
import App from "./component/App";
import {
  getCommentRiverRenderTargetContainer, 
} from "./script/InPageElement";
import getSpaPageTransitionObserver from "./inPageElement/getSpaPageTransitionObserver";

import manifest from "./manifest.json";

const extensionName = manifest.name;
const launchMessage = `Load extension '${extensionName}'.`;
const main = async () => {
  console.log(`start [${launchMessage}] ->`);

  const appElementId = extensionName;
  const renderApp = async () => {
    console.log(`${extensionName}: rerender <App#${appElementId} />.`);
    const alreadyRendered = document.querySelector(`#${appElementId}`);
    if (alreadyRendered)
      alreadyRendered.remove();
    render(() => <App id={appElementId} />, await getCommentRiverRenderTargetContainer());
  };
  getSpaPageTransitionObserver(renderApp);
  await renderApp();

  console.log(`<- end [${launchMessage}]`);
};

console.log(`${extensionName}/main.js`);
window.addEventListener("load", main);
