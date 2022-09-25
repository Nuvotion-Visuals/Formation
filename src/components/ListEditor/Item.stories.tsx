import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Item } from './Item'

export default {
  title: 'Lists/Item',
  component: Item,
} as ComponentMeta<typeof Item>

const Template: ComponentStory<typeof Item> = args => 
  <Item {...args} />

export const Regular = Template.bind({})
Regular.args = {
  'title': 'DJ SKoli',
  'avatar': false
}
Regular.parameters = {
  layout: 'fullscreen'
}
