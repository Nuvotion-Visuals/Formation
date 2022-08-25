import React, { useEffect } from 'react'
import styled from 'styled-components'

export const Ripple = () => {
  useEffect(() => {
    document.body.appendChild(Object.assign(document.createElement('style'), 
      {
        textContent: `
          .animate {
            animation: ripple-mo .5s cubic-bezier(.32,.83,.7,.88);
          }
          @keyframes ripple-mo {
            0% {
              transform: scale(0);
              opacity: 1;
            }
          
            20% {
              transform: scale(4);
              opacity: .7;
            }
          
            100% {
              transform: scale(6);
              opacity: 0;
            }
          }
        `
      }
    ))

    const drawRipple = (e : MouseEvent) => {
      const node = document.querySelector('.ripple')
      const newNode = node?.cloneNode(true)
      if (newNode) {
        try {
          (newNode as HTMLElement).classList.add('animate');
          (newNode as HTMLElement).style.left = `calc(${e.clientX - 5}px * var(--F_Zoom_Scale))`;
          (newNode as HTMLElement).style.top = `calc(${e.clientY - 5}px * var(--F_Zoom_Scale))`;
          (newNode as HTMLElement).style.pointerEvents = 'none'
          node?.parentNode?.replaceChild(newNode, node)
        }
        catch(e) {
          console.log(e)
        }
      }
    }

    window.addEventListener('mousedown', drawRipple)

    return () => {
      document.removeEventListener('mousedown', drawRipple)
    }
  }, [])

  return (
    <S.Ripple className='ripple'></S.Ripple>
  )
}

const S = {
  Ripple: styled.div`
    width: .5rem;
    height: .5rem;
    opacity: 0;
    transform: scale(0);
    background: rgba(255,255,255,0.5);
    border-radius: 50%;
    position: fixed;
    z-index: 999;
    pointer-events: none;
  `
}
