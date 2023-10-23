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
  placeholder: 'First name',
}

export const Hero = Template.bind({})
Hero.args = {
  label: 'First name',
  hero: true
}

export const Email = Template.bind({})
Email.args = {
  placeholder: 'Email address',
  icon: 'envelope',
  iconPrefix: 'fas',
  type: 'email',
}

export const HeroEmail = Template.bind({})
HeroEmail.args = {
  hero: true,
  label: 'Email address',
  icon: 'envelope',
  iconPrefix: 'fas',
  type: 'email',
}

export const Phone = Template.bind({})
Phone.args = {
  placeholder: 'Phone number',
  icon: 'phone',
  iconPrefix: 'fas',
  type: 'tel',
}

export const Error = Template.bind({})
Error.args = {
  placeholder: 'Email address',
  icon: 'envelope',
  error: 'Error: Please use a valid email',
  iconPrefix: 'fas'
}

export const Success = Template.bind({})
Success.args = {
  placeholder: 'Email address',
  icon: 'envelope',
  success: true,
  iconPrefix: 'fas'
}

export const Hint = Template.bind({})
Hint.args = {
  placeholder: 'Email address',
  icon: 'envelope',
  iconPrefix: 'fas',
  hint: 'Your email address is never shared with third parties.'
}

export const NoLabel = Template.bind({})
NoLabel.args = {

}

export const Compact = Template.bind({})
Compact.args = {
  placeholder: 'Search',
  icon: 'search',
  compact: true,
  iconPrefix: 'fas',
}

export const AutoFocus = Template.bind({})
AutoFocus.args = {
  placeholder: 'First name',
  autoFocus: true
}

export const Search = Template.bind({})
Search.args = {
  compact: true,
  iconPrefix: 'fas',
  placeholder: 'Search Formation',
  canClear: true,
  buttons: [
    {
      icon: 'search',
      iconPrefix: 'fas',
      minimal: true,
    }
  ]
}

export const Ask = Template.bind({})
Ask.args = {
  compact: true,
  iconPrefix: 'fas',
  placeholder: 'Ask Lexi',
  canClear: true,
  buttons: [
    {
      icon: 'search',
      iconPrefix: 'fas',
      minimal: true,
    },
    {
      icon: 'message',
      iconPrefix: 'fas',
      minimal: true,
    }
  ]
}

