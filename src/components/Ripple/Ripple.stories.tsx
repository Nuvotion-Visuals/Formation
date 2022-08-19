import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Ripple } from '../../internal'

export default {
  title: 'Misc/Ripple',
  component: Ripple,
} as ComponentMeta<typeof Ripple>

const Template: ComponentStory<typeof Ripple> = (args) => <Ripple />

export const Default = Template.bind({})
Default.args = {
  
}
