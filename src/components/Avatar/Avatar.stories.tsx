import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Avatar } from '../../internal'

export default {
  title: 'Display/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => 
  <Avatar {...args} />


export const AutomaticColor = Template.bind({})
AutomaticColor.args = {
  name: 'Tom Leamon'
}

export const CustomColor = Template.bind({})
CustomColor.args = {
  name: 'Tom Leamon',
  color: '#c00c00'
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
  iconPrefix: 'fas'
}

export const IconNoBackground = Template.bind({})
IconNoBackground.args = {
  name: 'Tom Leamon',
  icon: 'user',
  iconPrefix: 'fas',
  color: 'none'
}