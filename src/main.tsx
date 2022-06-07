import {
  render, 
} from "solid-js/web";
import App from "./component/App";
import {
  getCommentRiverRenderTargetContainer, 
} from "./script/InPageElement";

import manifest from "./manifest.json";

const extensionName = manifest.name;
const launchMessage = `Load extension '${extensionName}'.`;
const main = async () => {
  console.log(`start [${launchMessage}] ->`);

  render(() => <App />, await getCommentRiverRenderTargetContainer());

  console.log(`<- end [${launchMessage}]`);
};

console.log(`${extensionName}/main.js`);
window.addEventListener("load", main);
