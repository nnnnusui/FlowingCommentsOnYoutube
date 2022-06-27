import {
  createRoot,
  createSignal, 
} from "solid-js";

const createSettingsMenu = () => {
  const [isShown, setIsShown] = createSignal(false);
  const open = () => setIsShown(true);
  const close = () => setIsShown(false);
  const toggle = () => setIsShown((prev) => !prev);
  return {
    isShown,
    open,
    close,
    toggle, 
  };
};

export default createRoot(createSettingsMenu);
