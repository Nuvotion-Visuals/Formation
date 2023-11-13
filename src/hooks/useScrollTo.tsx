import { useState, useEffect } from 'react'

/**
 * A React hook that triggers scrolling within a container element to a target element.
 * 
 * @function
 * @param {React.RefObject<Element>} scrollContainerRef - A React ref object for the scroll container element.
 * @param {React.RefObject<Element>} scrollToRef - A React ref object for the target element to scroll to.
 * 
 * @return {Object} An object containing 
 * - `scrollContainerRef`: The provided React ref object for the scroll container element.
 * - `scrollToRef`: The provided React ref object for the target element to scroll to.
 * - `set_scrollTo`: A state setter function to trigger or cancel the scroll.
 * 
 * @example
 * // Use case of this hook is in implementing 'ScrollTo' behavior within a container for some deeply nested child components.
 * function ParentComponent() {
 *   const scrollContainerRef = useRef(null)
 *   const scrollToRef = useRef(null)
 *    
 *   const { set_scrollTo } = useScrollTo(scrollContainerRef, scrollToRef)
 *    
 *   // ...
 * }
 *
 * @see {@link https://reactjs.org/docs/hooks-reference.html#useref|React.useRef}
 * @see {@link https://reactjs.org/docs/hooks-effect.html|React.useEffect}
 */
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