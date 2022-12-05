import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React from 'react'
import styled from 'styled-components'

import { ModalTaskbar } from './ModalTaskbar'

interface Props {
  title: string,
  icon: IconName,
  iconPrefix: IconPrefix,
  content: React.ReactNode,
  size: 'sm' | 'md' | 'lg' | 'tall' | 'xl',
  fullscreen?: boolean,
  isOpen: boolean,
  onClose: () => void,
  back?: boolean
}

export const Modal = ({ 
  title,
  icon,
  iconPrefix,
  content,
  size,
  fullscreen,
  isOpen,
  onClose,
  back
}: Props) => {

  const sizes = {
    'sm': 400,
    'md': 500,
    'lg': 900,
    'tall': 1100,
    'xl': 1100
  }

  return (
    <S.ModalContainer show={isOpen}>
      <S.Modal 
        width={sizes[size]} 
        size={size} 
        fullscreen={fullscreen}
        id='F_Modal'
      >
        <ModalTaskbar 
          title={title} 
          icon={icon} 
          iconPrefix={iconPrefix}
          closeModal={onClose}
          fullscreen={fullscreen}
          back={back}
        />
        <S.Content 
          fullscreen={fullscreen}
        >
          <S.ModalContent>
            {
              content
            }
          </S.ModalContent>
        </S.Content>
      </S.Modal>
    </S.ModalContainer>
  )
}

const S = {
  ModalContainer: styled.div<{
    show: boolean
  }>`
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    backdrop-filter: var(--F_Blur);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(0, 0, 0, .16);
    display: ${props => props.show ? 'flex' : 'none'};
  `,
  Modal: styled.div<{
    width: number,
    size: string,
    fullscreen?: boolean
  }>`
    box-shadow: ${props => props.fullscreen ? 'none' : 'var(--F_Outline_Outset)'};
    background: var(--F_Background);
    overflow: hidden;
    border-radius: ${props => props.fullscreen ? '0' : '.5rem'};
    width: ${props => props.width + 'px'};
    min-height: ${props => props.size === 'tall' ? '95vh' : 'none'};
    width: ${props => 
      props.fullscreen 
        ? '100%'
        : props.width + 'px'
    };
    height: ${props => 
      props.fullscreen 
        ? '100%'
        : 'auto'
    };
    max-width: ${props => props.fullscreen ? '100%' : '90vw'};
    max-height: ${props => props.fullscreen ? '100%' : '95vh'};
  `,
  Content: styled.div<{
    fullscreen?: boolean
  }>`
    display: flex;
    height: 100%;
    width: ${props => props.fullscreen ? 'calc(100% - 1.5rem)' : 'calc(100% - 1rem)'};
    padding: ${props => props.fullscreen ? '.75rem' : '.5rem'};
    padding-top: 0;
    overflow-y: auto;
  `,
  ModalContent: styled.div`
    color: var(--F_Font_Color);
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `
}