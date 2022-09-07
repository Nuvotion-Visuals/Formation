import React from 'react'
import styled from 'styled-components'

export interface Props {
  children?: React.ReactNode,
  ratio: number,
  backgroundSrc?: string,
  backgroundColor?: string,
  coverBackground?: boolean
}

export const AspectRatio = ({ 
  children, 
  ratio, 
  backgroundSrc,
  backgroundColor,
  coverBackground
} : Props) => {
  return (
    <S.AspectRatio 
      ratio={`${100 / ratio}%`} 
      backgroundColor={backgroundColor}
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
  backgroundColor?: string
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