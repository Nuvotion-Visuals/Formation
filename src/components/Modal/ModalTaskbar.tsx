import styled from 'styled-components'

import React from 'react'

import { Icon, Spacer, Button } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon?: IconName,
  iconPrefix?: IconPrefix,
  title: string,
  onClose?: () => void,
  onBack?: () => void,
}

export const ModalTaskbar = ({
  icon, 
  iconPrefix,
  title, 
  onClose,
  onBack,
} : Props) => {
  return (
    <S_ModalTaskbar>
      {
        onBack &&
          <Button
            onClick={onBack} 
            title='Back'
            icon='chevron-left' 
            iconPrefix={iconPrefix}
          />
      }
      <S_Center>
        {
          icon !== undefined  
            ? <Icon icon={icon} iconPrefix={iconPrefix} />
            : <></>
        }
        
        <S_Text>{title}</S_Text>
      </S_Center>
      <Spacer />
      {
        onClose &&
          <Button
            onClick={onClose} 
            title='Close'
            icon='times' 
            iconPrefix={iconPrefix}
            square
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
  width: calc(100% - 1rem);
  padding: .5rem;
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