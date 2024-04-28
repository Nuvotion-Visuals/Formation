import { useMediaQuery } from 'react-responsive'

/**
 * A custom hook that allows for specifying custom breakpoints for mobile, tablet, and desktop devices.
 * Users can override default breakpoints to better suit their application's responsive design needs.
 * @param {object} customBreakpoints - An object containing the custom breakpoint values for mobile, tablet, and desktop.
 * @see {@link https://www.npmjs.com/package/react-responsive|react-responsive}.
 * @function
 * @returns {{ isMobile: boolean, isTablet: boolean, isDesktop: boolean }} An object with boolean values indicating device type.
 *
 * Example usage:
 * ```js
 *  const { isMobile, isTablet, isDesktop } = useBreakpoint({
 *    desktop: { minWidth: 1024 },
 *    tablet: { minWidth: 768, maxWidth: 1023 },
 *    mobile: { maxWidth: 767 }
 *  })
 * 
 *  if (isDesktop) {
 *    // Render desktop-specific component
 *  }
 * ```
 */
export const useBreakpoint = ({
  desktop = { minWidth: 1024 },
  tablet = { minWidth: 621, maxWidth: 955 },
  mobile = { maxWidth: 620 }
} = {}) => {
  const isDesktop = useMediaQuery({ minWidth: desktop.minWidth })
  const isTablet = useMediaQuery({ minWidth: tablet.minWidth, maxWidth: tablet.maxWidth })
  const isMobile = useMediaQuery({ maxWidth: mobile.maxWidth })

  return {
    isMobile,
    isTablet,
    isDesktop
  }
}
