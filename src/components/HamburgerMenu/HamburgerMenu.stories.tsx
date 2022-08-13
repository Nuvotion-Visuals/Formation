import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { HamburgerMenu } from './HamburgerMenu'

export default {
  title: 'Navigation/HamburgerMenu',
  component: HamburgerMenu,
} as ComponentMeta<typeof HamburgerMenu>

const Template: ComponentStory<typeof HamburgerMenu> = (args) => <HamburgerMenu {...args} />

export const Regular = Template.bind({})
Regular.args = {
  onClick: () => alert('clicked')
}
Regular.parameters = {
  layout: 'fullscreen'
}