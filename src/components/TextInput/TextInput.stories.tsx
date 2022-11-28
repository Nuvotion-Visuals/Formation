import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TextInput } from '../../internal'

export default {
  title: 'Input/TextInput',
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
  icon: 'envelope',
  iconPrefix: 'fas'
}

export const Error = Template.bind({})
Error.args = {
  label: 'Email address',
  icon: 'envelope',
  error: 'Error: Please use a valid email',
  iconPrefix: 'fas'
}

export const Success = Template.bind({})
Success.args = {
  label: 'Email address',
  icon: 'envelope',
  success: true,
  iconPrefix: 'fas'
}

export const Tooltip = Template.bind({})
Tooltip.args = {
  label: 'Email address',
  icon: 'envelope',
  iconPrefix: 'fas',
  tooltip: 'Your email address is never shared with third parties.'
}

export const NoLabel = Template.bind({})
NoLabel.args = {

}

