import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Location } from './Location'

export default {
  title: 'Input/Location',
  component: Location,
} as ComponentMeta<typeof Location>

const Template: ComponentStory<typeof Location> = (args) => <Location {...args} />

export const Regular = Template.bind({})
Regular.args = {
  
}