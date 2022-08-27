import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { NavTabs } from './NavTabs'

interface Props {
  navs: {
    icon: IconName,
    iconPrefix: IconPrefix,
    title: string,
    href: string,
    active?: boolean
  }[]
}

export const NavBottom = ({ navs } : Props) => {
  return (<S.Header>
    <NavTabs
      navs={navs}
    />
  </S.Header>)
}

const S = {
  Header: styled.div`
    position: absolute;
    bottom: 0;
    width: calc(100% - 1rem);
    padding: 0 .5rem;
    z-index: 1;
    border-top: 2px solid var(--F_Surface);
    background: var(--F_Background);
  `,
  NavContainer: styled.div<{
    width: number
  }>`
    width: ${props => `${props.width}%`};
  `
}
