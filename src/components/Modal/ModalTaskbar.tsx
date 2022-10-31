import styled from 'styled-components'

import React from 'react'

import { Icon, Spacer } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon: IconName,
  iconPrefix: IconPrefix,
  title: string,
  closeModal: () => void
}

export const ModalTaskbar = ({
  icon, 
  iconPrefix,
  title, 
  closeModal
} : Props) => {
  return (
    <S_ModalTaskbar>
      <S_Center>
        <Icon icon={icon} iconPrefix={iconPrefix}/>
        <S_Text>{title}</S_Text>
      </S_Center>
      <Spacer />
      <S_CloseContainer onClick={closeModal} title='Close'>
        <Icon icon='times' iconPrefix={iconPrefix}/>
      </S_CloseContainer>
    </S_ModalTaskbar>
  )
}

const S_ModalTaskbar = styled.div`
  display: flex;
  align-items: center;
  color: var(--F_Font_Color);
  width: calc(100% - 1.5rem);
  overflow: hidden;
  padding: .75rem;
`


const S_CloseContainer = styled.div`
  height: var(--F_Input_Height);
  width: var(--F_Input_Height);
  min-width: var(--F_Input_Height);
  border-radius: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: var(--F_Surface);
  
  &:hover {
    background: var(--F_Surface_1);
  }
`

const S_Center = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  margin-bottom: -.125rem;
`

const S_Text = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: var(--F_Font_Size_Title);
  font-weight: 600;

`