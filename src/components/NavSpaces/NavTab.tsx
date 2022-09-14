import React from 'react'
import styled from 'styled-components'

import { Icon, Badge, getLinkComponent } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon?: IconName,
  iconPrefix?: IconPrefix,
  title: string,
  href: string,
  active?: boolean,
  count?: number
}

export const NavTab = ({
  icon,
  iconPrefix,
  title,
  href,
  active,
  count
} : Props) => {

  const Link = getLinkComponent()

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
  
  return (
    <Link href={href}>
      <S.NavTab active={active}>
        {
          count
            ? <Badge colorString='red' count={count}>
                {
                  renderIcon()
                }
              </Badge>
            : renderIcon()
        }
        
        <S.Title fullSize={icon === undefined} active={active}>
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
    </Link>
  )
}

const S = {
  NavTab: styled.div<{
    active?: boolean
  }>`
    position: relative;
    display: flex;
    height: calc(100% - .325rem);
    padding-top: .125rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-decoration: none;
    * {
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Disabled)'};
    }
  `,
  Title: styled.div<{
    fullSize: boolean,
    active?: boolean
  }>`
    font-size: ${props => props.fullSize ? 'var(--F_Font_Size)' : '12px'};
    width: 100%;
    text-align: center;
    margin-top: ${props => !props.fullSize ? '-2px' : '.125rem'};
    font-weight: ${props => props.fullSize && props.active ? '600' : '400'};
  `,
  Active: styled.div`
    position: absolute;
    bottom: -8px;
    width: 100%;
    height: .325rem;
    background: var(--F_Font_Color);
  `
}