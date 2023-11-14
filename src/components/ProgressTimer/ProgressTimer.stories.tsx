import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AspectRatio, Box, ProgressTimer } from '../../internal'

export default {
  title: 'Display/ProgressTimer',
  component: ProgressTimer,
} as ComponentMeta<typeof ProgressTimer>

const Template: ComponentStory<typeof ProgressTimer> = (args) => 
  <Box width={8}>
    <AspectRatio ratio={16/9}>
      <ProgressTimer {...args} />
    </AspectRatio>
  </Box>
 

export const Default = Template.bind({})
Default.args = {
  duration: 5
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
  duration: 5,
  indeterminate: true
}

export const OnComplete = Template.bind({})
OnComplete.args = {
  duration: 5,
  onComplete: () => alert('Complete')
}