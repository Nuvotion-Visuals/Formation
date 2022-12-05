import styled from 'styled-components'

import React from 'react'

import { Icon, Spacer, Button } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon: IconName,
  iconPrefix: IconPrefix,
  title: string,
  closeModal: () => void,
  fullscreen?: boolean,
  back?: boolean
}

export const ModalTaskbar = ({
  icon, 
  iconPrefix,
  title, 
  closeModal,
  fullscreen,
  back
} : Props) => {
  return (
    <S_ModalTaskbar fullscreen={fullscreen}>
      {
        back &&
          <Button
            onClick={closeModal} 
            title='Close'
            icon='chevron-left' 
            iconPrefix={iconPrefix}
          />
      }
      <S_Center>
        <Icon icon={icon} iconPrefix={iconPrefix}/>
        <S_Text>{title}</S_Text>
      </S_Center>
      <Spacer />
      {
        !back &&
          <Button
            onClick={closeModal} 
            title='Close'
            icon='times' 
            iconPrefix={iconPrefix}
          />
      }
    </S_ModalTaskbar>
  )
}

const S_ModalTaskbar = styled.div<{
  fullscreen?: boolean
}>`
  position: relative;
  display: flex;
  align-items: center;
  color: var(--F_Font_Color);
  overflow: hidden;
  width: ${props => props.fullscreen ? 'calc(100% - 1.5rem)' : 'calc(100% - 1rem)'};
  padding: ${props => props.fullscreen ? '.75rem' : '.5rem'};
`

const S_Center = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  pointer-events: none;
`

const S_Text = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: var(--F_Font_Size_Title);
  font-weight: 600;
  line-height: 1em;
  
`