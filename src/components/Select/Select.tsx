import React, { useState, useEffect, useRef } from 'react'
import { Dropdown, TextInput, TextInputProps } from '../../internal'
import styled from 'styled-components'

interface Props extends TextInputProps {
  value: string,
  options: {
    label: string,
    value: string
  }[],
  onChange: (val: string) => void,
  allowDirectEntry?: boolean,
}

/**
 * Select allows users to choose one value from a list. When a user clicks the Select, a dropdown list appears, and users can choose one option from that list. The dropdown list closes after a selection has been made.
 * 
 * It also features an optional 'allowDirectEntry' attribute that allows users to type an entry directly into the Select field instead of choosing from the dropdown. If a typed entry matches an option from the dropdown list, it will select that option; if it doesn't, the typed entry will be used as the Select field value.
 *
 * @param {string} value - The current selected value from the dropdown.
 * @param {Array.<{ label: string, value: string }>} options - The list of options that appear in the dropdown.
 * @param {Function} onChange - A callback function that fires when the selected value changes. 
 * @param {boolean} [allowDirectEntry=false] - A flag to decide whether a user can type an entry directly into the Select field.  
 *
 * @component
 * @example
 * 
 *  const options = [
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' }
 *  ]
 * 
 *  const getValue= val => {
 *    console.log(val);
 *  }
 *  
 *  return (
 *    <Select value="1" options={options} onChange={getValue} allowDirectEntry />
 *  )
 */
export const Select = ({
  value,
  options,
  onChange,
  allowDirectEntry,
  ...props
}: Props) => {
  const [labelValue, setLabelValue] = useState(value)
  const [maxWidth, setMaxWidth] = useState<string | undefined>('100%')
  const selectContainerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const matchingOption = options.find(option => option.value === value)
    if (matchingOption) {
      setLabelValue(matchingOption.label)
    }
  }, [value, options])

  const updateMaxWidth = () => {
    if (selectContainerRef.current) {
      setMaxWidth(`${selectContainerRef.current.offsetWidth}px`)
    }
  }

  useEffect(() => {
    const matchingOption = options.find(option => option.label === labelValue)
    if (matchingOption) {
      onChange(matchingOption.value)
    }
  }, [labelValue])

  const handleInputChange = (inputValue: string) => {
    if (allowDirectEntry) {
      setLabelValue(inputValue)
      const matchingOption = options.find(option => option.label === inputValue)
      if (matchingOption) {
        onChange(matchingOption.value)
      }
      else {
        onChange(inputValue)
      }
    }
  }

  return (
    <S.Select ref={selectContainerRef}>
      <Dropdown
        items={options.map(option => ({
          text: option.label,
          active: value === option.value,
          onClick: () => {
            setLabelValue(option.label)
            onChange(option.value)
          },
          key: option.value
        }))}
        maxWidth={maxWidth}
        onOpen={(isOpen) => {
          updateMaxWidth()
          setIsOpen(isOpen)
        }}
        isSelect
      >
        <TextInput
          value={labelValue}
          onChange={handleInputChange}
          {...props}
          dropdownOpen={isOpen}
        />
      </Dropdown>
    </S.Select>
  )
}

const S = {
  Select: styled.div`
    width: 100%;
    max-width: 100%;
  `
}
