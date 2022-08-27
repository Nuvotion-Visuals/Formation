import React from 'react'
import styled from 'styled-components'

import { SpaceIcon } from './SpaceIcon'

import { Icon } from '../../internal'

interface Props {
  spaces: {
    src?: string,
    title: string
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
    padding-left: 6px;
  `,
  Active: styled.div`
    position: absolute;
    left: 0px;
    background: var(--F_Font_Color);
    width: 6px;
    height: 52px;
    z-index: 99;
  `,
  LeftBar: styled.div`
    position: absolute;
    left: 0px;
    background: var(--F_Surface_0);
    width: 6px;
    height: calc(100vh - var(--F_Header_Height));
    z-index: 99;
  `,
  SpaceIcon: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 52px;
    height: 52px;
    margin-top: 8px;
    margin-left: 6px;
    border-radius: 100%;
    box-shadow: var(--F_Outline);
    background-size: cover;
    background-position: center;
    cursor: pointer;
    &:hover {
      background: var(--F_Surface);
    }
  `
}
