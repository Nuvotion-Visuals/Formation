import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { ModalTaskbar } from './ModalTaskbar'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  title?: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  content: React.ReactNode,
  fullscreen?: boolean,
  isOpen: boolean,
  onClose?: () => void,
  back?: boolean,
  solid?: boolean
}

/**
 * A modal component that displays content in an overlay that covers the entire screen or part of it.
 * It includes a modal taskbar that can have a title, icon, and a close function.
 *
 * @component
 * @param {Object} props - The props for the Modal component.
 * @param {string} [props.title] - The title to display in the modal taskbar.
 * @param {IconName} [props.icon] - The icon to display next to the title in the modal taskbar.
 * @param {IconPrefix} [props.iconPrefix] - The prefix for the icon to determine its style (e.g., 'fas', 'far').
 * @param {React.ReactNode} props.content - The content to be rendered inside the modal.
 * @param {boolean} [props.fullscreen=false] - Determines if the modal should be fullscreen or not.
 * @param {boolean} props.isOpen - Controls whether the modal is open or closed.
 * @param {function} [props.onClose] - The function to call when the modal is requested to be closed, e.g., when the overlay is clicked.
 * @param {boolean} [props.solid=false] - When set to true, gives the modal content a solid background.
 *
 * @example
 * return (
 *   <Modal
 *     title="My Modal"
 *     icon="user"
 *     iconPrefix="fas"
 *     content={<div>Modal Content</div>}
 *     fullscreen={true}
 *     isOpen={modalIsOpen}
 *     onClose={() => setModalIsOpen(false)}
 *   />
 * )
 */
export const Modal = ({ 
  title,
  icon,
  iconPrefix,
  content,
  fullscreen,
  isOpen,
  onClose,
  solid
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <S.ModalContainer show={isOpen}>
      <S.Modal 
        ref={modalRef}
        fullscreen={fullscreen}
        id='F_Modal'
      >
        <ModalTaskbar 
          title={title} 
          icon={icon} 
          iconPrefix={iconPrefix}
          onClose={onClose}
          solid={solid}
        />

        <S.Content 
          fullscreen={fullscreen}
          solid={solid}
        >
          <S.ModalContent>
            {content}
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
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${props => props.show ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    background: var(--F_Backdrop_Light);
  `,
  Modal: styled.div<{
    fullscreen?: boolean
  }>`
    box-shadow: ${props => props.fullscreen ? 'none' : 'var(--F_Outline_Outset)'};
    background: var(--F_Background);
    overflow: hidden;
    border-radius: ${props => props.fullscreen ? '0' : '.5rem'};
    width: ${props => props.fullscreen ? '100%' : 'auto'};
    height: ${props => props.fullscreen ? '100vh' : 'auto'};
    max-width: ${props => props.fullscreen ? '100%' : '90vw'};
    max-height: ${props => props.fullscreen ? '100%' : '95vh'};
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  `,
  Content: styled.div<{
    fullscreen?: boolean,
    footer?: boolean,
    hasSteps?: boolean,
    solid?: boolean,
  }>`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
    padding: .5rem;
    padding-top: ${props => props.solid ? '.5rem' : '0'};
  `,
  ModalContent: styled.div`
    color: var(--F_Font_Color);
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
  `
}
