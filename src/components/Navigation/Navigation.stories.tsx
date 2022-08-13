import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Navigation } from './Navigation'

export default {
  title: 'Navigation/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => <Navigation {...args} />

export const Regular = Template.bind({})
Regular.args = {
  
}
Regular.parameters = {
  layout: 'fullscreen'
}