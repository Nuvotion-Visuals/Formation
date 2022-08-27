import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Button, Spacer } from '../../internal'

import { NavBack } from './NavBack'
import { SpaceIcon } from './SpaceIcon'

interface Props {
  title: string,
  src?: string,
  date?: Date,
  onBack: () => void,
  hideContext?: boolean
}

export const NavTop = ({ 
  title,
  src,
  date, 
  onBack,
  hideContext
} : Props) => {
  return (<S.Header>
    <S.Inner onClick={onBack}>
      <NavBack
        onClick={onBack}
      />
      <S.SpaceInfo hide={hideContext}>
        <SpaceIcon
          src={src}
          date={date}
          small={true}
        />
        <S.Title>
          {
            title
          }
        </S.Title>
      </S.SpaceInfo>
      
      <Spacer />
    </S.Inner>
  </S.Header>)
}

const S = {
  Header: styled.div`
    width: 100%;
    border-bottom: 2px solid var(--F_Surface);
  `,
  Inner: styled.div`
    position: relative;
    height: var(--F_Header_Height);
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 .5rem;
    justify-content: center;
  `,
  NavContainer: styled.div<{
    width: number
  }>`
    width: ${props => `${props.width}%`};
    height: 100%;
  `,
  SpaceInfo: styled.div<{
    hide?: boolean
  }>`
    visibility: ${props => props.hide ? 'hidden' : 'visible'};
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    padding-left: .5rem;
  `,
  Title: styled.div`
    font-size: var(--Font_Size);
    font-weight: 600;
    padding-left: .25rem;
  `
}
