import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Button, Spacer } from '../../internal'

import { NavIcon } from './NavIcon'

interface Props {
  title: string,
  onBack: () => void
}

export const NavTop = ({ title, onBack } : Props) => {
  return (<S.Header>
    <S.Inner>
      <Button
        icon='chevron-left'
        iconPrefix='fas'
        secondary={true}
        onClick={onBack}
      />
      <Spacer />
      <S.Center>
        <S.Title>
          {
            title
          }
        </S.Title>
      </S.Center>
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
    padding: 0 .5rem;
    justify-content: center;
  `,
  NavContainer: styled.div<{
    width: number
  }>`
    width: ${props => `${props.width}%`};
  `,
  Center: styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  Title: styled.div`
    font-size: var(--Font_Size);
    font-weight: 600;
  `
}
