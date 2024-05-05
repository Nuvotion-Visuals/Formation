import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LoadingSpinner } from '../../internal'

export default {
  title: 'General/LoadingSpinner',
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>

const Template: ComponentStory<typeof LoadingSpinner> = (args) => <LoadingSpinner {...args} />

export const Default = Template.bind({})
Default.args = {
  
}

export const Compact = Template.bind({})
Compact.args = {
  compact: true
}

export const Custom = Template.bind({})
Custom.args = {
  size: '64px'
}
