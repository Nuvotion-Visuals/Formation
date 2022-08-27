import React from 'react'
import styled from 'styled-components'

import { Icon, Break } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon: IconName,
  iconPrefix: IconPrefix,
  title: string,
  href: string
}

export const NavTab = ({
  icon,
  iconPrefix,
  title,
  href
} : Props) => {
  return (
    <S.NavTab href={href}>
      <Icon 
        icon={icon} 
        iconPrefix={iconPrefix} 
        fixedWidth
        size='lg'
      />
      <Break />
      <S.Title>{ title }</S.Title>
    </S.NavTab>
  )
}

const S = {
  NavTab: styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: .25rem;
    text-decoration: none;
  `,
  Title: styled.div`
    font-size: 12px;
    color: var(--F_Font_Color);
  `
}