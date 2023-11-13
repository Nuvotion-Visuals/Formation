import { useEffect, RefObject } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref.
 * @function
 * @param {React.RefObject} ref - React ref object that refers to the element to be monitored for clicks outside of it.
 * @param {function} handler - Event handler to be invoked when a click outside of the ref's element is detected.
 * @returns {void}
 * @example
 * ```js
 *   const node = useRef();
 *   useOnClickOutside(node, () => set_menuOpen(false));
 *   return <div ref={node}>...</div>;
 * ```
 * @see {@link https://reactjs.org/docs/hooks-reference.html#useref|React.useRef}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/addEventListener|document.addEventListener}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/removeEventListener|document.removeEventListener}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/contains|element.contains}
 */
export const  useOnClickOutside = (
  ref: RefObject<any>, 
  handler: (event : MouseEvent | TouchEvent) => void
) => {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  )
}