import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Avatar } from '../../internal'

export default {
  title: 'Display/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => 
  <Avatar {...args} />


export const LabelColor = Template.bind({})
LabelColor.args = {
  name: 'Tom Leamon',
  labelColor: 'red'
}

export const Image = Template.bind({})
Image.args = {
  name: 'Tom Leamon',
  src: 'https://api.avsync.live/uploads/avsync_logo_border_45b816cca1.png'
}

export const Icon = Template.bind({})
Icon.args = {
  name: 'Tom Leamon',
  icon: 'user',
  iconPrefix: 'fas',
  labelColor: 'blue'
}

export const IconNoLabelColor = Template.bind({})
IconNoLabelColor.args = {
  name: 'Tom Leamon',
  icon: 'user',
  iconPrefix: 'fas',
  colorLabel: 'none'
}