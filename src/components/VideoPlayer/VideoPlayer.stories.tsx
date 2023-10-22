import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { VideoPlayer } from '../../internal'

export default {
  title: 'Players/VideoPlayer',
  component: VideoPlayer,
} as ComponentMeta<typeof VideoPlayer>

const Template: ComponentStory<typeof VideoPlayer> = args => 
  <VideoPlayer {...args} />

export const Default = Template.bind({})
Default.args = {
  src: '/video/datamosh.mp4',
  name: 'datamosh'
}

export const Autoplay = Template.bind({})
Autoplay.args = {
  src: '/video/datamosh.mp4',
  autoplay: true,
  name: 'datamosh'
}

export const Loop = Template.bind({})
Loop.args = {
  src: '/video/datamosh.mp4',
  autoplay: true,
  loop: true,
  name: 'datamosh'
}
