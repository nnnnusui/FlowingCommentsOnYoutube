import {
  render, 
} from "solid-js/web";
import App from "./component/App";
import MenuButton from "./component/MenuButton";
import getCommentRiverRenderTargetContainer from "./inPageElement/getCommentRiverRenderTargetContainer";
import getMenuButtonContainer from "./inPageElement/getMenuButtonContainer";
import getSpaPageTransitionObserver from "./inPageElement/getSpaPageTransitionObserver";

import manifest from "./manifest.json";

const extensionName = manifest.name;
const launchMessage = `Load extension '${extensionName}'.`;
const main = async () => {
  console.log(`start [${launchMessage}] ->`);

  const appElementId = extensionName;
  const menuButtonId = `${extensionName}-menu-button`;
  const renderApp = async () => {
    console.log(`${extensionName}: rerender <App#${appElementId} />.`);
    document.querySelector(`#${appElementId}`)?.remove();
    document.querySelector(`#${menuButtonId}`)?.remove();
    render(() => <App id={appElementId} />, await getCommentRiverRenderTargetContainer());
    render(() => <MenuButton id={menuButtonId} />, await getMenuButtonContainer());
  };
  getSpaPageTransitionObserver(renderApp);
  await renderApp();

  console.log(`<- end [${launchMessage}]`);
};

console.log(`${extensionName}/main.js`);
window.addEventListener("load", main);
