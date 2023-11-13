import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { isTouchCapable } from '../../internal'
import { useOnClickOutside } from '../../internal'
import { useScrollTo } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { TextInput, LabelColor as LabelColorType } from '../../internal'

import { LabelColorCircle } from './LabelColorCircle'

const Dropdown = ({ 
  value,
  onChange,
  onClose,
  options
} : {
  value: string,
  onChange: (arg0: string) => void,
  onClose: () => void,
  options: LabelColorType[]
}) => {

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const scrollToRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(scrollContainerRef, () => {
    onClose()
  })

  const { set_scrollTo } = useScrollTo(scrollContainerRef, scrollToRef);

  useEffect(() => {
    set_scrollTo(true)
  }, [])

  return <S.DropdownDropdown ref={scrollContainerRef}>
    {
      options.map(item => 
        <LabelColorCircle
          labelColor={item as any}
          ref={value === item ? scrollToRef : null}
          onClick={() => {
            onChange(item)
            onClose()
          }}
        />
      )
    }
  </S.DropdownDropdown>
}

interface Props {
  value: string,
  label?: string,
  onChange: (arg0: LabelColorType) => void,
  error?: string,
  options: LabelColorType[],
  icon?: IconName,
  iconPrefix?: IconPrefix
}

/**
 * `LabelColorPicker` is a form component that allows users to select a label color from a dropdown. 
 * It combines a text input for direct manipulation with a dropdown for visual selection of colors.
 *
 * @component
 * @param {string} value - The currently selected color value.
 * @param {string} [label] - The label text for the color picker.
 * @param {function} onChange - Callback function invoked when a color is selected or input value is changed.
 * @param {string} [error] - Error message to display if the color selection is invalid.
 * @param {LabelColorType[]} options - An array of color options for the user to select from.
 * @param {IconName} [icon] - Optional icon displayed in the text input.
 * @param {IconPrefix} [iconPrefix] - Optional prefix for the icon, determining its style.
 *
 * @example
 * // LabelColorPicker with pre-defined color options
 * <LabelColorPicker
 *   value={selectedColor}
 *   onChange={newColor => setSelectedColor(newColor)}
 *   label="Label Color"
 *   options={['red', 'green', 'blue']}
 *   icon="palette"
 *   iconPrefix="fas"
 * />
 */
export const LabelColorPicker = ({
  value,
  onChange,
  label,
  error,
  options,
  icon,
  iconPrefix
}: Props) => {
  const [isOpen, set_isOpen] = useState(false)

  const [preventFocus, set_preventFocus] = useState(isTouchCapable())

  useEffect(() => {
    if (isOpen) {
      set_preventFocus(false)
    }
  }, [isOpen])

  return (
    <S.LabelColorPicker 
      onClick={() => {
        set_preventFocus(isTouchCapable())
        set_isOpen(!isOpen)
      }}
    >
      <TextInput
        label={label}
        icon={icon}
        iconPrefix={iconPrefix}
        value={value}
        onChange={value => onChange(value as LabelColorType)}
        error={error}
        preventFocus={preventFocus}
        onBlur={() => set_preventFocus(isTouchCapable())}
        labelColor={value as any}
        hero
      />

      {
        isOpen
          ? <Dropdown
              onChange={newValue => onChange(newValue as LabelColorType)}
              value={value}
              onClose={() => set_isOpen(false)}
              options={options}
            />
        : null
      }
    </S.LabelColorPicker>
  )
} 

const S = {
  LabelColorPicker: styled.div`
    position: relative;
    width: 100%;
  `,
  Item: styled.div<{
    active: boolean
    outline: string
  }>`
    width: 1.5rem;
    height: 1.5rem;
    /* width: 100%; */
    color: var(--F_Font_Color);
    font-size: var(--F_Font_Size);
    background: ${props => props.color};
    cursor: pointer;
    border-radius: .25rem;
    border : ${props => ` 2px solid ${props.outline}`};
  `,
  DropdownDropdown: styled.div`
    position: absolute;
    z-index: 1;
    background: var(--F_Background);
    border-radius: .5rem;
    box-shadow: var(--F_Outline_Hover);
    top: calc(var(--F_Input_Height) + .75rem);
    width: calc(100% - 2.5rem);
    min-width: 8rem;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    left: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    padding: .5rem;
    gap: .5rem;
  `
}