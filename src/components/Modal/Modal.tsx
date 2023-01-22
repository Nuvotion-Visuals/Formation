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
  onClose?: () => void,
  onBack?: () => void,
  back?: boolean,
  footerContent?: React.ReactNode,
  stepsContent?: React.ReactNode
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
  onBack,
  footerContent,
  stepsContent
}: Props) => {

  const sizes = {
    'sm': 400,
    'md': 500,
    'lg': 900,
    'tall': 1100,
    'xl': 1100
  }

  const hasSteps = stepsContent !== undefined

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
          onClose={onClose}
          onBack={onBack}
        />

        <S.Content 
          fullscreen={fullscreen}
          footer={footerContent !== undefined}
          hasSteps={hasSteps}
        >
          <S.ModalContent >
            {
              content
            }
          </S.ModalContent>
        </S.Content>

        {
          footerContent && 
            <S.Footer fullscreen={fullscreen} hasSteps={hasSteps}>
              {
                stepsContent
              }
              <S.FooterContent>
                {
                  footerContent
                }
              </S.FooterContent>
            </S.Footer>
        }
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
    background: var(--F_Backdrop_Light);
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
    min-height: ${props => props.size === 'tall' ? 'calc(95vh * var(--F_Zoom))' : 'none'};
    width: ${props => 
      props.fullscreen 
        ? '100%'
        : `calc(${props.width + 'px'} * var(--F_Zoom))`
    };
    height: ${props => 
      props.fullscreen 
        ? '100%'
        : 'calc(500px * var(--F_Zoom))'
    };

    max-width: ${props => props.fullscreen ? '100%' : 'calc(90vw * var(--F_Zoom))'};
    max-height: ${props => props.fullscreen ? '100%' : 'calc(95vh * var(--F_Zoom))'};
  `,
  Content: styled.div<{
    fullscreen?: boolean,
    footer?: boolean,
    hasSteps?: boolean
  }>`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    height: ${props => 
      props.footer 
        ? props.fullscreen
          ?` calc(100% - calc(calc(var(--F_Header_Height) * 2) + ${props.hasSteps ? '2.325' : '2'}rem))`
          : `calc(100% - calc(calc(var(--F_Header_Height) * 2) + ${props.hasSteps ? '2.5' : '2'}rem))`
        : '100%'};
    padding: .75rem;
    padding-top: 0;
    overflow-y: auto;
  `,
  FooterContent: styled.div<{
    fullscreen?: boolean,
    hasSteps?: boolean
  }>`
    display: flex;
    width: 100%;
    align-items: flex-start;
  `,
  Footer: styled.div<{
    fullscreen?: boolean,
    hasSteps?: boolean
  }>`
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 1.5rem);
    padding: .75rem;
    padding-top: ${props => props.hasSteps ? '0' : '.75rem'};
    gap: .75rem;
    align-items: flex-start;
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