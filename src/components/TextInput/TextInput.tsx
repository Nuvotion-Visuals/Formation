import React from 'react'
import styled from 'styled-components'

import { Icon } from '../Icon/Icon'

type Props = {
  name?: string,
  label?: string,
  error?: string,
  disabled?: boolean,
  success?: boolean,
  textarea?: boolean,
  type?: string,
  id?: string,
  onChange?: (value: string) => void,
  value: string
}

export const TextInput = ({ 
  label, 
  error, 
  success, 
  disabled, 
  textarea, 
  type, 
  onChange,
  id,
  value,
  ...props
}: Props) => {
  return (
    <S.Container>
      <S.FloatingLabel 
        error={error} 
        success={success}
        disabled={disabled}
      >
        {label}
      </S.FloatingLabel>

      <S.ErrorIconContainer>
        {
          success 
            ? <S.IconContainer error={false}>
                <Icon icon='check' iconPrefix='fas'/>
              </S.IconContainer> 
            : null
        }
        {
          error 
            ? <S.IconContainer error={true}>
                <Icon icon='exclamation-triangle' iconPrefix='fas'/>
              </S.IconContainer> 
            : null
        }
      </S.ErrorIconContainer>

      <S.Input {...props} 
        type={'text'}
        placeholder={label} 
        error={error}
        disabled={disabled}
        component={textarea ? 'textarea' : 'input'}
        pad={!!error || !!success}
        id={id}
        value={value}
        onChange={(e) => {
          if (onChange) {
            onChange((e.target as HTMLInputElement).value)
          }
        }}
      />
      
      {
        error
          ? <S.ErrorContainer>
              <S.Error>{ error }</S.Error>
            </S.ErrorContainer>
          : null
      }
      
      
    </S.Container>
  )
}

interface InputProps {
  name?: string,
  label?: string,
  error?: string,
  disabled?: boolean,
  success?: boolean,
  textarea?: boolean,
  component: string,
  type?: string,
  id?: string,
  pad?: boolean,
  onChange?: (e : any) => void
}

interface FloatingLabelProps {
  error?: string,
  disabled?: boolean,
  success?: boolean
}

interface IconContainerProps {
  error: boolean
}

const S = {
  Container: styled.div`
    position: relative;
    margin-bottom: 1rem;
    &:focus-within {
      input {
        color: white;
      }
    }
  `,
  Input: styled.input<InputProps>`
    display: flex;
    flex-grow: 1;
    background: var(--Background_Alternating);
    font-size: var(--Font_Size_Title);
    color: ${props => props.disabled ? 'var(--Font_Color_Disabled)' : 'var(--Font_Color)'};
    width: ${props => props.pad ? 'calc(100% - 72px)' : 'calc(100% - 32px)'};
    border-radius: 8px;
    resize: vertical;
    border: none;
    padding: .75rem 1rem;
    padding-left: ${props => props.pad ? '52px' : '16px'};
    position: relative;
    box-shadow: ${props => props.error 
      ? 'var(--Outline_Error)' 
      : props.disabled
        ? 'var(--Outline_Disabled)'
        : props.success 
          ? 'var(--Outline_Success)'
          : 'var(--Outline)'
    };
    &:hover, &:focus {
      box-shadow: ${props => props.error 
        ? 'var(--Outline_Error)' 
        : props.disabled
          ? 'var(--Outline_Disabled)'
          : props.success 
            ? 'var(--Outline_Success)'
            : 'var(--Outline_Hover)'
      };

    }
    cursor: ${props => props.disabled ? 'not-allowed' : 'text'};
  `,
  FloatingLabel: styled.div<FloatingLabelProps>`
    display: flex;
    font-size: var(--Font_Size);
    line-height: 1;
    pointer-events: none;
    letter-spacing: var(--Letter_Spacing_Header);
    left: 1rem;
    transition: 0.2s ease all;
    z-index: 1;
    margin-left: .5rem;
    padding-bottom: 8px;
    color: ${props => props.error 
      ? 'var(--Font_Color_Error)' 
      : props.disabled
        ? 'var(--Font_Color_Disabled)'
        : props.success
          ? 'var(--Font_Color_Success)'
          : 'var(--Font_Color_Label)'
    };
    
  `,
  ErrorContainer: styled.div`
    width: 100%;
    margin-top: .5rem;

    color: var(--Font_Color_Error);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /* line-height: 1; */
  `,
  Error: styled.div`
    margin-left: .5rem;
    font-size: 14px;
  `,
  ErrorIconContainer: styled.div`
    position: relative;
  `,
  IconContainer: styled.div<IconContainerProps>`
    position: relative;

    * {
      position: absolute;
      height: 36px;
      width: 36px;
      top: 4px;
      left: 12px;
      z-index: 1;
      font-size: 24px;
      color: ${props => props.error ? 'var(--Font_Color_Error)' : 'var(--Font_Color_Success)'};
    }
  `
}
