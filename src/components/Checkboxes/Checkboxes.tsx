import React from 'react'
import styled from 'styled-components'

import { Box, LineBreak, Item, ItemProps } from '../../internal'

// @ts-ignore
interface Props extends ItemProps {
  options: ItemProps[],
  value: string[],
  onChange: (arg0: string[]) => void,
  minimal?: boolean
} 

/**
 * `Checkboxes` is a component that renders a list of checkbox options. Each checkbox can be individually selected or deselected, 
 * and the overall state of selected options is managed via the `onChange` callback. The component can also be styled minimally.
 *
 * @component
 * @param {ItemProps[]} options - An array of objects representing each checkbox option.
 * @param {string[]} value - An array of strings representing the currently selected values.
 * @param {function} onChange - Callback function that is invoked when the selection changes, with the new selection array as an argument.
 * @param {string} [label] - A label for the checkbox group.
 * @param {IconName} [icon] - An icon to be displayed next to the label.
 * @param {IconPrefix} [iconPrefix] - The prefix to be used for the FontAwesome icons.
 * @param {boolean} [minimal] - If true, renders the checkboxes without any additional styling or line breaks.
 *
 * @example
 * // Checkboxes with pre-selected values and a callback to handle changes
 * <Checkboxes
 *   options={[
 *     { label: 'Option 1', value: 'opt1' },
 *     { label: 'Option 2', value: 'opt2' }
 *   ]}
 *   value={['opt1']}
 *   onChange={newValues => console.log(newValues)}
 * />
 */
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
        // @ts-ignore
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
      <S.OptionLabel 
        key={index}
        htmlFor={option.name}
      >
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
