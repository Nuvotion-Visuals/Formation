import React, { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

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
  value: string,
  autoFocus?: boolean,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  tooltip?: string
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
  autoFocus,
  icon,
  iconPrefix,
  tooltip,
  ...props
}: Props) => {

  const [textValue, setTextValue] = useState('')
  const [locked, setLocked] = useState(false)
  const [focused, setFocused] = useState(false)

  // const autoFocusRef = useCallback((el : any) => el && autoFocus ? el.focus() : null, [])

  return (<S.OutterContainer>
    <S.Container error={error} disabled={disabled} success={success}>
      <S.ErrorIconContainer>
        {
          success 
            ? <S.IconContainer error={false}>
                <Icon icon='check' iconPrefix='fas' fixedWidth/>
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
        {
          !error && !success && icon
            ? <Icon icon={icon} iconPrefix='fas' />
            : null
        }
      </S.ErrorIconContainer>

      <S.Input
        value={value}
        // ref={autoFocusRef}
        id={id}
        hasIcon={icon !== undefined} 
        type={type ? type : 'text'}
        locked={locked}
        focused={focused}
        onChange={event => {
          const newValue = (event.target as HTMLInputElement).value

          if (onChange) {
            onChange(newValue)
          }

          setTextValue(newValue)
          setLocked(newValue == '')
          if (focused === true) {
            setLocked(true)
          } else {
            setLocked(false)
          }
        }}
        autoComplete={'off'}
        onFocus={event => {
          setLocked(true)
          setFocused(true)
        }}
        onBlur={event => {
          setLocked(textValue == '' ? false : true)
          setFocused(false)
        }}
      />
      <S.Label 
        locked={locked} 
        focused={focused} 
        hasIcon={icon !== undefined} 
        shrink={value !== '' || focused}
      >
        {
          label
        }
      </S.Label>

        {
          tooltip
            ? <S.ErrorIconContainer title={tooltip}>
                <Icon icon={'info-circle'} iconPrefix='fas' />
              </S.ErrorIconContainer>
            : null
        }
    </S.Container>
    
    {
      error
        ? <S.ErrorContainer>
            <S.Error>{ error }</S.Error>
          </S.ErrorContainer>
        : null
    }
    </S.OutterContainer>
  )
}

interface InputProps {
  name?: string,
  label?: string,
  error?: string,
  disabled?: boolean,
  focused: boolean,
  type?: string,
  locked: boolean,
  hasIcon: boolean
  id?: string,
  pad?: boolean,
  onChange?: (e : any) => void
}

interface LabelProps {
  locked: boolean,
  hasIcon: boolean,
  focused: boolean,
  shrink: boolean
}

interface FloatingLabelProps {
  error?: string,
  disabled?: boolean,
  success?: boolean
}

interface IconContainerProps {
  error: boolean
}

const moveUp = keyframes`
  0% { 
    top: 0.6rem; 
    font-size: var(--Font_Size);
  }
  100% { 
    top: 0rem; 
    font-size: calc(var(--Font_Size) * .9);

  }
`

const S = {
  OutterContainer: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  `,
  Container: styled.div<FloatingLabelProps>`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    width: 100%;

    &:hover {
      box-shadow: ${props => 
        props.success 
          ? 'var(--Outline_Success)' 
          : props.error
            ? 'var(--Outline_Error)'
            : 'var(--Outline_Hover)'
      };
    }
    
    &:focus-within {
      box-shadow: ${props => 
        props.success 
          ? 'var(--Outline_Success)' 
          : props.error
            ? 'var(--Outline_Error)'
            : 'var(--Outline_Hover)'
      };
    };
    background: var(--Background_Alternating);
    box-shadow: ${props => 
      props.success 
        ? 'var(--Outline_Success)' 
        : props.error
          ? 'var(--Outline_Error)'
          : 'var(--Outline)'
    };
    border-radius: 16px;

  `,
  Input: styled.input<InputProps>`
    width: 100%;
    height: var(--Input_Height);
    position: relative;
    font-size: var(--Font_Size);
    border-radius: 0.5rem;
    vertical-align: center;
    border: none;
    padding-left: ${props => props.hasIcon ? '.5rem' : '0'};
    outline: none;
    -webkit-appearance: none;
    border-radius: 16px;
    color: var(--Font_Color);
    background: none;
  `,
  Label: styled.label<LabelProps>`
    position: absolute;
    top: 50%;
    line-height: 0;
    height: .5rem;
    left: ${props => props.hasIcon ? '2.5rem' : '1rem'};
    color: var(--Font_Color_Label);
    font-size: var(--Font_Size);
    
    pointer-events: none;
    background: var(--Background);
    animation: ${props => props.locked ? css`${moveUp} .15s forwards` : 'none'};
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
    margin-top: -.25rem;
    margin-left: 1rem;
    font-size: 13px;
  `,
  ErrorIconContainer: styled.div`
    position: relative;
  `,
  IconContainer: styled.div<IconContainerProps>`
    position: relative;
    * {
      color: ${props => props.error ? 'var(--Font_Color_Error)' : 'var(--Font_Color)'};
    }
  `
}
