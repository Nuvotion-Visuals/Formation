import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { isTouchCapable } from '../../internal'
import { useOnClickOutside } from '../../internal'
import { useScrollTo } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'


import { TextInput } from '../../internal'

const Dropdown = React.memo(({ 
  value,
  onChange,
  onClose,
  options,
  hasIcon,
  maxWidth
} : {
  value: string,
  onChange: (arg0: string) => void,
  onClose: () => void,
  options: string[],
  hasIcon: boolean,
  maxWidth?: string
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
    maxWidth={maxWidth}
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
})

interface Props {
  value: string,
  label?: string,
  onChange: (arg0: string) => void,
  error?: string,
  options: string[],
  icon?: IconName,
  iconPrefix?: IconPrefix,
  maxWidth?: string
}

export const Select = React.memo(({
  value,
  onChange,
  label,
  error,
  options,
  icon,
  iconPrefix,
  maxWidth
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
      maxWidth={maxWidth}
    >
      <TextInput
        label={label}
        icon={icon ? icon : isOpen ? 'chevron-up' : 'chevron-down'}
        iconPrefix={iconPrefix}
        value={displayValue}
        onChange={value => onChange(value)}
        error={error}
        preventFocus={preventFocus}
        onBlur={() => set_preventFocus(isTouchCapable())}
        forceFocus={isOpen}
      />

      {
        isOpen
          ? <Dropdown
              onChange={newValue => onChange(newValue)}
              value={value}
              onClose={() => set_isOpen(false)}
              options={options}
              hasIcon={iconPrefix !== undefined}
              maxWidth={maxWidth}
            />
        : null
      }
    </S.Select>
  )
})

const S = {
  Select: styled.div<{
    maxWidth?: string
  }>`
    position: relative;
    width: 100%;
    max-width: ${props => props.maxWidth ? props.maxWidth : 'auto'};
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
    hasIcon: boolean,
    maxWidth?: string
  }>`
    position: absolute;
    z-index: 1;
    background: var(--F_Background);
    border-radius: .5rem;
    box-shadow: var(--F_Outline_Outset_Focus);
    top: calc(var(--F_Input_Height) + .75rem);
    width: calc(100% - 1.5rem);
    min-width: ${props => props.maxWidth ? props.maxWidth : '6rem'};
    max-height: 300px;
    max-width: ${props => props.maxWidth ? props.maxWidth : 'auto'};
    overflow-y: auto;
    overflow-x: hidden;
    left: ${props => props.hasIcon ? '1.75rem' : '0rem'};
    user-select: none;
  `
}