import { useState, useEffect } from 'react'

export const useScrollTo = (scrollContainerRef : React.RefObject<Element>, scrollToRef: React.RefObject<Element>) => {
  const [scrollTo, set_scrollTo] = useState(false)

  useEffect(() => {
    if (scrollContainerRef?.current && scrollToRef?.current && scrollTo) {
      const offsetTop = scrollContainerRef.current.getBoundingClientRect().top
      scrollContainerRef.current.scrollTop = scrollToRef.current.getBoundingClientRect().top - offsetTop
    }
  }, [scrollTo])

  return {
    scrollContainerRef, 
    scrollToRef, 
    set_scrollTo
  }
}