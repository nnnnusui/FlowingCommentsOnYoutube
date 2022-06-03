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

const getCommentRiverRenderTargetContainer = () =>
  waitAppearance<HTMLElement>(() =>
    document
      ?.querySelector('#player')
      ?.querySelector("#player-container")
  );

const GetInPageElement = async () => {
  return {
    commentRiverRenderTargetContainer: await getCommentRiverRenderTargetContainer(),
  }
}

export default GetInPageElement
