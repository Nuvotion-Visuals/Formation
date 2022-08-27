import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { NavTabs } from './NavTabs'

interface Props {
  navs: {
    icon: IconName,
    iconPrefix: IconPrefix,
    title: string,
    href: string
  }[]
}

export const NavBottom = ({ navs } : Props) => {
  return (<S.Header>
    <S.Inner>
      <NavTabs
        navs={navs}
      />
    </S.Inner>
  </S.Header>)
}

const S = {
  Header: styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 1;
    border-top: 2px solid var(--F_Surface);
    background: var(--F_Background);
  `,
  Inner: styled.div`
    height: var(--F_Header_Height);
    width: 100%;
    display: flex;
    align-items: center;
    /* padding: 0 .5rem; */
    justify-content: center;
  `,
  NavContainer: styled.div<{
    width: number
  }>`
    width: ${props => `${props.width}%`};
  `
}
