import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../Button/Button'
import { Box } from './Box'
import { Empty } from '../Empty/Empty'
import { AspectRatio } from '../AspectRatio/AspectRatio'

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
