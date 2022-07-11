import waitAppearance from "./function/waitAppearance";

const getVideo = () =>
  waitAppearance(() =>
    document
      .querySelector<HTMLVideoElement>('.video-stream')
  );

export default getVideo;
