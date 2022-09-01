import React, { useState } from 'react'
import styled from 'styled-components'

import { TextInput, Button, Label, Break, Gap, Spacer, Box, LabelColorPicker } from '../../internal'

type Label = {
  name: string,
  description: string,
  color: string
}

interface Props {
  value: Label,
  onChange: (label : Label) => void,
  onClose: () => void
}

export const LabelEditor = ({ 
  value, 
  onChange,
  onClose
}: Props) => {

  return (<S.CreateLabel>
    <Box mb={.5}>
      <Label
        label={value.name ? value.name : 'Label preview'}
        color={value.color as any}
        title={value.description}
      />
    
      <Spacer />
    </Box>
  
    <Gap>
      <TextInput 
        value={value.name} 
        onChange={newValue => onChange({...value, name: newValue})}
        label={'Label Name'}
      />
      <Break />
      <TextInput 
        value={value.description} 
        onChange={newValue => onChange({...value, description: newValue})}
        label={'Description'}
      />
      <Break />
      <LabelColorPicker
        label='Color'
        value={value.color}
        onChange={newValue => onChange({...value, color: newValue})}
        options={[
          'pink',  'red', 'orange', 'purple', 'darkpurple', 'indigo', 'blue', 'lightblue', 'cyan', 'teal',
        ]}

      />
      
      </Gap>
    <Break />
    <Button
      text='Save'
    />
    <Button
      text='Cancel'
      secondary={true}
    />
    
  </S.CreateLabel>)
}

const S = {
  CreateLabel: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    padding: .5rem;
  `
}