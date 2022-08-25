import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon, Box } from '../../internal'

interface NavProps {
  type?: string,
  href?: string,
  title?: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  name?: string,
  toolTipTitle?: string,
  active?: boolean,
  newTab?: boolean,
  onClick?: () => void
}

export type Navs = NavProps[]

interface Props {
  onClose: () => void,
  open: boolean,
  navs: Navs
}

export const Sidebar = ({ onClose, open, navs }: Props) => {
  const renderNavlink = ({ 
    href, 
    icon, 
    name, 
    toolTipTitle,
    newTab,
    onClick
  } : NavProps) => {
    const renderNavOption = () => (
      <S.NavOption 
        active={false} 
        key={`navOption${name}`} 
        open={true}
        title={toolTipTitle}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      >
        <S.NavContent open={true}>
          {
            icon
              ? <S.IconContainer>
                  <Icon icon={icon} iconPrefix={'fas'} />
                </S.IconContainer>
              : <Box pl={2.25}/>
          }
          <S.Text>
            { name }
          </S.Text>
        </S.NavContent>
      </S.NavOption>
    )

    return (
      href
        ? <a href={href}>
            { 
              renderNavOption() 
            }
          </a>
        : renderNavOption()
      
    )
  }

  const renderClickNav = ({ 
    icon, 
    name, 
    active, 
    onClick, 
    toolTipTitle 
  }: NavProps) => (
    <S.NavOption 
      active={active} 
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      key={`navOption${name}`} 
      open={true}
      title={toolTipTitle}
    >
      <S.NavContent open={true} active={active}>
        {
          icon
            ? <S.IconContainer>
                <Icon icon={icon} iconPrefix={'fas'} />
              </S.IconContainer>
            : <Box pl={2.25}/>
        }
        <S.Text>
          { name }
        </S.Text>
      </S.NavContent>
    </S.NavOption>
  )

  const renderNav = (props : NavProps) => {
    const { type } = props

    switch(type) {
      case 'nav':
        return renderNavlink(props)
      case 'clickNav':
        return renderClickNav(props)
      case 'spacer':
        return <S.VSpacer />
      case 'title':
        return <S.Title>{ props.title }</S.Title>
      default:
        return null
    }
  }

  return (<>
    <S.Sidebar>
      <S.SidebarContent open={open}>
        <S.NavOptions>
          {
            navs.map(props => renderNav(props))
          }
        </S.NavOptions>
      </S.SidebarContent>
    </S.Sidebar>
    <S.Backdrop 
      open={open}
      onClick={() => onClose()}
    />
  </>)
}

interface BackdropProps {
  open: boolean
}

interface SidebarContentProps {
  open: boolean
}
interface NavContentProps {
  open?: boolean,
  active?: boolean
}

const S = {
  Sidebar: styled.div`
    width: var(--Sidebar_Width);
    display: flex;
    height: calc(calc(100vh - var(--Header_Height)) * var(--Zoom_Scale));
    a {
      text-decoration: none;
    }

    @media screen and (max-width: 1024px) {
      height: calc(100vh * var(--Zoom_Scale));
      padding-top: 0;
      position: fixed;
      left: 0;
      top: var(--Header_Height);
      z-index: 4;
    }
  `,
  Backdrop: styled.div<BackdropProps>`
    display: ${props => props.open ? 'flex' : 'none'};
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100vw * var(--Zoom_Scale));
    height: calc(100vh * var(--Zoom_Scale));
    background: rgb(0, 0, 0, .4);
    z-index: 3;
    @media screen and (min-width: 1024px) {
      display: none;
    }
  `,
  SidebarContent: styled.div<SidebarContentProps>`
    height: 100%;
    background: var(--Background);
    border-right: ${props => props.open ? '2px solid var(--Surface)' : 'none'};
    top: 0;
    width: var(--Sidebar_Width);
    height: calc(100vh * var(--Zoom_Scale));
    overflow-y: auto;
    overflow-x: hidden;
    user-select: none;
    z-index: 3;
    ::-webkit-scrollbar {
      width: 0;
    }

    &:hover {
      ::-webkit-scrollbar {
        width: .75rem;
      }
    }
  `,
  NavOptions: styled.div`
    width: 100%;
    padding-top: .5rem;
  `,
  NavOption: styled.div<NavContentProps>`
    cursor: pointer;
    background: ${props => props.active ? 'var(--Surface)' : 'none'};
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => props.open ? 'auto' : 'center'};
    align-items: center;
    height: ${props => props.open ? '46px' : 'var(--Sidebar_Icon_Width)'};
    width: 100%;

    * {
      color: ${props => props.active ? 'var(--Font_Color)' : 'auto'};
    }

    div {
      color: ${props => props.active ? 'var(--Font_Color)' : 'var(--Font_Color)'};
    }

    &:hover {
      background: ${props => props.active ? 'var(--Surface)' : 'var(--Surface)'};
      * {
        color: var(--Font_Color);
      }
    }
  `,
  NavContent: styled.div<NavContentProps>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${props => props.open ? '0' : '.5rem'};
    height: ${props => props.open ? '100%' : 'auto'};
    align-items: ${props => props.open ? 'center' : 'auto'};
  `,
  IconContainer: styled.div`
    width: var(--Sidebar_Icon_Width);
    display: flex;
    justify-content: center;
  `,
  Text: styled.div`
    font-size: var(--Font_Size);
    letter-spacing: var(--Letter_Spacing_Title);
  `,
  VSpacer: styled.div`
    width: 100%;
    height: 2px;
    margin: .5rem 0;
    background: var(--Surface);
  `,
  Title: styled.div`
    text-transform: uppercase;
    color: var(--Font_Color_Label);
    font-weight: 600;
    padding: .5rem 0;
    padding-left: 1.5rem;
    padding-bottom: .5rem;
    font-size: var(--Font_Size);
  `
}

