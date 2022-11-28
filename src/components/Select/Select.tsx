import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { isTouchCapable } from '../../internal'
import { useOnClickOutside } from '../../internal'
import { useScrollTo } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'


import { TextInput } from '../../internal'

const Dropdown = ({ 
  value,
  onChange,
  onClose,
  options,
  hasIcon
} : {
  value: string,
  onChange: (arg0: string) => void,
  onClose: () => void,
  options: string[],
  hasIcon: boolean
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

  return <S.DropdownDropdown 
    ref={scrollContainerRef} 
    hasIcon={hasIcon}
  >
    {
      options.map(item =>
        
        <S.Item 
          onClick={() => {
            onChange(item)
            onClose()
          }}
          active={value === item}
          ref={value === item ? scrollToRef : null}
        >
          { item }
        </S.Item>  
      )
    }
  </S.DropdownDropdown>
}

interface Props {
  value: string,
  label?: string,
  onChange: (arg0: string) => void,
  error?: string,
  options: string[],
  icon?: IconName,
  iconPrefix?: IconPrefix
}

export const Select = ({
  value,
  onChange,
  label,
  error,
  options,
  icon,
  iconPrefix
}: Props) => {
  const [isOpen, set_isOpen] = useState(false)
  const [displayValue, set_displayValue] = useState(value)

  useEffect(() => {
    set_displayValue(value)
  }, [value])

  const [preventFocus, set_preventFocus] = useState(isTouchCapable())

  useEffect(() => {
    if (isOpen) {
      set_preventFocus(false)
    }
  }, [isOpen])

  return (
    <S.Select 
      onClick={() => {
        set_preventFocus(isTouchCapable())
        set_isOpen(!isOpen)
      }}
    >
      <TextInput
        label={label}
        icon={icon}
        iconPrefix={iconPrefix}
        value={displayValue}
        onChange={value => onChange(value)}
        error={error}
        preventFocus={preventFocus}
        onBlur={() => set_preventFocus(isTouchCapable())}
      />

      {
        isOpen
          ? <Dropdown
              onChange={newValue => onChange(newValue)}
              value={value}
              onClose={() => set_isOpen(false)}
              options={options}
              hasIcon={icon !== undefined}
            />
        : null
      }
    </S.Select>
  )
} 

const S = {
  Select: styled.div`
    position: relative;
    width: 100%;
  `,
  Item: styled.div<{
    active: boolean
  }>`
    width: 100%;
    color: var(--F_Font_Color);
    padding: .5rem 1rem;
    font-size: var(--F_Font_Size);
    background: ${props => props.active ? 'var(--F_Surface_1)' : 'none'};
    cursor: pointer;
    &:hover {
      background: ${props => props.active ? 'var(--F_Surface_2)' : 'var(--F_Surface)'};
    }
  `,
  DropdownDropdown: styled.div<{
    hasIcon: boolean
  }>`
    position: absolute;
    z-index: 1;
    background: var(--F_Background);
    border-radius: .5rem;
    box-shadow: var(--F_Outline_Hover);
    top: calc(var(--F_Input_Height) + .75rem);
    width: calc(100% - 1.5rem);
    min-width: 8rem;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    left: ${props => props.hasIcon ? '1.75rem' : '0rem'};
    user-select: none;
  `
}