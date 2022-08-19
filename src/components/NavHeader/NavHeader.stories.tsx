import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NavHeader } from '../../internal'

export default {
  title: 'Navigation/NavHeader',
  component: NavHeader,
} as ComponentMeta<typeof NavHeader>

const Template: ComponentStory<typeof NavHeader> = (args) => <NavHeader {...args} />

export const Regular = Template.bind({})
Regular.args = {
  
}
Regular.parameters = {
  layout: 'fullscreen'
}