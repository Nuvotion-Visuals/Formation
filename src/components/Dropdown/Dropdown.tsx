import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Item, ItemProps } from '../../internal'
import { Button, ButtonProps } from '../../internal'
import { TextInput } from '../../internal'

export interface DropdownProps extends ButtonProps {
  items: ItemProps[]
  onOpen?: (open: boolean) => void
  maxWidth?: string,
  searchPlaceholder?: string,
  children?: React.ReactNode,
  isSelect?: boolean,
  disableSearch?: boolean,
  xPosition?: number, // New prop for x coordinate
  yPosition?: number, // New prop for y coordinate
  externalOpen?: boolean // 
  hideTriggerButton?: boolean,
  onIsDropdownAbove?: (isDropdownAbove: boolean) => void
}

/**
 * `Dropdown` is a flexible UI component that renders a dropdown list. It can display a list of selectable items, 
 * support a search function for filtering options, and provide a custom appearance by rendering children elements.
 * The dropdown expands based on user interaction and closes when an item is selected or when clicked outside of the list.
 *
 * @component
 * @param {ItemProps[]} items - An array of objects defining the list items and their actions.
 * @param {function} [onOpen] - Optional callback triggered when the dropdown is opened or closed.
 * @param {string} [maxWidth] - Optional maximum width of the dropdown.
 * @param {string} [searchPlaceholder] - Optional placeholder text for the search input field.
 * @param {React.ReactNode} [children] - Optional elements to be rendered instead of the default dropdown appearance.
 * @param {boolean} [isSelect] - Determines if the dropdown should behave as a select element.
 * @param {boolean} [disableSearch] - If true, the search functionality is disabled regardless of the number of items.
 *
 * @example
 * // Dropdown with custom button and a list of options
 * <Dropdown 
 *   items={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' }
 *   ]}
 *   onOpen={open => console.log(`Dropdown is ${open ? 'open' : 'closed'}`)}
 * >
 *   <Button text="Select an option" />
 * </Dropdown>
 */

export const Dropdown = React.memo((props: DropdownProps) => {
  const items = props.items
  const [open, setOpen] = useState(false)
  const myRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const portalContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!portalContainer.current) {
      portalContainer.current = document.createElement('div')
      document.body.appendChild(portalContainer.current)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        myRef.current &&
        !myRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [myRef])

  const [isDropdownAbove, setIsDropdownAbove] = useState(false)

  useEffect(() => {
    if (props.onIsDropdownAbove) {
      props.onIsDropdownAbove(isDropdownAbove)
    }
  }, [isDropdownAbove])

  const [autoFocus, setAutoFocus] = useState(false)

  useEffect(() => {
    const dropdownElement = dropdownRef.current
    if (dropdownElement && myRef.current) {
      const rect = myRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const windowWidth = window.innerWidth
      const dropdownHeight = dropdownElement.offsetHeight
      const dropdownWidth = dropdownElement.offsetWidth
  
      // Reposition based on bottom screen edge
      if (rect.bottom + dropdownHeight > windowHeight) {
        dropdownElement.style.top = props.isSelect 
          ? `${rect.top - dropdownHeight + 1}px` 
          : `${rect.top - dropdownHeight}px`
        setIsDropdownAbove(true)
      } 
      else {
        dropdownElement.style.top = dropdownElement.style.top = props.isSelect
          ? `${rect.bottom - 1}px`
          : `${rect.bottom}px`
        setIsDropdownAbove(false)
      }
  
      // Reposition based on right screen edge
      if (rect.right + dropdownWidth > windowWidth) {
        dropdownElement.style.left = `${rect.left - dropdownWidth + rect.width}px`
      } 
      else {
        dropdownElement.style.left = `${rect.left}px`
      }
    }
  
    if (props.onOpen) {
      props.onOpen(open)
    }

    setAutoFocus(open)
  }, [open])
  
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const activeIndex = items.findIndex(item => item.active)
      let nextActiveIndex = -1
  
      if (event.code === 'ArrowDown') {
        for (let i = activeIndex + 1; i < items.length; i++) {
          if (items[i].onClick) {
            nextActiveIndex = i
            break
          }
        }
      } 
      else if (event.code === 'ArrowUp') {
        for (let i = activeIndex - 1; i >= 0; i--) {
          if (items[i].onClick) {
            nextActiveIndex = i
            break
          }
        }
      }
  
      if (nextActiveIndex !== -1 && items[nextActiveIndex].onClick) {
        const nativeEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
        // @ts-ignore
        items[nextActiveIndex].onClick(nativeEvent as unknown as React.MouseEvent<Element, MouseEvent>)
  
        const element = itemRefs.current[nextActiveIndex]
        if (element) {
          const dropdownElement = dropdownRef.current
          if (dropdownElement) {
            const elementRect = element.getBoundingClientRect()
            const dropdownRect = dropdownElement.getBoundingClientRect()
  
            const isOutOfView = elementRect.bottom > dropdownRect.bottom || elementRect.top < dropdownRect.top
  
            if (isOutOfView) {
              element.scrollIntoView({ behavior: 'auto' })  // Instant scroll
            }
          }
        }
      }
    }
  
    if (open) {
      window.addEventListener('keydown', handleKeyDown)
    }
  
    return () => {
      if (open) {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [items, open])
  
  useEffect(() => {
    const dropdownElement = dropdownRef.current
    if (dropdownElement) {
      dropdownElement.style.visibility = open ? 'visible' : 'hidden'
    }
  }, [open])

  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const [search, set_search] = useState('')

  const enableSearch = (props.items.length > 10) && !props.disableSearch

  const filteredItems = enableSearch
    ? props.items.filter(itemProps => 
        (itemProps?.name || itemProps?.label || itemProps?.text)?.toLowerCase()?.includes(search?.toLowerCase())
      )
    : props.items

  const { externalOpen } = props

  useEffect(() => {
    // Toggle visibility based on externalOpen prop
    if (externalOpen !== undefined) {
      setOpen(externalOpen)
    }
  }, [externalOpen])

  useLayoutEffect(() => {
    const dropdownElement = dropdownRef.current
    if (dropdownElement) {
      // Position dropdown based on provided coordinates
      if (props.xPosition !== undefined && props.yPosition !== undefined) {
        dropdownElement.style.left = `${props.xPosition}px`
        dropdownElement.style.top = `${props.yPosition}px`
      }
    }
  }, [props.xPosition, props.yPosition, open])

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.stopPropagation()
  }, [])

  return (
    <>
      {
        !props.hideTriggerButton && 
          <S.Options
            ref={myRef}
            expand={props.expand}
            onClick={(e) => {
              e.stopPropagation()
              setOpen(!open)
            }}
          >
            {
              props.children 
                ? props.children 
                : <Button {...props} />
            }
          </S.Options>
      }
      {
        portalContainer.current && ReactDOM.createPortal(
          <S.Dropdown 
            ref={dropdownRef} 
            style={{ visibility: 'hidden' }}
            maxWidth={props.maxWidth}
            isSelect={props.isSelect}
            isDropdownAbove={isDropdownAbove}
            onMouseDown={handleMouseDown}
          >
            {
              enableSearch &&
                <S.Sticky>
                  <TextInput
                    value={search}
                    onChange={val => set_search(val)}
                    canClear={search !== ''}
                    compact
                    placeholder={props.searchPlaceholder ? props.searchPlaceholder : 'Search...'}
                    backgroundColor='var(--F_Background)'
                    onClick={e => e.stopPropagation()}
                    autoFocus={autoFocus}
                  />
                </S.Sticky>
            }
            
            {
              filteredItems.map((itemProps, index) => (
                <S.DropdownOption key={index}>
                  <Item
                    ref={el => itemRefs.current[index] = el}
                    {...itemProps}
                    onClick={
                      itemProps.onClick
                        ? (e) => {
                            if (itemProps.onClick) {
                              itemProps.onClick(e)
                            }
                            setOpen(false)
                            if (itemRefs.current[index]) {
                              itemRefs.current[index]!.scrollIntoView({ behavior: 'auto' })
                            }
                          } 
                        : undefined
                    }
                  />
                </S.DropdownOption>
              ))
            }
          </S.Dropdown>,
          portalContainer.current
        )
      }
    </>
  )
})

export default Dropdown

const S = {
  Options: styled.div<{
    expand?: boolean
  }>`
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    width: ${props => props.expand ? '100%' : 'auto'};
  `,
  IconCircle: styled.div<{
    open: boolean,
  }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.open ? 'var(--F_Surface)' : 'none'};
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 100%;
    cursor: pointer;

    * {
      color: ${props => props.open ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Label)'};
    }

    &:hover {
      background: var(--F_Surface);
    }
  `,
  Dropdown: styled.div<{
    maxWidth?: string,
    isSelect?: boolean,
    isDropdownAbove?: boolean,
    backgroundColor?: string,
  }>`
    position: fixed;
    z-index: 1000;
    background: var(--F_Surface);
    border-radius: .375rem;
    overflow: hidden;
    user-select: none;
    width: ${props => 
      props.maxWidth 
        ? props.isSelect
          ? `calc(${props.maxWidth} - 2px)` 
          : props.maxWidth
        : '110px'
    };
    max-height: 400px;
    overflow-y: auto;
    border-radius: ${props => 
      props.isSelect 
        ? props.isDropdownAbove
          ? '.375rem .375rem 0 0'
          : '0 0 .375rem .375rem'
        : '.375rem'
      };
    padding: .25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 6px 15px rgba(0, 0, 0, 0.3), var(--F_Outline_Focus);
  `,
  DropdownOption: styled.div`
    border-radius: var(--F_Tile_Radius);
    overflow: hidden;
  `,
  IconSpacer: styled.div`
    width: 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
  `,
  DropDownText: styled.div`
    padding-left: .125rem;
    font-size: var(--F_Font_Size);
    display: flex;
  `,
  Sticky: styled.div<{
    backgroundColor?: string
  }>`
    position: sticky;
    top: -.22rem;
    z-index: 1;
    background: var(--F_Surface);
    padding: .25rem 0;
    margin-top: -.25rem;
    border-top: 1px solid var(--F_Surface_3);
  `
}
