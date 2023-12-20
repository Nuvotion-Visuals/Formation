import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Box } from '../../internal'
import { Empty } from '../../internal'
import { AspectRatio } from '../../internal'

export default {
  title: 'Layout/Box',
  component: Box,
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = args => 
  <Box {...args} width='300px'>
    <AspectRatio ratio={1}>
      <Empty />
    </AspectRatio>
  </Box>


export const Regular = Template.bind({})
Regular.args = {

}

export const WithCustomTag = Template.bind({})
WithCustomTag.args = {
  tag: 'section'
}