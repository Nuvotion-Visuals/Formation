import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { NavTab } from './NavTab'

interface Props {
  navs: {
    icon: IconName,
    iconPrefix: IconPrefix,
    title: string,
    href: string
  }[],
  borderBottom?: boolean
}

export const NavTabs = ({ navs, borderBottom } : Props) => {
  return (
    <S.NavTabs borderBottom={borderBottom}>
      {
        navs.map(({ icon, iconPrefix, href, title }) =>
          <S.NavContainer width={100 / navs.length}>
            <NavTab
              icon={icon}
              iconPrefix={iconPrefix}
              title={title}
              href={href}
            />
          </S.NavContainer>
        )
      }
    </S.NavTabs>
  )
}

const S = {
  NavTabs: styled.div<{
    borderBottom?: boolean
  }>`
    height: var(--F_Header_Height);
    display: flex;
    align-items: center;
    padding: 0 .5rem;
    justify-content: center;
    border-bottom: ${props => props.borderBottom ? '2px solid var(--F_Surface)' : 'none'};
  `,
  NavContainer: styled.div<{
    width: number
  }>`
    width: ${props => `${props.width}%`};
  `
}
