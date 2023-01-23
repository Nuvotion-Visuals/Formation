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

export const Email = Template.bind({})
Email.args = {
  label: 'Email address',
  icon: 'envelope',
  iconPrefix: 'fas',
  type: 'email',
}

export const Phone = Template.bind({})
Phone.args = {
  label: 'Phone number',
  icon: 'phone',
  iconPrefix: 'fas',
  type: 'tel',
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

export const Hint = Template.bind({})
Hint.args = {
  label: 'Email address',
  icon: 'envelope',
  iconPrefix: 'fas',
  hint: 'Your email address is never shared with third parties.'
}

export const NoLabel = Template.bind({})
NoLabel.args = {

}

export const Compact = Template.bind({})
Compact.args = {
  label: 'Search',
  icon: 'search',
  compact: true,
  iconPrefix: 'fas',
  placeholder: 'Search'
}

export const AutoFocus = Template.bind({})
AutoFocus.args = {
  label: 'First name',
  autoFocus: true
}