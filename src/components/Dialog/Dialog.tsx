import React, { useState, useEffect, useRef, createContext, useContext, ReactNode } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Gap, Button, TextInput, Box, Break, Fit } from '../../internal'

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
