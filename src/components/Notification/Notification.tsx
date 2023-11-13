import React from 'react'
import styled, { keyframes, css } from 'styled-components'

import { IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon } from '../../internal'

interface Props {
  children: React.ReactNode,
  type: 'success' | 'error' | 'warning' | 'info',
  disableAnimation?: boolean,
  iconPrefix: IconPrefix
}

/**
 * A notification component that displays a message with an icon, typically used for conveying different types of messages (e.g., success, error, warning, info).
 *
 * @component
 * @param {Object} props - The props for the Notification component.
 * @param {string} props.type - The type of notification ('success', 'error', 'warning', or 'info').
 * @param {React.ReactNode} props.children - The content of the notification, which can include text or other React elements.
 * @param {boolean} [props.disableAnimation] - A flag to disable the notification animation.
 * @param {IconPrefix} props.iconPrefix - The icon prefix (e.g., 'fas', 'far', 'fab') for Font Awesome icons.
 *
 * @returns {JSX.Element} The rendered Notification component.
 *
 * @example
 * // Example 1: Success Notification
 * <Notification type="success" iconPrefix="fas">
 *   Your changes have been saved successfully.
 * </Notification>
 *
 * @example
 * // Example 2: Error Notification
 * <Notification type="error" iconPrefix="fas">
 *   An error occurred while processing your request.
 * </Notification>
 *
 * @example
 * // Example 3: Warning Notification
 * <Notification type="warning" iconPrefix="fas">
 *   Please review the information before submitting.
 * </Notification>
 *
 * @example
 * // Example 4: Info Notification
 * <Notification type="info" iconPrefix="fas">
 *   This is an informational message for the user.
 * </Notification>
 */

export const Notification = ({
  type,
  children,
  disableAnimation,
  iconPrefix
}: Props) => {

  const getIcon = () => {
    switch(type) {
      case 'success':
        return 'check'
      case 'error':
        return 'times'
      case 'warning':
        return 'exclamation-triangle'
      case 'info':
        return 'info-circle'
    }
  }

  return (
    <S.Notification type={type} disableAnimation={disableAnimation}>
      <S.IconContainer>
        <Icon icon={getIcon()} iconPrefix={iconPrefix} size='lg' />
      </S.IconContainer>
      <S.Content>
        { 
          children 
        }
      </S.Content>
    </S.Notification>
  )
}

interface NotificationProps {
  disableAnimation?: boolean,
  type?: string
}

const S = {
  Notification: styled.div<NotificationProps>`
    position: relative;
    top: 0;
    animation: ${props => props.disableAnimation ? 'none' : css`${grow} 1.2s linear`};
    transform-origin: top;
    /* height: 0;
    overflow: hidden; */
    width: 100%;
    display: flex;
    border-radius: .125rem;
    align-items: center;
    background: ${({ type }) => {
      switch(type) {
        case 'success':
          return 'var(--F_Label_Color_Green)'
        case 'error':
          return 'var(--F_Label_Color_Red)'
        case 'warning':
          return 'var(--F_Label_Color_Orange)'
        case 'info':
          return 'var(--F_Label_Color_Gray)'
      }
    }};
  `,
  IconContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: .5rem;
    width: var(--F_Input_Height);
    min-height: var(--F_Input_Height);
    height: 100%;
    * {
      color: white;
    }
  `,
  Content: styled.div`
    width: calc(100% - var(--F_Input_Height));
    display: flex;
    align-items: center;
    padding: .75rem .25rem;
    padding-right: 1rem;
    line-height: 1.5;
    color: white;
  
  `
}

const grow = keyframes`
  0% {
    max-height: 0;
    overflow: hidden;
  }
  100% {
    max-height: 500px;
    overflow: visible;
  }
`
