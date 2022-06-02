import { render } from "solid-js/web";
import App from "./component/App";

const waitAppearance = <T,>(
  getThing: () => T | null | undefined,
  interval = 100,
  timeout = undefined,
) => {
  return new Promise<T>((resolve) => {
    const expireTime = timeout && Date.now() + timeout;
    const intervalId = window.setInterval(() => {
      const expired = expireTime && expireTime < Date.now();
      const thing = getThing();
      if (expired || thing !== null) {
        clearInterval(intervalId);
        if (thing) resolve(thing);
      }
    }, interval);
  });
};

const extensionName = "FlowingCommentsOnYoutube";
const launchMessage = `Load extension '${extensionName}'.`;
const main = async () => {
  console.log(`start [${launchMessage}] ->`);

  const renderTargetContainer = await waitAppearance<HTMLElement>(() =>
    document
      ?.querySelector('#player')
      ?.querySelector("#player-container"),
  );
  console.log(`renderTarget: ${renderTargetContainer}`);
  render(() => <App />, renderTargetContainer);

  console.log(`<- end [${launchMessage}]`);
};

console.log(`${extensionName}/main.js`);
window.addEventListener("load", main);
