import { useState, useEffect, useRef, useCallback } from 'react';

type ScrollVisibleCallback = (isVisible: boolean) => void;

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
