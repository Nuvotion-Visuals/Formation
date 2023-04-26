import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React from 'react'
import styled from 'styled-components'

import { Icon, Box, LineBreak, Gap, Item, ItemProps } from '../../internal'

interface Props extends ItemProps {
  options: ItemProps[],
  value: string,
  onChange: (arg0: string) => void,
  minimal?: boolean
} 

export const Radio = (props : Props) => {
  const { options, value, onChange, label, icon, iconPrefix, minimal } = props

  return <S.Radio minimal={minimal || false}><Box wrap width='100%'>
    {
      (icon || label) &&
      <Item
        label={label} icon={icon} iconPrefix={iconPrefix}
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
            onClick={() => onChange(option.value || '')}
            active={value === option.value}
            name={undefined}
            icon={
              option.icon 
                ? option.icon 
                : value === option.value 
                  ? 'circle-dot'
                  : 'circle'
            }
            iconPrefix={
              option.iconPrefix
                ? option.iconPrefix
                : 'far'
            }
          />
          <div style={{ display: 'none'}}>
            <input 
              type="radio" 
              id={option.name} 
              name={option.name} 
              value={option.value} 
            />
          </div>
          { !minimal && <LineBreak light />}
        </S.OptionLabel>
      )
    }
  </Box></S.Radio>
}

const S = {
  Radio: styled.div<{
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
