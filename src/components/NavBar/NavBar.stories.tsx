import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NavBar } from './NavBar'

export default {
  title: 'Navigation/NavBar',
  component: NavBar,
} as ComponentMeta<typeof NavBar>

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />

export const Regular = Template.bind({})
Regular.args = {
  
}
Regular.parameters = {
  layout: 'fullscreen'
}