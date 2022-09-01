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
  LabelColorPicker } from '../../internal'

import { LabelType } from '../../types'

interface Props {
  value: LabelType,
  onChange: (label : LabelType) => void,
  onClose: () => void
}

export const LabelEditor = ({ 
  value, 
  onChange,
  onClose
}: Props) => {

  const [internalValue, set_internalValue] = useState(value)

  return (<S.CreateLabel>
    <Box pb={.5}>
      <Label
        label={internalValue.name ? internalValue.name : 'Label preview'}
        color={internalValue.color as any}
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
        value={internalValue.color}
        onChange={newValue => set_internalValue({...internalValue, color: newValue})}
        options={[
          'pink',  'red', 'orange', 'purple', 'darkpurple', 'indigo', 'blue', 'lightblue', 'cyan', 'teal',
        ]}
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
      </Gap>
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