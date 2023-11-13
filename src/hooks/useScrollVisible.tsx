import { useState, useEffect, useRef, useCallback } from 'react';

type ScrollVisibleCallback = (isVisible: boolean) => void;

/**
 * A React hook for determining if a specific section of the page is visible to the user while scrolling.
 * 
 * @function
 * @param {number} threshold - The percentage of the element's height that should be in view for it to be considered 'visible'. (Defaults to 0.25)
 * @param {ScrollVisibleCallback} callback - An optional callback to be run after the visibility of the element is determined.
 * 
 * @return {React.RefObject<HTMLDivElement>} A React ref object to be attached to the element whose visibility is to be tracked.
 * 
 * @example
 * // Use case of this hook is to add scrolling effects or "on-scroll" animations.
 * const ref = useScrollVisible(0.5, (isVisible) => {
 *   console.log(`Element is currently ${isVisible ? "visible" : "not visible"}`)
 * })
 *
 * @see {@link https://reactjs.org/docs/hooks-reference.html#useref|React.useRef}
 * @see {@link https://reactjs.org/docs/hooks-effect.html|React.useEffect}
 * @see {@link https://reactjs.org/docs/hooks-reference.html#usecallback|React.useCallback}
 */
export function useScrollVisible(threshold: number = 0.25, callback?: ScrollVisibleCallback): React.RefObject<HTMLDivElement> {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onVisibleChange = useCallback((newVisible: boolean) => {
    if (callback) {
      callback(newVisible);
    }
  }, [callback]);

  const checkVisibility = useCallback(() => {
    if (!ref.current) return;

    const { top, bottom, height } = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    const newVisible = top + height * threshold < windowHeight && bottom - height * threshold > 0;

    if (newVisible !== isVisible) {
      setIsVisible(newVisible);
      onVisibleChange(newVisible);
    }
  }, [threshold, isVisible, onVisibleChange]);

  useEffect(() => {
    checkVisibility(); // Check initial visibility
  }, [checkVisibility]);

  useEffect(() => {
    window.addEventListener('scroll', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, [checkVisibility]);

  return ref;
}
