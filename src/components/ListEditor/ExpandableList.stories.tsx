import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ExpandableList } from './ExpandableList'

export default {
  title: 'Lists/ExpandableList',
  component: ExpandableList,
} as ComponentMeta<typeof ExpandableList>

const Template: ComponentStory<typeof ExpandableList> = args => 
  <ExpandableList {...args} />

export const Regular = Template.bind({})
Regular.args = {
  'title': '🎧 DJs',
  'guid': '',
  'listItems': [
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
