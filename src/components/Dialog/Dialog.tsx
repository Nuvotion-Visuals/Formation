import React, { useState, useEffect, useRef, createContext, useContext, ReactNode } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Gap, Button, TextInput, Box, Break, Fit } from '../../internal'

interface DialogContextType {
  isOpen: boolean
  mode: 'alert' | 'confirm' | 'prompt' | null
  message: string
  openDialog: (mode: 'alert' | 'confirm' | 'prompt', message: string, callback?: (value: boolean | string | null) => void) => void
  closeDialog: () => void
  callback?: (value: boolean | string | null) => void
}

const DialogContext = createContext<DialogContextType>({
  isOpen: false,
  mode: null,
  message: '',
  openDialog: () => {},
  closeDialog: () => {},
  callback: undefined
})

export const useDialog = () => useContext(DialogContext)

interface DialogProviderProps {
  children: ReactNode
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [dialogState, setDialogState] = useState<DialogContextType>({
    isOpen: false,
    mode: null,
    message: '',
    openDialog: (mode, message, cb) => {
      setDialogState(prevState => ({ ...prevState, isOpen: true, mode, message, callback: cb }))
    },
    closeDialog: () => {
      setDialogState(prevState => ({ ...prevState, isOpen: false, callback: undefined }))
    },
    callback: undefined
  })

  return (
    <DialogContext.Provider value={dialogState}>
      {children}
    </DialogContext.Provider>
  )
}

export const Dialog = () => {
  const { isOpen, mode, message, closeDialog, callback } = useDialog()
  const [inputValue, setInputValue] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleClose = (value: boolean | string | null) => {
    closeDialog()
    if (callback) callback(value)
  }

  const renderButtons = () => {
    switch (mode) {
      case 'alert':
        return <Button onClick={() => handleClose(null)} primary expand>OK</Button>
      case 'confirm':
        return <>
          <Button onClick={() => handleClose(true)} primary>Yes</Button>
          <Button onClick={() => handleClose(false)}>No</Button>
        </>
        
      case 'prompt':
        return <>
          <Button onClick={() => handleClose(inputValue)} primary expand>OK</Button>
          <Button onClick={() => handleClose(null)} expand>Cancel</Button>
        </>
    }
  }

  useEffect(() => {
    setInputValue('')
  }, [isOpen])

  return (
    <S.DialogContainer show={isOpen}>
      <S.Dialog ref={dialogRef} id='F_Dialog' show={isOpen}>
        <S.DialogContent>
          <Gap gap={0.5} autoWidth center>
            <S.Message>{message}</S.Message>
            <Break />
            {
              mode === 'prompt' && (
                <>
                  <TextInput 
                    value={inputValue} 
                    onChange={val => setInputValue(val)} 
                    autoFocus
                  />
                  <Break />
                </>
              )
            }
            <Fit gap={0.5}>
              { renderButtons() }
            </Fit>
          </Gap>
        </S.DialogContent>
      </S.Dialog>
    </S.DialogContainer>
  )
}

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
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
    show?: boolean
  }>`
    box-shadow: var(--F_Outline_Outset);
    background: var(--F_Background);
    border-radius: .5rem;
    max-width: 90vw;
    animation: ${props => props.show ? css`${slideDown} 0.125s ease-out` : 'none'};
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
  `
}
