import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Item, ItemProps } from '../../internal'
import { Button, ButtonProps } from '../../internal'
import { TextInput } from '../../internal'

interface Props extends ButtonProps {
  items: ItemProps[]
  onOpen?: (open: boolean) => void
  maxWidth?: string,
  searchPlaceholder?: string,
  children?: React.ReactNode,
  isSelect?: boolean,
  disableSearch?: boolean,
}

export const Dropdown = React.memo((props: Props) => {
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

    // return () => {
    //   if (portalContainer.current) {
    //     document.body.removeChild(portalContainer.current)
    //   }
    // }
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
        dropdownElement.style.top = `${rect.top - dropdownHeight}px`
      } else {
        dropdownElement.style.top = `${rect.bottom}px`
      }
  
      // Reposition based on right screen edge
      if (rect.right + dropdownWidth > windowWidth) {
        dropdownElement.style.left = `${rect.left - dropdownWidth + rect.width}px`
      } else {
        dropdownElement.style.left = `${rect.left}px`
      }
    }
  
    if (props.onOpen) {
      props.onOpen(open)
    }
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
  
            const isOutOfView =
              elementRect.bottom > dropdownRect.bottom ||
              elementRect.top < dropdownRect.top
  
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
    if (open && searchRef.current) {
      setTimeout(() => {
        searchRef.current?.focus()
      }, 0)
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

  const searchRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <S.Options 
        ref={myRef} 
        expand={props.expand} 
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)}
        }
      >
        {
          props.children
            ? props.children
            : <Button {...props} />
        }
      </S.Options>
      {
        portalContainer.current && ReactDOM.createPortal(
          <S.Dropdown 
            ref={dropdownRef} 
            style={{ visibility: 'hidden' }}
            maxWidth={props.maxWidth}
            isSelect={props.isSelect}
          >
            {
              enableSearch &&
                <S.Sticky>
                  <TextInput
                    value={search}
                    onChange={val => set_search(val)}
                    ref={searchRef}
                    canClear={search !== ''}
                    compact
                    placeholder={props.searchPlaceholder ? props.searchPlaceholder : 'Search...'}
                    autoFocus
                    backgroundColor='var(--F_Background)'
                  />
                </S.Sticky>
            }
            
            {filteredItems.map((itemProps, index) => (
              <Item
                ref={el => itemRefs.current[index] = el}
                key={index}
                {...itemProps}
                onClick={(e) => {
                  if (itemProps.onClick) {
                    itemProps.onClick(e)
                  }
                  setOpen(false)
                  if (itemRefs.current[index]) {
                    itemRefs.current[index]!.scrollIntoView({ behavior: 'auto' }) // Instant scroll
                  }
                }}
            />
            ))}
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
    backgroundColor?: string
  }>`
    position: fixed;
    z-index: 1000;
    background: var(--F_Surface);
    box-shadow: var(--F_Outline_Outset_Focus);
    border-radius: .375rem;
    overflow: hidden;
    margin-left: ${props => props.isSelect ? '-1px' : '0'};
    user-select: none;
    width: ${props => 
      props.maxWidth 
        ? props.isSelect
          ? `calc(${props.maxWidth} - 2px)` 
          : props.maxWidth
        : '110px'
    };
    max-height: 400px;  // Add max-height
    overflow-y: auto;   // Add overflow-y
    border-radius: ${props => props.isSelect ? '0 0 .375rem .375rem' : '.375rem'};
  `,
  DropdownOption: styled.div<{
    onClick: Function | null
  }>`
    display: flex;
    align-items: center;
    height: var(--F_Input_Height);
    padding: 0 .5rem;

    cursor: pointer;
    * {
      color: var(--F_Font_Color);
    }

    &:hover {
      background: var(--F_Surface_1);
      * {
        color: var(--F_Font_Color)
      }
    }
    &:active {
      background: var(--F_Surface_2);
    }
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
    top: 0;
    z-index: 1;
    background: var(--F_Surface);
    padding: .25rem;
  `
}
