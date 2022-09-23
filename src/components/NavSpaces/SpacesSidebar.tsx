import React from 'react'
import styled from 'styled-components'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import Div100vh from 'react-div-100vh'

import { SpaceIcon } from './SpaceIcon'


import { Icon, Box } from '../../internal'

import { Space } from './NavSpaces'

interface Props {
  spaces: Space[],
  onClickIndex: (index: number) => void,
  activeSpaceIndex: number,
  onCreateSpace: () => void
}

export const SpacesSidebar = ({ 
  spaces,
  onClickIndex,
  activeSpaceIndex,
  onCreateSpace
}: Props) => {

  return (<>
    <S.Sidebar>

      <S.LeftBar />
        <Box py={0} width='100%'/>

        {
          spaces.map((space, index) => <>
            {
              space.name === ''
                ? <S.SpaceIcon onClick={space.onClick}>
                  {
                    space.icon && <Icon icon={space.icon} iconPrefix={space.iconPrefix}/>
                  }
                    
                  </S.SpaceIcon>
                : <S.SidebarContainer key={index}>
                    <S.Active hide={activeSpaceIndex !== index}/>

                    <SpaceIcon
                      src={space.src}
                      onClick={() => onClickIndex(index)}
                      date={space.date}
                      href={space.href}
                      name={space.name}
                      active={activeSpaceIndex === index}
                    />
                  </S.SidebarContainer>
              }
          </>
          )
        }
      <S.VSpacer />
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
  Active: styled.div<{
    hide: boolean
  }>`
    position: absolute;
    left: 0px;
    background: var(--F_Font_Color);
    width: .325rem;
    transform: ${props => props.hide ? 'scale(0.0)' : 'scale(1.0)'};
    height: 3.25rem;
    transition: transform .3s;
    z-index: 99;
    border-radius: 0 .25rem .25rem 0;

  `,
  LeftBar: styled.div`
    position: absolute;
    left: 0px;
    width: .325rem;
    height: calc(100vh - var(--F_Header_Height));
  `,
  SpaceIcon: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.25rem;
    height: 3.25rem;
    margin-left: .325rem;
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
