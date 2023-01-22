import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Progress } from '../../internal'

export default {
  title: 'Display/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />

export const Small = Template.bind({})
Small.args = {
  maximum: 10,
  value: 1,
}

export const Regular = Template.bind({})
Regular.args = {
  small: undefined,
  maximum: 10,
  value: 1,
}

export const SmallGradient = Template.bind({})
Regular.args = {
  small: true,
  gradient: true,
  maximum: 10,
  value: 1,
}

export const RegularGradient = Template.bind({})
Regular.args = {
  gradient: true,
  maximum: 10,
  value: 1,
}
