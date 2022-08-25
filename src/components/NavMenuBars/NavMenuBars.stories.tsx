import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NavMenuBars } from '../../internal'

export default {
  title: 'Navigation/NavMenuBars',
  component: NavMenuBars,
} as ComponentMeta<typeof NavMenuBars>

const Template: ComponentStory<typeof NavMenuBars> = (args) => <NavMenuBars {...args} />

export const Regular = Template.bind({})
Regular.args = {
  onClick: () => alert('clicked')
}
Regular.parameters = {
  layout: 'fullscreen'
}