import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Icon } from '../Icon/Icon'

interface Props {
  onClose: () => void,
  open: boolean
}

export const NavBar = ({ onClose, open }: Props) => {

  return (<>
    <S.Sidebar>


  
    <S.Sidebar2>
      <Sidebar3 />
    </S.Sidebar2>


    </S.Sidebar>
    <S.Backdrop 
      hide={open}
      onClick={() => !open ? onClose() : null}
    />
  </>)
}

interface BackdropProps {
  hide: boolean
}

const S = {
  Sidebar: styled.div`
    width: var(--Sidebar_Width);
    display: flex;
    height: calc(100vh * var(--Zoom_Scale));

    a {
      text-decoration: none;
    }

    @media screen and (max-width: 1333px) {
      position: fixed;
      left: 0;
      top: var(--Header_Height);
      z-index: 4;
    }
  `,
  Backdrop: styled.div<BackdropProps>`
    display: ${props => props.hide ? 'none' : 'flex'};

    position: fixed;
    left: 0;
    top: 0;
    width: calc(100vw * var(--Zoom_Scale));
    height: calc(100vh * var(--Zoom_Scale));
    background: rgb(0, 0, 0, .4);
    z-index: 3;
    @media screen and (min-width: 1333px) {
      display: none;
    }
  `,
  Sidebar2: styled.div`

    top: 0;
    /* position: fixed; */
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
  SidebarContent: styled.div`
    height: 100%;
    background: var(--Background);
    border-right: 2px solid var(--Surface);
  `,
  NavOptions: styled.div`
    width: 100%;
  `,
  NavOption: styled.div`
    cursor: pointer;
    background: ${props => props.active ? 'var(--Surface)' : 'none'};
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => props.expanded ? 'auto' : 'center'};
    align-items: center;
    height: ${props => props.expanded ? '46px' : 'var(--Sidebar_Icon_Width)'};
    width: 100%;

    * {
      color: ${props => props.active ? 'var(--Font_Color)' : 'auto'};
    }

    div {
      color: ${props => props.active ? 'var(--Font_Color)' : 'var(--Font_Color)'};
    }

    &:hover {
      background: ${props => props.active ? 'var(--Surface)' : 'var(--Surface_1)'};
      * {
        color: var(--Font_Color);
      }
    }
  `,
  NavContent: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${props => props.expanded ? '0' : '8px'};
    height: ${props => props.expanded ? '100%' : 'auto'};
    align-items: ${props => props.expanded ? 'center' : 'auto'};
  `,
  IconContainer: styled.div`
    width: var(--Sidebar_Icon_Width);
    display: flex;
    justify-content: center;
  `,
  Text: styled.div`
    font-size: ${props => props.shrink ? '12px' : 'var(--Font_Size)'};
    letter-spacing: var(--Letter_Spacing_Title);
    /* font-weight: ${props => props.active ? '600' : '400'}; */
  `,
  Spacer: styled.div`
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
  `,
  SocialContainer: styled.div`
    width: calc(100% - 2rem);
    padding: 0 1rem;
  `
}



const Sidebar3 = ({  }) => {
  const navs = [
    {
      type: 'nav',
      name: 'Home',
      icon: 'info-circle',
      href: '/'
    },
    {
      type: 'nav',
      name: 'Scenes',
      icon: 'info-circle',
      href: '/scenes',
      toolTipTitle: 'Browse scenes to build your playlist'
    },
    {
      type: 'clickNav',
      name: 'Deck',
      toolTipTitle: 'Perform live music visuals with the scenes in your playlist',
      icon: 'info-circle',
      href: '/app',
      active: false,
      onClickFunction: ()=> {
       
      }
    },
    {
      type: 'nav',
      name: 'Mosh',
      icon: 'info-circle',
      href: '/mosh',
      toolTipTitle: 'Datamosh video files'
    },
    {
      type: 'spacer'
    },
    {
      type: 'title',
      title: 'Learn'
    },
    {
      type: 'nav',
      name: 'Tutorials',
      icon: 'info-circle',
      href: '/tutorials',
      toolTipTitle: 'Learn how to create, perform, and share live music visuals'
    },
    {
      type: 'nav',
      name: 'FAQ',
      icon: 'info-circle',
      href: '/faq',
      hideWhenCollapsed: true,
      toolTipTitle: 'Get answers about AVsync.LIVE'
    },
    {
      type: 'nav',
      name: 'Contact Us',
      icon: 'info-circle',
      hideWhenCollapsed: true,
      toolTipTitle: 'Contact us on Facebook Messenger, Instagram, or Discord',
      onClickFunction: () => {
      }
    }
  ]

  const renderNavlink = ({ 
    href, 
    index, 
    icon, 
    name, 
    toolTipTitle,
    newTab,
    onClickFunction
  }) => {

    const renderNavOption = () => (
      <S.NavOption 
        active={false} 
        key={`navOption${name}`} 
        expanded={true}
        title={toolTipTitle}
        onClick={() => {
          if (window.innerWidth < 1333) {
            // setSidebarExpanded(false)
          }
          if (onClickFunction) {
            onClickFunction()
          }
        }}
      >
        
        <S.NavContent expanded={true}>
          <S.IconContainer>
            <Icon icon={icon} iconPrefix={'fas'} />
          </S.IconContainer>
          <S.Text
            shrink={false}
            active={false}
          >
            { name }
          </S.Text>
        </S.NavContent>
      </S.NavOption>
    )

    return (
      href
        ? <a 
            href={href} 
      
          >
            { renderNavOption() }
          </a>
        : renderNavOption()
      
    )
  }

  const renderClickNav = ({ 
    index, 
    icon, 
    name, 
    active, 
    onClickFunction, 
    toolTipTitle 
  }) => (
    <S.NavOption 
      active={active} 
      onClick={() => {
        if (onClickFunction) {
          onClickFunction()
        }
        if (window.innerWidth < 1333) {
          // setSidebarExpanded(false)
        }
      }}
      key={`navOption${name}`} 
      expanded={true}
      title={toolTipTitle}
    >
      
      <S.NavContent expanded={true}>
        <S.IconContainer>
          <Icon icon={icon} iconPrefix={active ? 'fas' : 'fas'} />
        </S.IconContainer>
        <S.Text
          shrink={!true}
          active={active}
        >
          { name }
        </S.Text>
      </S.NavContent>
      
    </S.NavOption>
  )

  const renderSpacer = props => (
    <S.Spacer />
  )

  const renderTitle = ({ title }) => (
    <S.Title>{ title }</S.Title>
  )

  const renderSocials = ({ title }) => (
    <S.SocialContainer>
      {/* <Socials /> */}
    </S.SocialContainer>
  )

  const renderNav = props => {
    const { type } = props

    switch(type) {
      case 'nav':
        return renderNavlink(props)
      case 'clickNav':
        return renderClickNav(props)
      case 'spacer':
        return true ? renderSpacer(props) : null
      case 'title':
        return true ? renderTitle(props) : null

      case 'socials':
        return renderSocials(props)
      default:
        return null
    }
  }
  
  return (
      <S.SidebarContent>
        <S.NavOptions>
          {
            navs.map((props, index) => 
              props.hideWhenCollapsed && !true
                ? null
                : renderNav(props)
            ) 
          }
        </S.NavOptions>

      

    </S.SidebarContent>
  )
}

