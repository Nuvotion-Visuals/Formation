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
  text: string
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
            onClickHandler={
              option.onClick 
                ? option.dropDownOptions
                    ? () => {
                        if (option?.onClick) {
                          option.onClick()
                        }
                        setOpen(!open)
                      }
                    : option.onClick 
                : option.dropDownOptions
                    ? () => setOpen(!open)
                    : null
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
                          onClickHandler={
                            dropDownOption.onClick 
                              ? dropDownOption.onClick 
                              : null
                          }
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

interface IconContainerProps {
  onClickHandler: Function | null
}

interface IconCircleProps {
  open: boolean,
}

interface DropdownOptionType {
  onClickHandler: Function | null
}

const S = {
  Options: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `,
  IconCircle: styled.div<IconCircleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.open ? 'var(--Surface)' : 'none'};
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    cursor: pointer;

    &:hover {
      background: var(--Surface);
    }
  `,
  IconContainer: styled.div<IconContainerProps>`
    position: relative;
    color: var(--Font_Color_Label);
  `,
  Dropdown: styled.div`
    position: absolute;
    overflow: hidden;
    z-index: 100;
    right: 0;
    min-width: 140px;
    background: var(--Background);
    box-shadow: var(--Outline);
    border-radius: .5rem;
    user-select: none;
  `,
  DropdownOption: styled.div<DropdownOptionType>`
    display: flex;
    align-items: center;
    padding: .75rem;
    cursor: pointer;

    &:hover {
      background: var(--Surface_1);
      * {
        color: var(--Font_Color)
      }
    }
    &:active {
      background: var(--Surface_2);
    }
  `,
  IconSpacer: styled.div`
    width: 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
  `,
  DropDownText: styled.div`
    padding-left: .5rem;
    font-size: var(--Font_Size);
    display: flex;
  `
}
