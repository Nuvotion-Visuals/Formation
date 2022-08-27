import React from 'react'
import styled from 'styled-components'

import Div100vh from 'react-div-100vh'

import { SpaceIcon } from './SpaceIcon'

import { Icon } from '../../internal'

interface Props {
  spaces: {
    src?: string,
    title: string,
    date?: Date
  }[],
  onClickIndex: (index: number) => void,
  activeSpaceIndex: number
}

export const SpacesSidebar = ({ 
  spaces,
  onClickIndex,
  activeSpaceIndex
}: Props) => {
  return (<>
    <S.Sidebar>
      <S.LeftBar />

      <S.SpaceIcon>
        <Icon icon='plus' iconPrefix='fas'/>
      </S.SpaceIcon>
        {
          spaces.map((space, index) =>
            <S.SidebarContainer key={index}>
              {
                activeSpaceIndex === index
                  ? <S.Active />
                  : null
              }

              <SpaceIcon
                src={space.src}
                onClick={() => onClickIndex(index)}
                date={space.date}
              />
            </S.SidebarContainer>
          )
        }
    </S.Sidebar>
  </>)
}

const S = {
  Sidebar: styled.div`
    width: 72px;
    height: calc(100vh - var(--F_Header_Height));
    overflow-y: auto;
    overflow-x: visible;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: start;
    gap: .75rem;
    border-right: 2px solid var(--F_Surface);
    position: absolute;
    top: 0;
    left: 0px;
    ::-webkit-scrollbar {
      width: .25rem;
      height: .25rem;
    }
  `,
  SidebarContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    padding-left: .325rem;
  `,
  Active: styled.div`
    position: absolute;
    left: 0px;
    background: var(--F_Font_Color);
    width: .325rem;
    height: 3.25rem;
    z-index: 99;
  `,
  LeftBar: styled.div`
    position: absolute;
    left: 0px;
    background: var(--F_Surface_0);
    width: .325rem;
    height: calc(100vh - var(--F_Header_Height));
  `,
  SpaceIcon: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.25rem;
    height: 3.25rem;
    margin-top: .5rem;
    margin-left: .325rem;
    border-radius: 100%;
    /* box-shadow: var(--F_Outline); */
    background: var(--F_Surface);
    background-size: cover;
    background-position: center;
    cursor: pointer;
    &:hover {
      background: var(--F_Surface_1);
    }
  `
}
