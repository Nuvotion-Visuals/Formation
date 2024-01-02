import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Envelope } from '../../internal'

export default {
  title: 'Input/Envelope',
  component: Envelope,
} as ComponentMeta<typeof Envelope>

const Template: ComponentStory<typeof Envelope> = args => 
  <Envelope {...args} />
  

export const Default = Template.bind({})
Default.args = {

}
