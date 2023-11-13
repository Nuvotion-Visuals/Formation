import styled from 'styled-components'

import React from 'react'

import { Icon, Spacer, Button, Box } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon?: IconName,
  iconPrefix?: IconPrefix,
  title?: string,
  onClose?: () => void,
  solid?: boolean
}

/**
 * A taskbar component typically used within the `Modal` component. It displays an optional title, an optional icon, and a close button.
 *
 * @component
 * @param {Object} props - The props for the ModalTaskbar component.
 * @param {IconName} [props.icon] - The icon to display next to the title.
 * @param {IconPrefix} [props.iconPrefix] - The prefix for the icon to determine its style (e.g., 'fas', 'far').
 * @param {string} [props.title] - The title to display in the taskbar.
 * @param {function} [props.onClose] - The function to call when the close button is clicked.
 * @param {boolean} [props.solid=false] - When set to true, gives the taskbar a solid background.
 *
 * @example
 * return (
 *   <ModalTaskbar
 *     icon="user"
 *     iconPrefix="fas"
 *     title="User Profile"
 *     onClose={() => handleCloseModal()}
 *     solid={true}
 *   />
 * )
 */
export const ModalTaskbar = ({
  icon, 
  iconPrefix,
  title, 
  onClose,
  solid
} : Props) => {
  return (
    <S_ModalTaskbar solid={solid}>
      {
        title &&
          <S_Center>
            {
              icon !== undefined  
                ? <Icon icon={icon} iconPrefix={iconPrefix} />
                : <></>
            }
            
            <S_Text>{title}</S_Text>
          </S_Center>
      }
      <Spacer />
      <Box mr={-0.25}>
        {
          onClose &&
            <Button
              onClick={onClose} 
              title='Close'
              icon='times' 
              iconPrefix={iconPrefix || 'fas'}
              minimal
              square
            />
        }
      </Box>
    </S_ModalTaskbar>
  )
}

const S_ModalTaskbar = styled.div<{
  fullscreen?: boolean,
  solid?: boolean
}>`
  position: relative;
  display: flex;
  align-items: center;
  color: var(--F_Font_Color);
  overflow: hidden;
  width: 100%;
  height: var(--F_Input_Height_Compact);
  min-height: var(--F_Input_Height_Compact);
  background: ${props => props.solid ? 'var(--F_Surface_0)' : 'none'};
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
`