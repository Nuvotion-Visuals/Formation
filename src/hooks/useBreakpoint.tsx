import { useMediaQuery } from 'react-responsive'

/**
 * A hook that returns the current breakpoint based on the device's width.
 * @see {@link https://www.npmjs.com/package/react-responsive|react-responsive}.
 * @function
 * @returns {{ isMobile: boolean, isTablet: boolean, isDesktop: boolean }} An object containing three boolean values indicating if the current device is a mobile, tablet, or desktop.
 *
 * Example:
 * ```js
 *  const { isMobile, isTablet, isDesktop } = useBreakpoint();
 * 
 *  if (isMobile) {
 *    // ... Render mobile-specific component
 *  }
 * ```
 */
export const useBreakpoint = () => {
  const isDesktop = useMediaQuery({ minWidth: 956 })
  const isTablet = useMediaQuery({ minWidth: 621, maxWidth: 955 })
  const isMobile = useMediaQuery({ maxWidth: 620 })

  return {
    isMobile,
    isTablet,
    isDesktop
  }
}
