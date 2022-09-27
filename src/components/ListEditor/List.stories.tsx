import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { List } from './List'

export default {
  title: 'Lists/List',
  component: List,
} as ComponentMeta<typeof List>

const Template: ComponentStory<typeof List> = args => 
  <List {...args} />

export const Regular = Template.bind({})
Regular.args = {
  'list': [
    {
      name: 'DJ SKoli',
      'avatar': false
    },
    {
      name: 'King Spookey',
      'avatar': false
    },
    {
      name: 'Subsus',
      'avatar': false
    }
  ]
}
Regular.parameters = {
  layout: 'fullscreen'
}
