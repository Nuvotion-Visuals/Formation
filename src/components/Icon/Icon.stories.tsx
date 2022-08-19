import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Icon } from '../../internal'

export default {
  title: 'General/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const Solid = Template.bind({})
Solid.args = {
  icon: 'heart',
  iconPrefix: 'fas'
}

export const Regular = Template.bind({})
Regular.args = {
  icon: 'heart',
  iconPrefix: 'far'
}

export const Rotate = Template.bind({})
Rotate.args = {
  icon: 'heart',
  iconPrefix: 'far',
  rotation: 90
}

