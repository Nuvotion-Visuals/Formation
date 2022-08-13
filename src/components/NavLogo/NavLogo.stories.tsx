import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NavLogo } from './NavLogo'

export default {
  title: 'Navigation/NavLogo',
  component: NavLogo,
} as ComponentMeta<typeof NavLogo>

const Template: ComponentStory<typeof NavLogo> = (args) => <NavLogo {...args} />

export const Regular = Template.bind({})
Regular.args = {
  src: 'logo-white.svg'
}
Regular.parameters = {
  layout: 'fullscreen'
}