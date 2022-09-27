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
  name: 'DJs',
  'guid': '',
  'listItems': [
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
