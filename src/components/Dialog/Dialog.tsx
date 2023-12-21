import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Gap, Button, TextInput, Break, Fit } from '../../internal'

import { dialogController } from './DialogController'

interface DialogConfig {
  mode: 'alert' | 'confirm' | 'prompt'
  message: string
  callback?: (value: boolean | string | null) => void
  placeholder?: string
}

interface DialogContextType {
  isOpen: boolean
  config?: DialogConfig
  openDialog: (config: DialogConfig) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType>({
  isOpen: false,
  openDialog: () => {},
  closeDialog: () => {},
})

export const useDialog = () => useContext(DialogContext)

interface DialogProviderProps {
  children: React.ReactNode
}

/**
 * `Dialog` is a customizable dialog component for creating alert, confirm, and prompt dialogs.
 * It provides an interactive way to display information and collect user input in a web application.
 * This component supports three modes: 'alert' for simple messages, 'confirm' for yes/no decisions,
 * and 'prompt' for user input. The dialog appears with an animation and can be configured with a
 * message, placeholder text for prompts, and a callback function to handle user responses.
 * 
 * The dialog also features an outside click detection to provide a shaking effect, enhancing the
 * user experience by drawing attention to the dialog when users click outside of it.
 *
 * @component
 * @param {function} useDialog - Custom hook to manage dialog state and configuration.
 * @param {function} useState - React useState hook for managing internal state.
 * @param {function} useEffect - React useEffect hook for handling side effects.
 * @param {function} useRef - React useRef hook for referencing DOM elements.
 * 
 * @example
 * // To create and use a confirm dialog with a custom message and callback function
 * const { showDialog, hideDialog } = useDialog();
 * showDialog({
 *   mode: 'confirm',
 *   message: 'Are you sure?',
 *   callback: (response) => console.log(`User response: ${response}`)
 * });
 *
 * @example
 * // To create and use a prompt dialog for user input
 * const { showDialog } = useDialog();
 * showDialog({
 *   mode: 'prompt',
 *   message: 'Enter your name:',
 *   placeholder: 'Name',
 *   callback: (input) => console.log(`User input: ${input}`)
 * });
 */
export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [dialogState, setDialogState] = useState<DialogContextType>({
    isOpen: false,
    openDialog: (config) => {
      setDialogState(prevState => ({ ...prevState, isOpen: true, config }))
    },
    closeDialog: () => {
      setDialogState(prevState => ({ ...prevState, isOpen: false, config: undefined }))
    }
  })

  // Set the actual functions in the DialogController
  dialogController.setOpenDialogFunction(dialogState.openDialog)
  dialogController.setCloseDialogFunction(dialogState.closeDialog)

  return (
    <DialogContext.Provider value={dialogState}>
      {children}
    </DialogContext.Provider>
  )
}

export const Dialog = () => {
  const { isOpen, config, closeDialog } = useDialog()
  const [inputValue, setInputValue] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const [shouldShake, setShouldShake] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setShouldShake(true)
        setTimeout(() => setShouldShake(false), 500)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleClose = (value: boolean | string | null) => {
    closeDialog()
    if (config && config.callback) {
      config.callback(value)
    }
  }

  useEffect(() => {
    const blurFocusableElements = () => {
      const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      focusableElements.forEach((element: any) => {
        if (typeof element.blur === 'function') {
          element.blur()
        }
      })
    }

    if (isOpen && config?.mode !== 'prompt') {
      blurFocusableElements()
    }
  }, [isOpen, config])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isOpen && config?.mode !== 'prompt') {
        event.preventDefault()
        switch (config?.mode) {
          case 'confirm':
            handleClose(true)
            break
          case 'alert':
            handleClose(null)
            break
          default:
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, config, handleClose])

  const renderButtons = () => {
    switch (config?.mode) {
      case 'alert':
        return <Button onClick={() => handleClose(null)} primary expand>OK</Button>
      case 'confirm':
        return (
          <>
            <Button onClick={() => handleClose(true)} primary>Yes</Button>
            <Button onClick={() => handleClose(false)}>No</Button>
          </>
        )
      case 'prompt':
        return (
          <>
            <Button onClick={() => handleClose(inputValue)} primary expand>OK</Button>
            <Button onClick={() => handleClose(null)} expand>Cancel</Button>
          </>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    setInputValue('')
  }, [isOpen])

  return (
    <S.DialogContainer show={isOpen}>
      <S.Dialog ref={dialogRef} id='F_Dialog' show={isOpen} shake={shouldShake}>
        <S.DialogContent>
          <Gap gap={0.5} autoWidth center>
            <S.Message>{config?.message}</S.Message>
            <Break />
            {
              config?.mode === 'prompt' && (
                <>
                  <TextInput 
                    value={inputValue} 
                    onChange={val => setInputValue(val)} 
                    placeholder={config.placeholder}
                    autoFocus
                    onEnter={() => handleClose(inputValue)}
                  />
                  <Break />
                </>
              )
            }
            <Fit gap={0.5}>
              {renderButtons()}
            </Fit>
          </Gap>
        </S.DialogContent>
      </S.Dialog>
    </S.DialogContainer>
  )
}

const slideDown = keyframes`
  from {
    transform: translateY(-100%)
  }
  to {
    transform: translateY(0)
  }
`

const shake = keyframes`
  0% { transform: translateX(0) }
  20% { transform: translateX(-10px) }
  40% { transform: translateX(10px) }
  60% { transform: translateX(-10px) }
  80% { transform: translateX(10px) }
  100% { transform: translateX(0) }
`

const S = {
  DialogContainer: styled.div<{
    show?: boolean
  }>`
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: center;
    background: var(--F_Backdrop_Light);
    align-items: flex-start;
  `,
  Dialog: styled.div<{
    show?: boolean, shake?: boolean
  }>`
    box-shadow: var(--F_Outline_Outset);
    background: var(--F_Background);
    border-radius: .5rem;
    max-width: 90vw;
    animation: ${props => props.show ? css`${slideDown} 0.125s ease-out` : 'none'},
               ${props => props.shake ? css`${shake} 0.5s ease` : 'none'};
    margin-top: 2rem;
    width: 400px;
  `,
  DialogContent: styled.div`
    padding: 1rem;
  `,
  Message: styled.div`
    width: auto;
    color: var(--F_Font_Color);
    font-size: var(--F_Font_Size);
    line-height: 1.5;
    user-select: none;
  `
}
