import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ListItem } from '../../internal'

export default {
  title: 'Lists/ListItem',
  component: ListItem,
} as ComponentMeta<typeof ListItem>

const Template: ComponentStory<typeof ListItem> = args => 
  <ListItem {...args} />

export const Regular = Template.bind({})
Regular.args = {
  title: 'Artists',
  listItems: [
    {
      'title': 'DJ SKoli',
      'avatar': false
    },
    {
      'title': 'King Spookey',
      'avatar': false
    },
    {
      'title': 'Subsus',
      'avatar': false
    }
  ]
}
Regular.parameters = {
  layout: 'fullscreen'
}
