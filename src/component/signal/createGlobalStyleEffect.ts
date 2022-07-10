import {
  createEffect,
  createSignal,
  Setter,
} from "solid-js";

const createGlobalStyleEffect = (
  id: string,
  init: string,
): Setter<string> => {
  const [state, setState] = createSignal<string>(init);
  const element = document.createElement("style");
  element.id = id;
  document.head.appendChild(element);
  console.log(element);
  createEffect(() => {
    element.textContent = state();
  });

  return setState;
};

export default createGlobalStyleEffect;
