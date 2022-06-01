const waitAppearance = <T>(
  getThing: () => T | null,
  interval = 100,
  timeout = undefined
) => {
  return new Promise((resolve) => {
    const expireTime = timeout && Date.now() + timeout;
    const intervalId = window.setInterval(() => {
      const expired = expireTime && expireTime < Date.now();
      const thing = getThing();
      if (expired || thing !== null) {
        clearInterval(intervalId);
        resolve(thing);
      }
    }, interval);
  });
};

const extensionName = "FlowingCommentsOnYoutube";
const launchMessage = `Load extension '${extensionName}'.`;
const main = async () => {
  console.log(`start [${launchMessage}] ->`);

  const video = await waitAppearance(() =>
    document.querySelector(".video-stream")
  );
  console.log(video);

  console.log(`<- end [${launchMessage}]`);
};

console.log(`${extensionName}/main.js`);
window.addEventListener("load", main);
