import waitAppearance from "./function/waitAppearance";

const getCommentRiverRenderTargetContainer = () =>
  waitAppearance<HTMLElement>(() =>
    document
      ?.querySelector('#player')
      ?.querySelector("#player-container")
  );

export default getCommentRiverRenderTargetContainer;
