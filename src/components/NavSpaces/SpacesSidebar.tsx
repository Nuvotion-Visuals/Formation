import React, { memo } from 'react'
import styled from 'styled-components'

import { SpaceIcon } from './SpaceIcon'

import { Icon, Box } from '../../internal'

import { Space } from './NavSpaces'

interface Props {
  spaces: Space[],
  onClickIndex: (index: number) => void,
  activeSpaceIndex: number
}

export const SpacesSidebar = memo(({ 
  spaces,
  onClickIndex,
  activeSpaceIndex
}: Props) => {

  return (<>
    <S.Sidebar>

        <Box py={0} width='100%'/>

        {
          spaces.map((space, index) => 
            <S.SidebarContainer key={index}>
              <S.Active hide={activeSpaceIndex !== index}/>

              <SpaceIcon
                src={space.src}
                onClick={() => 
                  space?.onClick
                    ? space.onClick()
                    : onClickIndex(index)
                }
                date={space.date}
                href={space.href}
                name={space.name}
                active={activeSpaceIndex === index}
                icon={space.icon}
                iconPrefix={space.iconPrefix}
              />
            </S.SidebarContainer>
          )
        }
      <S.VSpacer />
    </S.Sidebar>
  </>)
})

const S = {
  Sidebar: styled.div`
    height: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: start;
    gap: .75rem;
    border-right: 2px solid var(--F_Surface);
    width: 74px;
    min-width: 74px;
    ::-webkit-scrollbar {
      width: .325rem;
      height: .325rem;
    }
  `,
  SidebarContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    width: 100%;
    padding-left: .25rem;
    overflow-x: visible;
  `,
  Active: styled.div<{
    hide: boolean
  }>`
    position: absolute;
    left: 0;
    background: var(--F_Font_Color);
    width: .325rem;
    transform: ${props => props.hide ? 'scale(0.0)' : 'scale(1.0)'};
    height: 3.25rem;
    transition: transform .3s;
    z-index: 99;
    border-radius: 0 .25rem .25rem 0;
  `,
  SpaceIcon: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 100%;
    background: var(--F_Surface);
    background-size: cover;
    background-position: center;
    cursor: pointer;
    * {
      color: var(--F_Font_Color);
    }
    &:hover {
      background: var(--F_Surface_1);
    }
  `,
  VSpacer: styled.div`
    width: 100%;
    margin-bottom: .5rem;
  `
}
