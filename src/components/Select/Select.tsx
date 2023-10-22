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
  const [intervalValue, setIntervalValue] = useState(value)
  const [maxWidth, setMaxWidth] = useState<string | undefined>('100%')
  const selectContainerRef = useRef<HTMLDivElement>(null)

  // Update intervalValue based on the incoming "value" prop
  useEffect(() => {
    const matchingOption = options.find(option => option.value === value)
    if (matchingOption) {
      setIntervalValue(matchingOption.label)
    }
  }, [value, options])

  // Update maxWidth based on the select container's width
  useEffect(() => {
    if (selectContainerRef.current) {
      setMaxWidth(`${selectContainerRef.current.offsetWidth}px`)
    }
  }, [])

  useEffect(() => {
    onChange(intervalValue)
  }, [intervalValue])

  return (
    <S.Select ref={selectContainerRef}>
      <Dropdown
        items={options.map(option => ({
          text: option.label,
          onClick: () => onChange(option.value)
        }))}
        maxWidth={maxWidth}
      >
        <TextInput
          value={intervalValue}
          onChange={allowDirectEntry ? val => {  setIntervalValue(val)} : () => {}}
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
