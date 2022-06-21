const getSpaPageTransitionObserver = (
  observe: (mutations: MutationRecord[], observer: MutationObserver) => void
) => {
  let beforeHref = location.href;
  const observer = new MutationObserver((mutations, observer) => {
    const currentHref = location.href;
    if (beforeHref == currentHref) return;
    beforeHref = currentHref;
    observe(mutations, observer);
  });
  observer.observe(document, {
    childList: true,
    subtree: true, 
  });
};

export default getSpaPageTransitionObserver;
