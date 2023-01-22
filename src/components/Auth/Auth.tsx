import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string,
  children: React.ReactNode,
  logoSrc: string
}

export const Auth = ({ 
  title, 
  children, 
  logoSrc 
}: Props) =>
  <S_Container>
    <S_Side>
      <S_SideBackground />
      <S_Overlay />
    </S_Side>

    <S_Flex>
      <S_AuthContainer>
        
      </S_AuthContainer>
    </S_Flex>

    <S_Center>
      <S_LogoContainer src={logoSrc}>
      </S_LogoContainer>
        <S_Auth>
          <S_TitleContainer>
            {
              title
            }
          </S_TitleContainer>
          {
            children
          }
        </S_Auth>
    </S_Center>

  </S_Container>

const S_TitleContainer = styled.h1`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  font-size: 26px;
`

const S_Center = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  width: 100%;
  justify-content: center;
  z-index: 1;
  width: 340px;
`

const S_Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--F_Background_Alternating);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 20% 70%;
`

const S_Flex = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const S_AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 340px;
  padding-top: 1rem;
  @media screen and (max-height: 650px) {
    padding-top: 4.25rem;
  }
`

const S_Auth = styled.div`
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
`

const S_LogoContainer = styled.div<{
  src?: string
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
  background-image: ${props => props.src ? `url(${props.src})` : 'var(--F_Background)'};
  background-repeat: none;
  background-size: cover;
  background-position: center;
`

const S_Side = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  @media (max-width: 1100px) {
    display: none;
  }
`

const S_Overlay = styled.div`
  background: linear-gradient(to right, rgba(12,12,12,1) 0%,rgba(12,12,12,0) 50%, rgba(12,12,12,1) 100%);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`

const S_SideBackground = styled.img`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
