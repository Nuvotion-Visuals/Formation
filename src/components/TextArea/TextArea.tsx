import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'

// @ts-ignore
interface TextAreaProps extends React.ComponentPropsWithoutRef<'textarea'> {
  value: string
  onChange: (value: string) => void
}

export const TextArea: FC<TextAreaProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      const currentScrollHeight = textarea.scrollHeight
      if (currentScrollHeight > textarea.clientHeight) {
        textarea.style.height = `${currentScrollHeight + 3}px`
      }
    }
  }, [value])

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <S.TextArea
      ref={textareaRef}
      value={value}
      onChange={handleTextChange}
      {...rest}
    />
  )
}

export const S = {
  TextArea: styled.textarea`
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color);
    border-radius: 0.75rem;
    box-shadow: var(--F_Outline);
    padding: .5rem 0.75rem;
    width: 100%;
    height: var(--F_Input_Height);
    border: none;
    outline: none;
    overflow-y: auto;
    overflow-x: hidden;
    background: none;
    box-sizing: border-box;
    resize: vertical;
    &:hover {
      box-shadow: var(--F_Outline_Hover);
    }
    &:active, &:focus {
      box-shadow: var(--F_Outline_Focus);
    }
  `
}
