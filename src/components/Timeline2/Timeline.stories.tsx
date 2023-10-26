import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Timeline } from './Timeline'

export default {
  title: 'Timeline/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>


const Template: ComponentStory<typeof Timeline> = args => {
  return <Timeline 
    {...args} 
  />
}

export const Default = Template.bind({})
Default.args = {
  label: 'Time',
  iconPrefix: 'fas'
}