import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AudioPlayer } from '../../internal'

export default {
  title: 'Players/AudioPlayer',
  component: AudioPlayer,
} as ComponentMeta<typeof AudioPlayer>

const Template: ComponentStory<typeof AudioPlayer> = args => 
  <AudioPlayer {...args} />

export const Default = Template.bind({})
Default.args = {
  src: '/audio/Holding On - Ennio Gallucci.mp3',
  name: 'Holding On - Ennio Gallucci'
}
