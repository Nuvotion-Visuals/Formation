import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React from 'react'
import styled from 'styled-components'

import { Icon, Box, LineBreak, Gap, Item, ItemProps } from '../../internal'

interface Props {
  label?: string,
  options: ItemProps[],
  icon: IconName,
  iconPrefix: IconPrefix,
  value: string,
  onChange: (arg0: string) => void
}

export const Radio = ({ options, value, onChange, label, icon, iconPrefix } : Props) => {
  return <S.Radio><Box wrap width='100%'>
    {
      (icon || label) &&
      <Box width={'100%'} pl={.75} my={.5}>
        <Gap gap={.75}>
          {
            icon && <Icon icon={icon} iconPrefix={iconPrefix} />
          }

          {
            label && <S.Label>{ label }</S.Label>
          }
        </Gap>
      </Box>
    }
    <LineBreak light />
    
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
        <LineBreak light />
        </S.OptionLabel>
      )
    }
  </Box></S.Radio>
}

const S = {
  Radio: styled.div`
    width: 100%;
    display: flex;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: var(--F_Outline_Outset);
    &:hover {
      label {
        color: var(--F_Font_Color);
      }
      box-shadow: var(--F_Outline_Outset_Hover);
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
