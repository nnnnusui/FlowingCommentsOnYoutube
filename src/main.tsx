import { render } from "solid-js/web";
import App from "./component/App";
import GetInPageElement from "./script/InPageElement"

import manifest from "./manifest.json";

const extensionName = manifest.name;
const launchMessage = `Load extension '${extensionName}'.`;
const main = async () => {
  console.log(`start [${launchMessage}] ->`);

  const inPageElement = await GetInPageElement();
  render(() => <App />, inPageElement.commentRiverRenderTargetContainer);

  console.log(`<- end [${launchMessage}]`);
};

console.log(`${extensionName}/main.js`);
window.addEventListener("load", main);
