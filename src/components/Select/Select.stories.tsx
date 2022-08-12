import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Select } from './Select'

export default {
  title: 'Components/Select',
  component: Select,
} as ComponentMeta<typeof Select>


const Template: ComponentStory<typeof Select> = args => {
  const [value, set_value] = useState<string>(args.options[0])
  return <Select 
    {...args} 
    value={value} 
    onChange={newValue => set_value(newValue)} 
  />
}

export const Default = Template.bind({})
Default.args = {
  icon: 'heart',
  options: ['JavaScript', 'HTML', 'CSS']
}

export const Icon = Template.bind({})
Icon.args = {
  options: ['JavaScript', 'HTML', 'CSS']
}

