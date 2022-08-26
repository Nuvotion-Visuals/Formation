import React from 'react'
import styled from 'styled-components'

import { SpaceIcon } from './SpaceIcon'

import { Icon } from '../../internal'

interface Props {
  
}

export const SpacesSidebar = ({  }: Props) => {
  return (
    <S.Sidebar>
      <S.SpaceIcon>
        <Icon icon='plus' iconPrefix='fas'/>
      </S.SpaceIcon>
        {
          new Array(5).fill(0).map((event, index) =>
            <S.SidebarContainer key={index}>
              {
                index === 1
                  ? <S.Active />
                  : null
              }

              <SpaceIcon/>
            </S.SidebarContainer>
          )
        }
    </S.Sidebar>
  )
}

const S = {
  Sidebar: styled.div`
    width: 72px;
    height: calc(calc(100vh - var(--F_Header_Height)) - 1.5rem);
    overflow-y: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: start;
    padding: .75rem 0;
    gap: .75rem;
    border-right: 2px solid var(--F_Surface);
    position: absolute;
    top: 0;
  `,
  SidebarContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  `,
  Active: styled.div`
    position: absolute;
    left: 0;
    background: var(--F_Primary);
    width: 6px;
    height: 60px;
    border-radius: 0 4px 4px 0;
  `,
  SpaceIcon: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
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
