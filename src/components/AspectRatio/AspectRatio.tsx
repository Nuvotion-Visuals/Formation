import React from 'react'
import styled from 'styled-components'

export interface Props {
  children?: React.ReactNode,
  ratio: number,
  backgroundSrc?: string,
  backgroundColor?: string,
  coverBackground?: boolean,
  borderRadius?: number | string
}

/**
 * `AspectRatio` is a container component that enforces a specific aspect ratio for its content.
 * It's useful for responsive designs and is customizable with a background image or color.
 * It can also optionally round the corners and cover the background.
 *
 * @component
 * @param {React.ReactNode} children - The content to display inside the aspect ratio box.
 * @param {number} ratio - The aspect ratio value represented as width/height.
 * @param {string} [backgroundSrc] - Optional background image source URL.
 * @param {string} [backgroundColor] - Optional background color.
 * @param {boolean} [coverBackground] - Determines if the background should be covered or contained.
 * @param {number|string} [borderRadius] - Optional border radius; can be a number (interpreted as rem) or a string (with units).
 *
 * @example
 * // To create a 16:9 aspect ratio container with a background image
 * <AspectRatio ratio={16/9} backgroundSrc="path/to/image.jpg" coverBackground />
 *
 * @example
 * // To create a 4:3 aspect ratio container with a solid background color and rounded corners
 * <AspectRatio ratio={4/3} backgroundColor="#000" borderRadius="0.5rem" />
 */

export const AspectRatio = ({ 
  children, 
  ratio, 
  backgroundSrc,
  backgroundColor,
  coverBackground,
  borderRadius
} : Props) => {
  return (
    <S.AspectRatio 
      ratio={`${100 / ratio}%`} 
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
    >
      <S.Content>
        {
          children
        }
      </S.Content>

      {
        backgroundSrc
          ? <S.Background src={backgroundSrc} coverBackground={coverBackground}/>
          : null
      }
    </S.AspectRatio>
  )
}

interface AspectRatioProps {
  ratio: string,
  src?: string,
  backgroundColor?: string,
  borderRadius?: string | number
}

interface BackgroundProps {
  coverBackground?: boolean
}

const S = {
  AspectRatio: styled.div<AspectRatioProps>`
    width: 100%;
    padding-top: 56.25%;
    padding-top: ${props => props.ratio};
    height: 0;
    position: relative;
    overflow: hidden;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: ${props => props.backgroundColor};
    border-radius: ${props => typeof props.borderRadius === 'string' ? props.borderRadius : typeof props.borderRadius === 'number' ? `${props.borderRadius}rem` : 0};
  `,
  Content: styled.div`
    position: absolute;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
  Background: styled.img<BackgroundProps>`
    position: absolute;
    object-fit: ${props => props.coverBackground ? 'cover' : 'contain'};
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  `
}