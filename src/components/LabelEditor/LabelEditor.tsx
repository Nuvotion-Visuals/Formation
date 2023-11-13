import React, { useState } from 'react'
import styled from 'styled-components'

import { 
  TextInput, 
  Button, 
  Label, 
  Break, 
  Gap, 
  Spacer, 
  Box, 
  LabelColorPicker,
  LabelType,
  labelColors
} from '../../internal'


interface Props {
  value: LabelType,
  onChange: (label : LabelType) => void,
  onClose: () => void,
  onDelete?: () => void
}

/**
 * `LabelEditor` is a component that provides an interface for creating or editing a label. It allows users to input a name, 
 * description, and select a label color. It has options to save the new label configuration, cancel the edit, or delete the label.
 *
 * @component
 * @param {LabelType} value - The current label object with properties like name, description, and labelColor.
 * @param {function} onChange - Callback function to be called with the updated label object when changes are saved.
 * @param {function} onClose - Callback function to be called when the editor is closed without saving.
 * @param {function} [onDelete] - Optional callback function to be called when the label is deleted.
 *
 * @example
 * // Example usage of LabelEditor for editing a label
 * <LabelEditor
 *   value={currentLabel}
 *   onChange={updatedLabel => console.log(updatedLabel)}
 *   onClose={() => console.log('Editor closed')}
 *   onDelete={() => console.log('Label deleted')}
 * />
 */
export const LabelEditor = ({ 
  value, 
  onChange,
  onClose,
  onDelete
}: Props) => {

  const [internalValue, set_internalValue] = useState(value)

  return (<S.CreateLabel>
      <Label
        label={internalValue.name ? internalValue.name : 'Label preview'}
        labelColor={internalValue.labelColor}
        title={internalValue.description}
      />
  
    <Gap>
      <TextInput 
        value={internalValue.name} 
        onChange={newValue => set_internalValue({...internalValue, name: newValue})}
        label={'Label Name'}
        hero
      />
      <TextInput 
        value={internalValue.description} 
        onChange={newValue => set_internalValue({...internalValue, description: newValue})}
        label={'Description'}
        hero
      />
      <LabelColorPicker
        label='Color'
        value={internalValue.labelColor}
        onChange={newValue => set_internalValue({...internalValue, labelColor: newValue})}
        options={labelColors}
      />
      <Gap>
        <Button
          text='Save'
          onClick={() => {
            onClose()
            onChange(internalValue)
          }}
          disabled={internalValue.name === ''}
        />
        <Button
          text='Cancel'
          secondary={true}
          onClick={onClose}
        />
        <Spacer />
        {
          onDelete
            ? <Button
                text='Delete'
                icon='trash-alt'
                iconPrefix='fas'
                secondary={true}
                onClick={onClose}
              />
            : null
        }
      </Gap>
    </Gap>
    
    
  </S.CreateLabel>)
}

const S = {
  CreateLabel: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    
  `
}