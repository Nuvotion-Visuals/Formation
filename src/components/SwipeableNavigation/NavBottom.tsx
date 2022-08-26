import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { NavIcon } from './NavIcon'

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
      {
        navs.map(({ icon, iconPrefix, href, title }) =>
          <S.NavContainer width={100 / navs.length}>
            <NavIcon
              icon={icon}
              iconPrefix={iconPrefix}
              title={title}
              href={href}
            />
          </S.NavContainer>
        )
      }
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
  `,
  Inner: styled.div`
    height: var(--F_Header_Height);
    display: flex;
    align-items: center;
    padding: 0 .5rem;
    justify-content: center;
  `,
  NavContainer: styled.div<{
    width: number
  }>`
    width: ${props => `${props.width}%`};
  `
}
