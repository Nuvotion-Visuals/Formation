import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string,
  children: React.ReactNode,
  logoSrc: string,
  height: string
}

export const Auth = ({ 
  title, 
  children, 
  logoSrc,
  height 
}: Props) => (
  <S.Container height={height}>
    <S.Center>
      <S.LogoContainer src={logoSrc} />
      <S.Auth>
        <S.TitleContainer>
          {
            title
          }
        </S.TitleContainer>
        {
          children
        }
      </S.Auth>
    </S.Center>
  </S.Container>
)

export const S = {
  Container: styled.div<{
    height: string
  }>`
    width: 100%;
    height: ${props => props.height};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Center: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: absolute;
    width: 100%;
    justify-content: center;
    z-index: 1;
    width: 340px;
  `,
  LogoContainer: styled.div<{
    src: string
  }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    margin-bottom: -2.5rem;
    box-shadow: var(--F_Outline);
    background-color: var(--F_Background);
    border-radius: 100%;
    width: 72px;
    height: 72px;
    min-width: 72px;
    overflow: hidden;
    background-image: ${props => (props.src ? `url(${props.src})` : 'var(--F_Background)')};
    background-repeat: none;
    background-size: cover;
    background-position: center;
  `,
  Auth: styled.div`
    position: relative;
    width: 340px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: calc(100vw - 6rem);
    padding: 1em;
    background: var(--F_Background);
    border-radius: 1rem;
    color: var(--F_Font_Color);
    box-shadow: var(--F_Outline);
  `,
  TitleContainer: styled.h1`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 2.25rem;
    margin-bottom: 1.25rem;
    font-size: 26px;
  `,
}