import React from 'react'
import styled from 'styled-components'

import { Icon } from '../../internal'
import { useEffect, useRef, useState } from 'react'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

type DropDownOption = {
  icon: IconName,
  iconPrefix?: IconPrefix,
  hmyRef?: string,
  onClick?: Function,
  text: string,
}

type Option = {
  icon: IconName,
  iconPrefix?: IconPrefix,
  hmyRef?: string,
  onClick?: Function,
  dropDownOptions?: DropDownOption[]
}

export type OptionsType = Option[]

interface Props {
  options: OptionsType
}

export const Dropdown = React.memo(({ options }: Props) => {
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
      onClick={(e) => {
        e.stopPropagation()
        setOpen(!open)
      }}
      ref={myRef}
    >
      {
        options.map((option, index) => (
          <S.IconContainer 
            key={index}
            onClick={
              option.onClick 
                ? option.dropDownOptions
                    ? () => {
                        if (option?.onClick) {
                          option.onClick()
                        }
                        setOpen(!open)
                      }
                    : () => option.onClick  && option.onClick()
                : option.dropDownOptions
                    ? () => setOpen(!open)
                    : () => {}
            }
          >
            <S.IconCircle open={open}>
              <Icon icon={option.icon} iconPrefix={option.iconPrefix} />
            </S.IconCircle>

            {
              option.dropDownOptions && open
                ? <S.Dropdown>
                    {
                      option.dropDownOptions.map((dropDownOption, index) => (
                        <S.DropdownOption
                          key={index}
                          onClick={() => dropDownOption.onClick && dropDownOption.onClick()}
                        > 
                          <S.IconSpacer>
                            <Icon fixedWidth={true} icon={dropDownOption.icon} iconPrefix={dropDownOption.iconPrefix} />
                          </S.IconSpacer>
                          <S.DropDownText>{ dropDownOption.text } </S.DropDownText>
                          
                        </S.DropdownOption>
                      ))
                    }
                  </S.Dropdown>
                : null
            }
          </S.IconContainer>
        ))
      }
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
  IconContainer: styled.div<{
    onClick: Function | null
  }>`
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
