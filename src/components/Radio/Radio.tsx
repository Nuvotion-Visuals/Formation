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

/**
 * This component displays a Radio input field that allows the user to choose one option from many.
 * Each option displays as an Item component that can be customized with its own props. The options themselves
 * are passed in as an array of objects, each object representing one option and defining the properties of its corresponding Item.
 * By passing the 'minimal' prop, the look of the components can be simplified.
 *
 * @component
 * @param {ItemProps} props - Includes label, icon, and iconPrefix. Defines the properties of the Item.
 * @param {ItemProps[]} options - An array of objects, each one representing one radio option and defining the properties of the corresponding Item.
 * @param {string} value - The current selected value.
 * @param {function(string): void} onChange - Function to be executed when an option is selected.
 * @param {boolean} [minimal= false] - If true, simplifies the look of the component.
 *
 * @example
 * // Basic usage of Radio component with options
 * <Radio
 *   options={[
 *     { value: 'One', label: 'One'},
 *     { value: 'Two', label: 'Two'}
 *   ]}
 *   value='One'
 *   onChange={(val) => console.log(val)}
 * />
 *
 * @example
 * // Radio component with minimal appearance and customized options
 * <Radio
 *   options={[
 *     { value: 'One', label: 'One', icon: 'circle'},
 *     { value: 'Two', label: 'Two', icon: 'circle'}
 *   ]}
 *   value='One'
 *   onChange={(val) => console.log(val)}
 *   minimal
 * />
 */
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
            active={value === option.value && !minimal}
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
