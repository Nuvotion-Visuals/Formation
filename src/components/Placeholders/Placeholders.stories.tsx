import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Placeholders } from '../../internal'

export default {
  title: 'Display/Placeholders',
  component: Placeholders,
} as ComponentMeta<typeof Placeholders>

const Template: ComponentStory<typeof Placeholders> = (args) => <Placeholders {...args} />

export const Regular = Template.bind({})
Regular.args = {
  message: 'No results'
}

Regular.parameters = {
  layout: 'fullscreen'
}