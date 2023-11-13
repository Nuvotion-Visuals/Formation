import React, { useContext, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon, Box, LinkContext, Link as IntLink } from '../../internal'

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
  onClick?: (e: React.MouseEvent) => void,
  children?: React.ReactNode
}

export type Navs = NavProps[]

interface Props {
  onClose: () => void,
  open: boolean,
  navs: Navs,
  active?: boolean
}

/**
 * A sidebar component that includes navigation links and can be toggled open and closed.
 * The sidebar supports various types of contents such as links, click handlers, spacers and titles.
 * 
 * Each navigation item (entry in the 'navs' prop array) could be one of four types:
 * - nav: A link that navigates the user to a new page when clicked. It can optionally have an icon.
 * - clickNav: Similar to 'nav', but instead of navigating, it calls an onClick function when clicked.
 * - spacer: A separator line used for better visual separation between navigation items.
 * - title: A non-clickable text, used as a section title for a group of related navigation items.
 * 
 * @param {boolean} open - Determines if the sidebar is open or closed.
 * @param {Array<Object>} navs - An array of objects, each represents a possible type of navigation link as described above.
 * @param {Function} onClose - A function that will be executed when the sidebar should be closed.
 *
 * @component
 * @example
 * const navs = [
 *   {
 *     type: 'nav',
 *     href: '/some-url',
 *     name: 'Some URL',
 *     icon: 'link',
 *   },
 *   {
 *     type: 'clickNav',
 *     name: 'A Clickable Nav',
 *     onClick: () => { console.log('Clicked!'); },
 *     icon: 'mouse-pointer',
 *     active: true, // will show this nav item as active (highlighted)
 *   },
 *   { type: 'spacer' },
 *   {
 *     type: 'title',
 *     title: 'A Section Title',
 *   },
 * ];
 * 
 * const handleClose = () => {
 *   console.log('Sidebar is closing.');
 * };
 *  
 * return (
 *  <Sidebar open onClose={handleClose} navs={navs} />
 * );
 */
export const Sidebar = ({ onClose, open, navs, active }: Props) => {
  const Link: any = useContext(LinkContext) || IntLink;

  const renderNavlink = ({ 
    href, 
    icon, 
    name, 
    toolTipTitle,
    newTab,
    onClick,
    active,
    children
  } : NavProps) => {
    const renderNavOption = () => (
      <S.NavOption 
        active={active} 
        key={`navOption${name}`} 
        open={true}
        title={toolTipTitle}
        onClick={(e) => {
          if (onClick) {
            onClick(e)
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
        {
          children
        }
      </S.NavOption>
    )

    return (
      href
        ? <Link href={href}>
            { 
              renderNavOption() 
            }
          </Link>
        : renderNavOption()
      
    )
  }

  const renderClickNav = ({ 
    icon, 
    name, 
    active, 
    onClick, 
    toolTipTitle,
    children
  }: NavProps) => (
    <S.NavOption 
      active={active} 
      onClick={(e) => {
        if (onClick) {
          onClick(e)
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
      {
        children
      }
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
    width: var(--F_Sidebar_Width);
    min-width: var(--F_Sidebar_Width);
    max-width: var(--F_Sidebar_Width);
    margin-top: var(--F_Header_Height);
    display: flex;
    height: calc(calc(100vh * var(--F_Zoom_Scale)) - var(--F_Header_Height));
    a {
      text-decoration: none;
    }
    @media screen and (max-width: 1024px) {
      position: fixed;
      left: 0;
      margin-top: 0;
      top: var(--F_Header_Height);
      z-index: 4;
    }
  `,
  Backdrop: styled.div<BackdropProps>`
    display: ${props => props.open ? 'flex' : 'none'};
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100vw * var(--F_Zoom_Scale));
    height: calc(100vh * var(--F_Zoom_Scale));
    background: var(--F_Backdrop_Light);
    z-index: 2;
    @media screen and (min-width: 1024px) {
      display: none;
    }
  `,
  SidebarContent: styled.div<SidebarContentProps>`
    height: 100%;
    background: var(--F_Background);
    border-right: ${props => props.open ? '1px solid var(--F_Surface)' : 'none'};
    top: 0;
    width: var(--F_Sidebar_Width);
    height: calc(100% * var(--F_Zoom_Scale));
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
  `,
  NavOption: styled.div<NavContentProps>`
    cursor: pointer;
    background: ${props => props.active ? 'var(--F_Surface)' : 'none'};
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => props.open ? 'auto' : 'center'};
    align-items: center;
    height: ${props => props.open ? '46px' : 'var(--F_Sidebar_Icon_Width)'};
    width: 100%;

    * {
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'auto'};
    }

    div {
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'var(--F_Font_Color)'};
    }

    &:hover {
      background: ${props => props.active ? 'var(--F_Surface)' : 'var(--F_Surface_0)'};
      div {
        color: var(--F_Font_Color);
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
    width: var(--F_Sidebar_Icon_Width);
    display: flex;
    justify-content: center;
  `,
  Text: styled.div`
    font-size: var(--F_Font_Size);
    letter-spacing: var(--F_Letter_Spacing_Title);
  `,
  VSpacer: styled.div`
    width: 100%;
    height: 1px;
    margin: .5rem 0;
    background: var(--F_Surface);
  `,
  Title: styled.div`
    text-transform: uppercase;
    color: var(--F_Font_Color_Label);
    font-weight: 600;
    padding: .5rem 0;
    padding-left: 1.5rem;
    padding-bottom: .5rem;
    font-size: var(--F_Font_Size);
    margin-top: .25rem;

  `
}

