import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Icon } from './Icon'

export default {
  title: 'Formation/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const Solid = Template.bind({})
Solid.args = {
  icon: 'heart',
  prefix: 'fas'
}

export const Regular = Template.bind({})
Regular.args = {
  icon: 'heart',
  prefix: 'far'
}

export const Rotate = Template.bind({})
Rotate.args = {
  icon: 'heart',
  prefix: 'far',
  rotate: true
}

