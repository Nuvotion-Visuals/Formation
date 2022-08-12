import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TextInput } from './TextInput'

export default {
  title: 'Components/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>


const Template: ComponentStory<typeof TextInput> = args => {
  const [value, set_value] = useState('')
  return <TextInput 
    {...args} 
    value={value}
    onChange={newValue => set_value(newValue)}
  />
}

export const Regular = Template.bind({})
Regular.args = {
  label: 'First name',
}

export const Icon = Template.bind({})
Icon.args = {
  label: 'Email address',
  icon: 'envelope'
}

export const Error = Template.bind({})
Error.args = {
  label: 'Email address',
  icon: 'envelope',
  error: 'Error: Please use a valid email'
}

export const Success = Template.bind({})
Success.args = {
  label: 'Email address',
  icon: 'envelope',
  success: true
}

export const Tooltip = Template.bind({})
Tooltip.args = {
  label: 'Email address',
  icon: 'envelope',
  tooltip: 'Your email address is never shared with third parties.'
}


