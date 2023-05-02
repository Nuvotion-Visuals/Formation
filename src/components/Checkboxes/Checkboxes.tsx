import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Icon, Box, LineBreak, Gap, Item, ItemProps } from '../../internal'

interface Props extends ItemProps {
  options: ItemProps[],
  value: string[],
  onChange: (arg0: string[]) => void,
  minimal?: boolean
} 

export const Checkboxes = (props : Props) => {
  const { options, value, onChange, label, icon, iconPrefix, minimal } = props

  const handleClick = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(val => val !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return <S.Checkboxes minimal={minimal || false}><Box wrap width='100%'>
    {
      (icon || label) &&
      <Item
        label={label} icon={icon} iconPrefix={iconPrefix}
        {
          ...props
        }
      />
    }

    { !minimal && <LineBreak light />}
    
    {
      options.map((option, index) => 
      <S.OptionLabel htmlFor={option.name}>
          <Item 
            {
              ...option
            }
            onClick={() => handleClick(option.value || '')}
            name={undefined}
            icon={
              option.icon 
                ? option.icon 
                : value?.includes(option.value)
                  ? 'check-square'
                  : 'square'
            }
            iconPrefix={
              option.iconPrefix
                ? option.iconPrefix
                : 'far'
            }
          />
          <div style={{ display: 'none'}}>
            <input 
              type="checkbox" 
              id={option.name} 
              name={option.name} 
              value={option.value} 
            />
          </div>
          { !minimal && <LineBreak light />}
        </S.OptionLabel>
      )
    }
  </Box></S.Checkboxes>
}

const S = {
  Checkboxes: styled.div<{
    minimal: boolean
  }>`
    width: 100%;
    display: flex;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: ${props => props.minimal ? 'none' : 'var(--F_Outline_Outset)'};
    &:hover {
    
      box-shadow: ${props => props.minimal ? 'none' : 'var(--F_Outline_Outset_Hover)'};
    }
  `,
  OptionLabel: styled.label`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

  `,
  Label: styled.label`
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color_Label);
    pointer-events: none;
  `,
}
