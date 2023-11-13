import React, { useState, useEffect, useRef } from 'react'
import { Dropdown, TextInput, TextInputProps, ItemProps } from '../../internal'
import styled from 'styled-components'

interface Props extends TextInputProps {
  value: string,
  items: ItemProps[],
  onChange: (val: string) => void,
  allowCustomEntry?: boolean,
  maxWidth?: string
}

/**
 * `AutocompleteDropdown` is a combination of a text input and a dropdown list. It allows the user to type a value, 
 * providing suggestions based on the `items` prop, and optionally allows custom entries if `allowCustomEntry` is true.
 *
 * @component
 * @param {string} value - The current value of the autocomplete input.
 * @param {ItemProps[]} items - An array of items to display as dropdown options.
 * @param {function} onChange - Callback function that is called with the new value when it changes.
 * @param {boolean} [allowCustomEntry] - If true, allows users to enter custom values not present in the items list.
 * @param {string} [maxWidth] - The maximum width that the dropdown can have.
 * @param {...TextInputProps} props - Props spread onto the TextInput component.
 *
 * @example
 * // Autocomplete dropdown with predefined items and a custom entry allowed
 * <AutocompleteDropdown
 *   value={selectedValue}
 *   items={[{ value: 'Item 1' }, { value: 'Item 2' }]}
 *   onChange={handleChange}
 *   allowCustomEntry={true}
 * />
 */

export const AutocompleteDropdown = ({
  value,
  items,
  onChange,
  ...props
}: Props) => {
  const [displayValue, setDisplayValue] = useState(value)
  const [maxWidth, setMaxWidth] = useState<string | undefined>('100%')
  const autoCompleteContainerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  const updateMaxWidth = () => {
    if (autoCompleteContainerRef.current) {
      setMaxWidth(`${autoCompleteContainerRef.current.offsetWidth}px`)
    }
  }

  const handleInputChange = (inputValue: string) => {
    setDisplayValue(inputValue)
    const matchingItem = items.find(item => item.value === inputValue)
    if (matchingItem) {
      onChange(matchingItem.value)
    }
    else {
      onChange(inputValue)
    }
  }

  return (
    <S.AutocompleteDropdown ref={autoCompleteContainerRef}>
      <Dropdown
        items={items.map(item => ({
          ...item,
          onClick: () => {
            setDisplayValue(item.value)
            onChange(item.value)
          },
          key: item.value
        }))}
        maxWidth={maxWidth}
        onOpen={(isOpen) => {
          updateMaxWidth()
          setIsOpen(isOpen)
        }}
        disableSearch
        isSelect
      >
        <TextInput
          value={displayValue}
          onChange={handleInputChange}
          {...props}
          dropdownOpen={isOpen}
        />
      </Dropdown>
    </S.AutocompleteDropdown>
  )
}


const S = {
  AutocompleteDropdown: styled.div<{
    maxWidth?: string
  }>`
    position: relative;
    width: 100%;
    max-width: ${props => props.maxWidth ? props.maxWidth : 'auto'};
  `,
  Item: styled.div<{
  }>`
    width: 100%;
    color: var(--F_Font_Color);
    font-size: var(--F_Font_Size);
    cursor: pointer;
  `,
  DropdownDropdown: styled.div<{
    hasIcon: boolean,
    maxWidth?: string
  }>`
    position: absolute;
    z-index: 1;
    background: var(--F_Background);
    border-radius: 0 0 .75rem .75rem;
    box-shadow: var(--F_Outline_Outset_Focus);
    top: calc(var(--F_Input_Height) + 0);
    width: calc(100% - 1.5rem);
    min-width: ${props => props.maxWidth ? props.maxWidth : '6rem'};
    max-height: 300px;
    max-width: ${props => props.maxWidth ? props.maxWidth : 'auto'};
    width: calc(100% - 2px);
    margin-left: 1px;
    overflow-y: auto;
    overflow-x: hidden;
    left: ${props => props.hasIcon ? '1.75rem' : '0rem'};
    user-select: none;
  `
}