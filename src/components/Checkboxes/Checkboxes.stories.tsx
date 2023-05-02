import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Checkboxes } from '../../internal'

export default {
  title: 'Input/Checkboxes',
  component: Checkboxes,
} as ComponentMeta<typeof Checkboxes>

const Template: ComponentStory<typeof Checkboxes> = (args) => {
  const [value, setValue] = useState<string[]>([])
  return <Checkboxes 
    {...args} 
    onChange={newValue => setValue(newValue)}
    value={value}
  />
}

export const Interests = Template.bind({})
Interests.args = {
  subtitle: 'Interests',
  minimal: true,
  icon: 'user',
  iconPrefix: 'fas',
  options: [
    {
      value: 'music',
      label: 'Music',
      name: 'interests'
    },
    {
      value: 'art',
      text: 'Art',
      name: 'interests'
    },
    {
      value: 'sports',
      text: 'Sports',
      name: 'interests'
    },
    {
      value: 'technology',
      text: 'Technology',
      name: 'interests'
    },
  ]
}

export const Minimal = Template.bind({})
Minimal.args = {
  minimal: true,
  options: [
    {
      value: 'confirmation',
      label: `I confirm that I've read and understand the terms and conditions.`,
      name: 'languages'
    },
  ]
}
