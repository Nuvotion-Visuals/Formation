import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LineBreak } from '../../internal'

export default {
  title: 'Layout/LineBreak',
  component: LineBreak,
} as ComponentMeta<typeof LineBreak>

const Template: ComponentStory<typeof LineBreak> = args => 
  <LineBreak />

export const Regular = Template.bind({})
Regular.args = {

}
