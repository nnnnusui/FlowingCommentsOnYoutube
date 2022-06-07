import ChatComment from "../type/ChatComment";

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

const waitLoaded = (
  target: HTMLIFrameElement
) =>
  new Promise<HTMLIFrameElement>((resolve) => {
    target.addEventListener("load", () => resolve(target));
  });

export const getCommentRiverRenderTargetContainer = () =>
  waitAppearance<HTMLElement>(() =>
    document
      ?.querySelector('#player')
      ?.querySelector("#player-container")
  );

export const getNewChatMessageObserver = async (
  observe: (comments: ChatComment[]) => void
) => {
  const iframe =
    await waitAppearance(() =>
      document
        ?.querySelector<HTMLIFrameElement>('#chatframe')
    )
      .then(waitLoaded);
  const target =
    await waitAppearance<HTMLElement>(() =>
      iframe
        ?.contentDocument
        ?.querySelector('#chat')
        ?.querySelector('#items')
    );
  
  const observer = new MutationObserver((mutations) => {
    const added =
      mutations
        .filter((it) => it.addedNodes)
        .flatMap((it) => Array.from(it.addedNodes))
        .map<HTMLElement>((it) => it as HTMLElement)
        .map<ChatComment>((it) => {
          return {
            message: it.querySelector("#message")?.textContent,
          } as ChatComment;
        });
    observe(added);
  });
  observer.observe(
    target,
    {
      childList: true, 
    },
  );
  return observer;
};
