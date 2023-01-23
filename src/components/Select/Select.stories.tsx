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

export const Label = Template.bind({})
Label.args = {
  icon: 'chevron-down',
  iconPrefix: 'fas',
  options: ['JavaScript', 'HTML', 'CSS', 'C#', 'TypeScript', 'Python', 'Java'],
  label: 'Prefered language'
}

export const NoLabel = Template.bind({})
NoLabel.args = {
  iconPrefix: 'fas',
  options: ['JavaScript', 'HTML', 'CSS']
}

export const CustomIcon = Template.bind({})
CustomIcon.args = {
  label: 'Size',
  iconPrefix: 'fas',
  icon: 'users',
  options: ['1', '2', '3', '4'],
  maxWidth: '6rem'
}
