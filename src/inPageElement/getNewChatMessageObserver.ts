import ChatComment from "@/type/ChatComment";
import waitAppearance from "./function/waitAppearance";

const waitLoaded = (
  target: HTMLIFrameElement
) =>
  new Promise<HTMLIFrameElement>((resolve) => {
    target.addEventListener("load", () => resolve(target));
  });

const getNewChatMessageObserver = async (
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
            id: it.id,
            message: it.querySelector("#message")?.innerHTML, 
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

export default getNewChatMessageObserver;
