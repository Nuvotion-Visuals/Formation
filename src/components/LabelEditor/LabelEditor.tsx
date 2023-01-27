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

export const LabelEditor = ({ 
  value, 
  onChange,
  onClose,
  onDelete
}: Props) => {

  const [internalValue, set_internalValue] = useState(value)

  return (<S.CreateLabel>
    <Box pb={.5}>
      <Label
        label={internalValue.name ? internalValue.name : 'Label preview'}
        labelColor={internalValue.labelColor}
        title={internalValue.description}
      />
    
      <Spacer />
    </Box>
  
    <Gap>
      <TextInput 
        value={internalValue.name} 
        onChange={newValue => set_internalValue({...internalValue, name: newValue})}
        label={'Label Name'}
      />
      <Break />
      <TextInput 
        value={internalValue.description} 
        onChange={newValue => set_internalValue({...internalValue, description: newValue})}
        label={'Description'}
      />
      <Break />
      <LabelColorPicker
        label='Color'
        value={internalValue.labelColor}
        onChange={newValue => set_internalValue({...internalValue, labelColor: newValue})}
        options={labelColors}
      />
      <Box mt={.125} width='100%'>
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
      </Box>
    </Gap>
    
    
  </S.CreateLabel>)
}

const S = {
  CreateLabel: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    
  `
}