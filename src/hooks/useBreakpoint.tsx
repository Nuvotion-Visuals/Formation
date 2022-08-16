import { useMediaQuery } from 'react-responsive'

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
