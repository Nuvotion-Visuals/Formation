import React, { useState } from 'react'
import { Meta, ComponentStory, ComponentMeta } from '@storybook/react'

import { Box, Select } from '../../internal' 

export default {
  title: 'Input/Select',
  component: Select,
} as ComponentMeta<typeof Select>


const Template: ComponentStory<typeof Select> = args => {
  const [value, setValue] = useState('option1')
  return (
    <>
      <Box mb={.5}>
        Value: {value}
      </Box>
      <Select {...args} value={value} onChange={val => setValue(val) }/>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  value: 'option1',
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ],
  onChange: (val) => console.log('Changed value:', val),
  compact: true
}

export const SecondaryIcon = Template.bind({})
SecondaryIcon.args = {
  value: 'option1',
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ],
  onChange: (val) => console.log('Changed value:', val),
  compact: true,
  secondaryIcon: 'chevron-down'
}

export const AllowDirectEntry = Template.bind({})
AllowDirectEntry.args = {
  value: 'option2',
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ],
  onChange: (val) => console.log('Changed value:', val),
  compact: true,
  allowDirectEntry: true
}
