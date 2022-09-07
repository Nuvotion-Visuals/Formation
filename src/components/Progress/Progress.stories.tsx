import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Progress } from '../../internal'

export default {
  title: 'Displays/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />

export const Small = Template.bind({})
Small.args = {
    small: true
}

export const Regular = Template.bind({})
Regular.args = {
    small: false
}
