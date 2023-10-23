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
  allowDirectEntry?: boolean
}

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
          onClick: () => {
            setLabelValue(option.label)
            onChange(option.value)
          },
          key: option.value
        }))}
        maxWidth={maxWidth}
        onOpen={() => updateMaxWidth()}
      >
        <TextInput
          value={labelValue}
          onChange={handleInputChange}
          {...props}
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
