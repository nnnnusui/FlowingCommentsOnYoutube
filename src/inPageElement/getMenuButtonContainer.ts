import waitAppearance from "./function/waitAppearance";

const getMenuButtonContainer = () =>
  waitAppearance(() =>
    document
      .querySelector('.ytp-right-controls')
  );

export default getMenuButtonContainer;
