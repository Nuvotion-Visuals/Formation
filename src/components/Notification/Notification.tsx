import React from 'react'
import styled, { keyframes, css } from 'styled-components'

import { IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon } from '../Icon/Icon'

interface Props {
  children: React.ReactNode,
  type: 'success' | 'error' | 'warning' | 'info',
  disableAnimation?: boolean,
  iconPrefix: IconPrefix
}

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
          return 'var(--Font_Color_Success)'
        case 'error':
          return 'var(--Font_Color_Error)'
        case 'warning':
          return 'var(--Font_Color_Warning)'
        case 'info':
          return 'var(--Surface)'
      }
    }};
  `,
  IconContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: .5rem;
    width: var(--Input_Height);
    min-height: var(--Input_Height);
    height: 100%;
  `,
  Content: styled.div`
    width: calc(100% - var(--Input_Height));
    display: flex;
    align-items: center;
    padding: .75rem .5rem;
    padding-right: 1rem;
    line-height: 1.5;
    color: var(--Font_Color);
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
