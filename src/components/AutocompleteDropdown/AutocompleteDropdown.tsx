import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { Item, ItemProps, TextInputProps, isTouchCapable } from '../../internal'
import { useOnClickOutside } from '../../internal'
import { useScrollTo } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { TextInput } from '../../internal'

const Dropdown = React.memo(({ 
  value,
  onChange,
  onClose,
  items,
  hasIcon,
  maxWidth
} : {
  value: string,
  onChange: (arg0: string) => void,
  onClose: () => void,
  items: ItemProps[],
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
      items.map(item =>
        <S.Item 
          key={item.value}
          ref={value === item.value ? scrollToRef : null}
        >
          <Item
            {...item}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              if (item.onClick) {
                item.onClick(e)
              }
              onChange(item.value)
              onClose()
            }}
            indent
          />
        </S.Item>  
      )
    }
  </S.DropdownDropdown>
})

interface Props extends TextInputProps {
  onChange: (arg0: string) => void,
  error?: string,
  items: ItemProps[],
  maxWidth?: string,
}

export const AutocompleteDropdown = React.memo((props: Props) => {

  const {
    value,
    onChange,
    label,
    error,
    items,
    icon,
    iconPrefix,
    maxWidth,
    placeholder,
    compact
  } = props

  const [isOpen, set_isOpen] = useState(false)
  const [displayValue, set_displayValue] = useState(value)

  useEffect(() => {
    set_displayValue(value)
  }, [value])

  return (
    <S.AutocompleteDropdown 
      onClick={() => {
        if (!isOpen) {
          set_isOpen(true)
        }
      }}
      maxWidth={maxWidth}
    >
      <TextInput
       {
          ...props
        }
        value={displayValue}
        onChange={value => onChange(value)}
        error={error}
        forceFocus={isOpen}
        placeholder={placeholder}
        compact={compact}
        dropdownOpen={isOpen && items.length !== 0}
        canClear={value !== ''}
      />

      {
        isOpen && items.length
          ? <Dropdown
              onChange={newValue => onChange(newValue)}
              value={value}
              onClose={() => set_isOpen(false)}
              items={items}
              hasIcon={iconPrefix !== undefined}
              maxWidth={maxWidth}
            />
        : null
      }
    </S.AutocompleteDropdown>
  )
})

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