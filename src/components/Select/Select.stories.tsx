import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Select } from '../../internal'

export default {
  title: 'Input/Select',
  component: Select,
} as ComponentMeta<typeof Select>


const Template: ComponentStory<typeof Select> = args => {
  const [value, set_value] = useState<string>('')
  return <Select 
    {...args} 
    value={value} 
    onChange={newValue => set_value(newValue)} 
  />
}

export const Default = Template.bind({})
Default.args = {
  icon: 'heart',
  options: ['JavaScript', 'HTML', 'CSS', 'C#', 'TypeScript', 'Python', 'Java'],
  label: 'Prefered language'
}

export const Icon = Template.bind({})
Icon.args = {
  options: ['JavaScript', 'HTML', 'CSS']
}

