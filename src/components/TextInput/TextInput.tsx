import React, { useCallback, useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon, Box } from '../../internal'
import { ColorType } from '../../types'
import { LabelColor } from '../LabelColorPicker/LabelColor'

type Props = {
  name?: string,
  label?: string,
  error?: string,
  disabled?: boolean,
  compact?: boolean,
  success?: boolean,
  type?: string,
  id?: string,
  onChange?: (value: string) => void,
  value: string,
  autoFocus?: boolean,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  hint?: string,
  onClick?: () => void,
  preventFocus?: boolean,
  onBlur?: () => void,
  ref?: any,
  labelColor?: ColorType,
  onEnter?: () => void,
  onChangeEvent?: (e: any) => void,
  placeholder?: string,
  forceFocus?: boolean,
}

export const TextInput = ({ 
  label, 
  error, 
  success, 
  disabled, 
  compact,
  type, 
  onChange,
  id,
  value,
  autoFocus,
  icon,
  iconPrefix,
  hint,
  onClick,
  preventFocus,
  onBlur,
  ref,
  labelColor,
  onEnter,
  name,
  onChangeEvent,
  placeholder,
  forceFocus
}: Props) => {
  // @ts-ignore
  const autoFocusRef = useCallback(el => el && autoFocus ? el.focus() : null, [])

  const [locked, setLocked] = useState(!!value)
  const [focused, setFocused] = useState(!!value)

  useEffect(() => {
    if (value) {
      setLocked(false)
      setFocused(false)
    }
  }, [value])

  return (<S.OutterContainer onClick={() => {
    if (onClick) {
      onClick()
    }
  }}>
    <S.Container 
      error={error} 
      disabled={disabled} 
      success={success}
      compact={compact}
      forceFocus={forceFocus}
    >
      <S.ErrorIconContainer>
        
        {
          labelColor
            ? <S.IconContainer 
                error={false}
              >
                <Box ml={-.125}>
                  <LabelColor
                    color={labelColor}
                    ref={null}
                    onClick={() => {}}
                  />
                </Box>
                </S.IconContainer> 
            : null
        }
    
        {
          icon
            ? <Icon 
                icon={icon} 
                iconPrefix={iconPrefix}
              />
            : null
        }
      </S.ErrorIconContainer>

      <S.Input
        shrink={value !== '' || focused}
        disableAnimation={value !== '' && !focused}
        name={name}
        value={value}
        compact={compact}
        preventFocus={preventFocus}
        placeholder={placeholder}
        onKeyDown={onEnter 
          ? e => {
              if (e.key === 'Enter') {
                onEnter()
              }
            }
          : undefined
        }
        ref={autoFocusRef}
        id={id}
        hasIcon={icon !== undefined || labelColor !== undefined} 
        hasLabel={label !== undefined && !compact}
        type={type ? type : 'text'}
        locked={locked}
        focused={focused}
        onChange={event => {
          if (onChangeEvent) {
            onChangeEvent(event)
          }
          const newValue = (event.target as HTMLInputElement).value
          if (newValue !== undefined && onChange) {
            onChange(newValue)
          }
          setLocked(newValue == '')
          if (focused === true) {
            setLocked(true)
          } else {
            setLocked(false)
          }
        }}
        onFocus={() => {
          setLocked(true)
          setFocused(true)
        }}
        onBlur={() => {
          setLocked(value == '' ? false : true)
          setFocused(false)
          if (onBlur) {
            onBlur()
          }
        }}
      />
      <S.Label 
        locked={locked} 
        focused={focused} 
        hasIcon={icon !== undefined || labelColor !== undefined} 
        shrink={value !== '' || focused}
        disableAnimation={value !== '' && !focused}
        hide={label === undefined || compact}
      >
        {
          label
        }
      </S.Label>
    </S.Container>
    
    {
      error || hint
        ? <S.MessageContainer isHint={!!hint} hasIcon={!!icon}>
            <S.Message>
              { error ? error : hint }
            </S.Message>
          </S.MessageContainer>
        : null
    }
    </S.OutterContainer>
  )
}

const moveUp = keyframes`
  0% { 
    top: 1.5rem; 
    font-size: var(--F_Font_Size_Large);

  }
  100% { 
    top: 1rem; 
    font-size: var(--F_Font_Size);
  }
`

const moveDown = keyframes`
  0% { 
    bottom: -.2rem; 
  }
  100% { 
    bottom: -.6rem; 
  }
`

const S = {
  OutterContainer: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
  `,
  Container: styled.div<{
    error?: string,
    disabled?: boolean,
    success?: boolean,
    compact?: boolean,
    forceFocus?: boolean
  }>`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    width: calc(100% - 2rem);
    height: ${props => props.compact ? 'var(--F_Input_Height)' : 'var(--F_Input_Height_Hero)'};
    line-height: 0;
    &:hover {
      box-shadow: ${props => 
        props.success 
          ? 'var(--F_Outline_Success)' 
          : props.error
            ? 'var(--F_Outline_Error)'
            : props.forceFocus
              ? 'var(--F_Outline_Focus)'
              : 'var(--F_Outline_Hover)'
      };
    }

    label {
      color: ${props => props.forceFocus ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Label)'};
    }
    
    &:focus-within {
      box-shadow: ${props => 
        props.success 
          ? 'var(--F_Outline_Success)' 
          : props.error
            ? 'var(--F_Outline_Error)'
            : 'var(--F_Outline_Focus)'
      };

      label {
        color: var(--F_Font_Color);
      }

    };
    border-radius: .75rem;

    box-shadow: ${props => 
      props.success 
        ? 'var(--F_Outline_Success)' 
        : props.error
          ? 'var(--F_Outline_Error)'
          : props.forceFocus
              ? 'var(--F_Outline_Focus)'
              : 'var(--F_Outline)'
    };
  `,
  Input: styled.input<{
    name?: string,
    hasLabel?: boolean,
    error?: string,
    disabled?: boolean,
    focused: boolean,
    type?: string,
    locked: boolean,
    hasIcon: boolean
    id?: string,
    pad?: boolean,
    onChange?: (e : any) => void,
    preventFocus?: boolean,
    shrink: boolean,
    disableAnimation: boolean,
    compact?: boolean
  }>`
    width: 100%;
    height: 100%;
    position: relative;
    font-size: var(--F_Font_Size_Title);
    font-size: ${props => props.compact ? 'var(--F_Font_Size)' : 'var(--F_Font_Size_Large)'};
    height: ${props => props.compact ? '1.5rem' : '1.5rem'};
    background: none;
    vertical-align: center;
    line-height: 1em;
    border: none;
    margin-left: ${props => props.hasIcon ? '.75rem' : '0'};
    padding: 0;
    outline: none;
    -webkit-appearance: none;
    color: var(--F_Font_Color);
    pointer-events: ${props => props.preventFocus ? 'none' : 'auto'};
    box-sizing: border-box;
    animation: ${props => (props.shrink && props.hasLabel) ? css`${moveDown} ${props.disableAnimation ? '0s' : '.15s'} forwards` : 'none'};
  `,
  Label: styled.label<{
    locked: boolean,
    hasIcon: boolean,
    focused: boolean,
    shrink: boolean,
    disableAnimation: boolean,
    hide?: boolean,
  }>`
    display: ${props => props.hide ? 'none' : 'flex'};
    position: absolute;
    top: 50%;
    line-height: 0;
    height: .5rem;
    left: ${props => props.hasIcon ? '2.65rem' : '1rem'};
    color: var(--F_Font_Color_Label);
    font-size: var(--F_Font_Size_Large);
    pointer-events: none;
    animation: ${props => props.shrink ? css`${moveUp} ${props.disableAnimation ? '0s' : '.15s'} forwards` : 'none'};
  `,
  MessageContainer: styled.div<{
    isHint: boolean,
    hasIcon: boolean
  }>`
    width: 100%;
    margin-top: .5rem;
    color: ${props => props.isHint ? 'var(--F_Font_Color_Disabled)' : 'var(--F_Font_Color_Error)'};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 1rem;
  `,
  Message: styled.div`
    margin-top: -.25rem;
    font-size: var(--F_Font_Size_Small);
  `,
  ErrorIconContainer: styled.div`
    position: relative;
  `,
  IconContainer: styled.div<{
    error: boolean
  }>`
    position: relative;
    * {
      color: ${props => props.error ? 'var(--F_Font_Color_Error)' : 'var(--F_Font_Color)'};
    }
  `
}
