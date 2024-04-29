import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { Icon, Badge, LinkContext, Link as IntLink } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon?: IconName
  iconPrefix?: IconPrefix
  title: string
  href?: string
  active?: boolean
  count?: number
  vertical?: boolean
  onClick?: (e: any) => void
}

export const NavTab = ({
  icon,
  iconPrefix,
  title,
  href,
  active,
  count,
  vertical,
  onClick
} : Props) => {

  const Link: any = useContext(LinkContext) || IntLink;

  const renderIcon = () => <>
    {
      icon && iconPrefix
        ? <>
            <Icon 
              icon={icon} 
              iconPrefix={iconPrefix} 
              fixedWidth
              size='lg'
            />
          </>
        : null
    }
  </>

  const Content = () => <S.NavTab 
    vertical={vertical} 
    active={active} 
    onClick={onClick}
  >
    {
      count
        ? <Badge labelColor='red' count={count}>
            {
              renderIcon()
            }
          </Badge>
        : renderIcon()
    }
    
    <S.Title vertical={vertical} active={active}>
      { 
        title 
      }
    </S.Title>

    {
      active
        ? <S.Active />
        : null
    }
  </S.NavTab>
  
  return (<>
    {
      href
        ? <Link href={href}>
            <Content />
          </Link>
        : <Content />
    }
  </>
    
  )
}

const S = {
  NavTab: styled.div<{
    active?: boolean,
    vertical?: boolean
  }>`
    position: relative;
    display: flex;
    cursor: pointer;
    height: calc(100% - .325rem);
    padding-top: .125rem;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    flex-wrap: ${props => props.vertical ? 'wrap' : 'nowrap'};
    gap: ${props => props.vertical ? '0' : '.25rem'};
    margin-bottom: ${props => props.vertical ? '0' : '-.125rem'};
    * {
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Disabled)'};
    }
  `,
  Title: styled.div<{
    vertical?: boolean,
    active?: boolean
  }>`
    font-size: ${props => !props.vertical ? 'var(--F_Font_Size)' : '12px'};
    width: ${props => props.vertical ? '100%' : 'auto'};
    text-align: center;
    font-weight: ${props => props.active ? '600' : '400'};
  `,
  Active: styled.div`
    position: absolute;
    bottom: -8px;
    width: 100%;
    height: .325rem;
    background: var(--F_Font_Color);
  `
}