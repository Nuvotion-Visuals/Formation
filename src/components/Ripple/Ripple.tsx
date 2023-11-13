import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

/**
 * The `Ripple` component creates a visual ripple effect extending out from the input point on mouse click. 
 * The ripple animation is designed to mimic the effect of dropping a pebble into a still pool of water, with concentric circles radiating outwards. 
 * The component creates the ripple effect by dynamically adding and removing div elements with the appropriate styling.
 * 
 * This component creates the ripple effect globally; anywhere you click on the screen (where the component is included), the ripple effect takes place.
 *
 * @component
 *
 * @example
 * <Ripple />
 */
export const Ripple = () => {
  const rippleContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = `
      .animate {
        animation: ripple-mo .5s cubic-bezier(.32,.83,.7,.88);
      }
      @keyframes ripple-mo {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        20% {
          transform: scale(1);
          opacity: .7;
        }
        100% {
          transform: scale(1.2);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(styleElement)

    const drawRipple = (e: any) => {
      const rippleContainer = rippleContainerRef.current
      if (rippleContainer) {
        const newRipple = document.createElement('div')
        newRipple.className = 'ripple animate'
        const rippleSize = 26 // Size of the ripple
        const x = e.clientX - rippleSize / 2
        const y = e.clientY - rippleSize / 2
        newRipple.style.width = `${rippleSize}px`
        newRipple.style.height = `${rippleSize}px`
        newRipple.style.left = `${x}px`
        newRipple.style.top = `${y}px`
        rippleContainer.appendChild(newRipple)

        setTimeout(() => {
          newRipple.remove()
        }, 500)
      }
    }

    window.addEventListener('mousedown', drawRipple)

    return () => {
      window.removeEventListener('mousedown', drawRipple)
      document.head.removeChild(styleElement)
    }
  }, [])

  return (
    <S.RippleContainer ref={rippleContainerRef} />
  )
}

const S = {
  RippleContainer: styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    overflow: hidden;
    pointer-events: none;

    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.5);
      transform: scale(0);
      opacity: 0;
      pointer-events: none;
    }
  `
}
