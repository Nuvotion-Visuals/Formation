import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Box } from './Box'

export default {
  title: 'Formation/Box',
  component: Box,
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = args => 
  <Box {...args} >
    test
  </Box>

export const Regular = Template.bind({})
Regular.args = {
  px: 4
}
