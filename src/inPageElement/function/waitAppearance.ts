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

export default waitAppearance;
