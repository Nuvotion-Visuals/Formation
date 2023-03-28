import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { ItemProps, Item, Button, ButtonProps, LinkContext, Link as IntLink } from '../../internal'
import { useEffect, useRef, useState } from 'react'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props extends ButtonProps{
  items: ItemProps[],
}

export const Dropdown = React.memo((props: Props) => {
  const items = props.items

  const Link: any = useContext(LinkContext) || IntLink;

  const [open, setOpen] = useState(false)

  const myRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
      if (myRef.current && !myRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [myRef])

  return (<>
    <S.Options 
      
      ref={myRef}
    >
    
          <S.IconContainer 
          onClick={() => setOpen(!open)}
          >
            
            <Button 
              {...props}
              
            />

            {
              items && open
                ? <S.Dropdown>
                    {
                      items.map(itemProps => <Item {...itemProps} />)
                    }
                  </S.Dropdown>
                : null
            }
          </S.IconContainer>
      
    </S.Options>
  </>)
})

const S = {
  Options: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
  IconContainer: styled.div`
    position: relative;
    color: var(--F_Font_Color);
  `,
  Dropdown: styled.div`
    position: absolute;
    overflow: hidden;
    z-index: 100;
    right: 0;
    min-width: 160px;
    background: var(--F_Background);
    box-shadow: var(--F_Outline_Outset_Focus);
    border-radius: .375rem;
    user-select: none;
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
  `
}
