import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { NavTab } from './NavTab'

interface Props {
  navs: {
    icon?: IconName,
    iconPrefix?: IconPrefix,
    title: string,
    href?: string,
    active?: boolean,
    count?: number
    onClick?: (e: any) => void
  }[],
  borderBottom?: boolean,
  vertical?: boolean,
  compact?: boolean
}

export const NavTabs = ({ navs, borderBottom, vertical, compact } : Props) => {
  return (
    <S.NavTabs borderBottom={borderBottom} compact={compact}>
      {
        navs?.map((nav) =>
          <S.NavContainer width={100 / navs.length}>
            <NavTab
              {...nav}
              vertical={vertical}
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
    compact?: boolean
  }>`
    height: ${props => props.compact ? 'var(--F_Input_Height)' : 'var(--F_Header_Height)'};
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    border-bottom: .325rem solid var(--F_Surface_0);
  `,
  NavContainer: styled.div<{
    width: number
  }>`
    height: 100%;
    width: ${props => `${props.width}%`};
  `
}
