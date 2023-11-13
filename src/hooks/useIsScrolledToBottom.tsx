import { useState, useEffect, RefObject } from 'react';

/**
 * A hook that detects if the page or the specified container is scrolled to the bottom or not.
 * @function
 * @param {number} [offset=0] - Determines how far from the actual bottom scrolling needs to be to consider it at the bottom. Defaults to 0, meaning at the very bottom of the page or container.
 * @param {React.RefObject<HTMLElement>} [ref] - React ref object for the container (HTML element) to monitor scrolling. If provided, hook will monitor the container instead of the window;
 * @returns {boolean} Returns a boolean indicating if the container or the window is scrolled to the bottom.
 *
 * Example:
 * ```js
 *   const isScrolledToBottom = useIsScrolledToBottom(100);
 * 
 *   if (isScrolledToBottom) {
 *     // ... Fetch more data or do something else
 *   }
 * ```
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY|window.scrollY}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset|window.pageYOffset}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/window/innerHeight|window.innerHeight}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/offsetHeight|element.offsetHeight}
 */
export function useIsScrolledToBottom(offset: number = 0, ref?: RefObject<HTMLElement>): boolean {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const targetElement = ref?.current || document.body;
      const scrolledToBottom =
        window.innerHeight + window.pageYOffset >= (targetElement.offsetHeight - offset);
      setIsScrolledToBottom(scrolledToBottom);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset, ref]);

  return isScrolledToBottom;
}
