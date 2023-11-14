import React, { useState } from 'react'
import styled from 'styled-components'

import { Box, Icon } from '../../internal'
import { IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  id?: string
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  invalidInput?: boolean
  disabled?: boolean
  error?: boolean
  success?: boolean
  disableAutoFocus?: boolean
  onFocus?: React.FocusEventHandler<HTMLInputElement>,
  compact?: boolean,
  iconPrefix?: IconPrefix,
  readOnly?: boolean,
  autoFocus?: boolean,
  onBlur?: () => void
}

/**
 * `TitleEditor` is designed for inline editing of text, such as titles or labels. 
 * It toggles between a display mode and an editable text input mode. 
 *
 * @param {string} [placeholder] - The placeholder text for the input field.
 * @param {string} value - The current value of the input field.
 * @param {function} onChange - Callback function that is called when the input value changes.
 * @param {string} [id] - Optional ID for the input element.
 * @param {function} [onKeyDown] - Optional callback function for the onKeyDown event.
 * @param {boolean} [invalidInput] - Indicates if the input is in an invalid state.
 * @param {boolean} [disabled] - If true, the input field is disabled.
 * @param {boolean} [error] - If true, the input field indicates an error state.
 * @param {boolean} [success] - If true, the input field indicates a success state.
 * @param {boolean} [disableAutoFocus] - If true, disables the auto-focus feature on the input field.
 * @param {function} [onFocus] - Optional callback function for the onFocus event.
 * @param {boolean} [compact] - If true, applies a compact style to the input field.
 * @param {IconPrefix} [iconPrefix] - Optional prefix for the icon used.
 * @param {boolean} [readOnly] - If true, the input field is read-only.
 * @param {boolean} [autoFocus] - If true, the input field is auto-focused when the component mounts.
 * @param {function} [onBlur] - Optional callback function for the onBlur event.
 *
 * @example
 * <TitleEditor 
 *   value="Sample Title" 
 *   onChange={(newValue) => console.log(newValue)} 
 *   placeholder="Enter Title" 
 *   error={false} 
 *   success={true} 
 * />
 */

export const TitleEditor = ({
  placeholder,
  value,
  onChange,
  id,
  onKeyDown,
  invalidInput,
  disabled,
  error,
  success,
  disableAutoFocus,
  onFocus,
  compact,
  iconPrefix,
  readOnly,
  autoFocus,
  onBlur
}: Props) => {
  const [editing, setEditing] = useState(autoFocus)

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event)
    }
    event.target.select()
  }

  return (
    <S.TitleEditor 
      onBlur={() => {
        setEditing(false)
        if (onBlur) {
          onBlur()
        }
      }} 
      readOnly={readOnly}
    >
      {
      editing && !readOnly
        ? <S.TextInput
            value={value}
            placeholder={placeholder}
            onChange={(e: any) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            invalidInput={invalidInput}
            id={id}
            disabled={disabled}
            autoFocus={!disableAutoFocus}
            error={error}
            success={success}
            onFocus={handleFocus}
            compact={compact}
          />
        : <div onClick={() => setEditing(true)}>
            <Box>
              <S.Name compact={compact}>
                {
                  value
                }
              </S.Name>
              {
                !readOnly &&
                  <Icon icon='edit' iconPrefix={iconPrefix ? iconPrefix : 'fas'} />
              }
            </Box>
          </div>
      }
    </S.TitleEditor>
  )
}

const S = {
  TitleEditor: styled.div<{
    readOnly?: boolean
  }>`
    display: flex;
    cursor: ${props => props.readOnly ? 'default' : 'pointer'};
  `,

  Name: styled.div<{
    hero?: boolean,
    compact?: boolean
  }>`
    display: flex;
    margin-right: .5rem;
    align-items: center;
    font-size: ${props => 
      props.compact 
        ? 'var(--F_Font_Size)' 
        : 'var(--F_Font_Size_Title)' 
    };
    height: var(--F_Input_Height_Compact);

  `,

  TextInput: styled.input<Props>`
    width: 100%;
    vertical-align: baseline;
    display: flex;
    font-size: ${props => 
      props.compact 
        ? 'var(--F_Font_Size)' 
        : 'var(--F_Font_Size_Title)' 
    };
    color: var(--F_Font_Color);
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    border: ${props => props.invalidInput ? '1px solid red' : 'none'};
    opacity: ${props => props.disabled ? 0.5 : 1};
    height: var(--F_Input_Height_Compact);
  `
};
