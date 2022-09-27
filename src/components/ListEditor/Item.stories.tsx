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
  name: 'DJ SKoli',
  options: [
    {
      icon: 'ellipsis-v',
      iconPrefix: 'fas',
      dropDownOptions: 
        [
          {
            icon: 'user',
            iconPrefix: 'fas',
            text: 'View profile'
          },
          {
            icon: 'paper-plane',
            text: 'Message',
          },
          {
            icon: 'handshake-angle',
            iconPrefix: 'fas',
            text: 'Set status'
          },
          {
            icon: 'trash-alt',
            text: 'Trash',
          },
        ] 
    }
  ]
}
Regular.parameters = {
  layout: 'fullscreen'
}
