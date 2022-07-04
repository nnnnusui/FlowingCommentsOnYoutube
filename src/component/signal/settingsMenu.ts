import {
  createRoot,
  createSignal, 
} from "solid-js";
import createLocalStore from "./createLocalStore";

type Settings = {
  debugMenuIsShown: boolean,
  styleOverwrite: string,
}
const Settings: Settings = {
  debugMenuIsShown: false,
  styleOverwrite: "",
};

const createSettingsMenu = () => {
  const [isShown, setIsShown] = createSignal(false);
  const open = () => setIsShown(true);
  const close = () => setIsShown(false);
  const toggle = () => setIsShown((prev) => !prev);

  const [get, set] = createLocalStore<Settings>("settings", Settings);
  const showDebugMenu = () => set('debugMenuIsShown', true);
  const closeDebugMenu = () => set('debugMenuIsShown', false);
  const toggleDebugMenu = () => set('debugMenuIsShown', (prev) => !prev);

  const setStyleOverwrite = (style: string) => set('styleOverwrite', style);

  return {
    get,
    set,
    isShown,
    open,
    close,
    toggle,
    showDebugMenu,
    closeDebugMenu,
    toggleDebugMenu,
    setStyleOverwrite,
  };
};

export default createRoot(createSettingsMenu);
