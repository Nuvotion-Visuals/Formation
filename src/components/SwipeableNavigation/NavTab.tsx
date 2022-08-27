import React from 'react'
import styled from 'styled-components'

import { Icon, Break } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon?: IconName,
  iconPrefix?: IconPrefix,
  title: string,
  href: string,
  active?: boolean
}

export const NavTab = ({
  icon,
  iconPrefix,
  title,
  href,
  active
} : Props) => {
  return (
    <S.NavTab href={href} active={active}>
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
      
      <S.Title 
        fullSize={icon === undefined}
        active={active}
      >
        { title }
        </S.Title>
    </S.NavTab>
  )
}

const S = {
  NavTab: styled.a<{
    active?: boolean
  }>`
    display: flex;
    height: calc(100% - .225rem);
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-decoration: none;
    border-bottom: ${props => props.active ? '.225rem solid var(--F_Font_Color)' : 'none'};
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
    margin-top: ${props => !props.fullSize ? '-6px' : '.225rem'};
    font-weight: ${props => props.fullSize && props.active ? '600' : '400'};
  `
}