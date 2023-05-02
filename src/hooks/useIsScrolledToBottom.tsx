import { useState, useEffect, RefObject } from 'react';

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
