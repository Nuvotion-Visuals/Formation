import React, { useCallback, useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon, Box, LabelColor, getLabelColor, Button, ButtonProps } from '../../internal'
import { LabelColorCircle } from '../LabelColorPicker/LabelColorCircle'


export type TextInputProps = {
  name?: string,
  label?: string,
  error?: string,
  disabled?: boolean,
  compact?: boolean,
  hero?: boolean,
  success?: boolean,
  type?: string,
  id?: string,
  onChange?: (value: string) => void,
  value: string,
  autoFocus?: boolean,
  icon?: IconName,
  iconPrefix?: IconPrefix
  hint?: string,
  onClick?: (e: React.MouseEvent) => void,
  preventFocus?: boolean,
  onBlur?: () => void,
  ref?: any,
  labelColor?: LabelColor,
  onEnter?: () => void,
  onChangeEvent?: (e: any) => void,
  placeholder?: string,
  forceFocus?: boolean,
  hideOutline?: boolean,
  secondaryIcon?: IconName,
  secondaryOnClick?: (e: React.MouseEvent) => void,
  buttons?: ButtonProps[],
  canClear?: boolean,
  onClear?: () => void,
  dropdownOpen?: boolean,
  backgroundColor?: string
}

export const TextInput = React.memo(({ 
  label, 
  error, 
  success, 
  disabled, 
  compact,
  hero,
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
  forceFocus,
  hideOutline,
  secondaryIcon,
  secondaryOnClick,
  buttons,
  canClear,
  onClear,
  dropdownOpen,
  backgroundColor
}: TextInputProps) => {
  // @ts-ignore
  const autoFocusRef = useCallback(el => el && autoFocus ? el.focus() : null, [])

  const [locked, setLocked] = useState(!!value)
  const [focused, setFocused] = useState(!!value)

  if (canClear) {
    secondaryIcon = 'times'
    secondaryOnClick = () => {
      if (onChange) {
        onChange('')
      }
      if (onClear) {
        onClear()
      }
    }
  }

  useEffect(() => {
    if (value) {
      setLocked(false)
      setFocused(false)
    }
  }, [value])

  return (<S.OutterContainer 
    onClick={(e: React.MouseEvent) => {
      if (onClick) {
        onClick(e)
      }
    }
  }>
    <S.Container 
      error={error} 
      disabled={disabled} 
      success={success}
      compact={compact}
      forceFocus={forceFocus}
      hideOutline={hideOutline}
      dropdownOpen={dropdownOpen}
      hero={hero}
      backgroundColor={backgroundColor}
    >
      <S.ErrorIconContainer>
        
        {
          labelColor &&
            <Box mr={.25}>
              <LabelColorCircle
                labelColor={labelColor}
                ref={null}
                onClick={() => {}}
              />
            </Box>
        }
    
        {
          icon &&
            <Icon 
                icon={icon} 
                iconPrefix={iconPrefix}
                fixedWidth
              />
        }
      </S.ErrorIconContainer>

      <S.Input
        shrink={value !== '' || focused}
        disableAnimation={value !== '' && !focused}
        name={name}
        value={value}
        compact={compact}
        hero={hero || label}
        preventFocus={preventFocus}
        placeholder={placeholder}
        onKeyDown={onEnter 
          ? (e : React.KeyboardEvent<HTMLInputElement>) => {
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
        disabled={disabled}
        onChange={(event : React.ChangeEvent<HTMLInputElement>)  => {
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

      {
        secondaryIcon &&
          <S.SecondaryIconContainer onClick={secondaryOnClick}>
            <Icon 
              icon={secondaryIcon} 
              iconPrefix={iconPrefix}
              fixedWidth
            />
          </S.SecondaryIconContainer>
      }

      {
        buttons && buttons.length > 0
          && <Box mr={-.5}>
                <S.Divider />
                {
                  buttons.map(buttonProps => <Button {...buttonProps}/>)
                }
              
              </Box>
      }

      <S.Label 
        locked={locked} 
        focused={focused} 
        hasIcon={icon !== undefined || labelColor !== undefined} 
        shrink={value !== '' || focused}
        disableAnimation={value !== '' && !focused}
        hide={label === undefined || !hero}
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
})

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
  OutterContainer: React.memo(styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  `),
  Divider: React.memo(styled.div`
    width: 1px;
    height: 1rem;
    background: var(--F_Surface);
    margin-left: .75rem;
    margin-right: .25rem;
  `),
  Container: React.memo(styled.div<{
    error?: string,
    disabled?: boolean,
    success?: boolean,
    compact?: boolean,
    hero?: boolean,
    forceFocus?: boolean,
    hideOutline?: boolean,
    dropdownOpen?: boolean,
    backgroundColor?: string
  }>`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    padding: ${props => props.compact ? '0 .75rem' : '0 1rem'};
    width: ${props => props.compact ? 'calc(100% - 1.5rem)' : 'calc(100% - 2rem)'};
    height: ${props => 
      props.hero
        ? 'var(--F_Input_Height_Hero)'
        : props.compact ? 'var(--F_Input_Height_Compact)' : 'var(--F_Input_Height)'};
    line-height: 0;
    border-radius: .75rem;
    border-radius: ${props => props.dropdownOpen ? '.75rem .75rem 0 0' : '.75rem'};
    background: ${props => props.backgroundColor ? props.backgroundColor : 'none'};
    box-shadow: ${props => 
      props.hideOutline
        ? 'none'
        : props.success 
          ? 'var(--F_Outline_Success)' 
          : props.error
            ? 'var(--F_Outline_Error)'
            : props.forceFocus
                ? 'var(--F_Outline_Focus)'
                : 'var(--F_Outline)'
    };
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
  `),
  Input: React.memo(styled.input<{
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
    margin-left: ${props => props.hasIcon ? '.5rem' : '0'};
    padding: 0;
    outline: none;
    -webkit-appearance: none;
    color: var(--F_Font_Color);
    pointer-events: ${props => props.preventFocus ? 'none' : 'auto'};
    box-sizing: border-box;
    animation: ${props => (props.shrink && props.hasLabel) ? css`${moveDown} ${props.disableAnimation ? '0s' : '.15s'} forwards` : 'none'};
    &::placeholder {
      color: var(--F_Font_Color_Disabled);
    }
  `),
  Label: React.memo(styled.label<{
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
    left: ${props => props.hasIcon ? '2.75rem' : '1rem'};
    color: var(--F_Font_Color_Label);
    font-size: var(--F_Font_Size_Large);
    pointer-events: none;
    animation: ${props => props.shrink ? css`${moveUp} ${props.disableAnimation ? '0s' : '.15s'} forwards` : 'none'};
  `),
  MessageContainer: React.memo(styled.div<{
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
  `),
  Message: React.memo(styled.div`
    margin-top: -.25rem;
    font-size: var(--F_Font_Size_Small);
  `),
  ErrorIconContainer: React.memo(styled.div`
    position: relative;
  `),
  SecondaryIconContainer: React.memo(styled.div`
    position: relative;
    cursor: ${props => props.onClick ? 'pointer' : 'auto'};
  `),
  IconContainer: React.memo(styled.div<{
    error: boolean
  }>`
    position: relative;
    * {
      color: ${props => props.error ? 'var(--F_Font_Color_Error)' : 'var(--F_Font_Color)'};
    }
  `)
}
