import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../Button/Button'
import { Box } from './Box'
import { TransparentBackground } from '../TransparentBackground/TransparentBackground'
import { AspectRatio } from '../AspectRatio/AspectRatio'

export default {
  title: 'Formation/Box',
  component: Box,
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = args => 
  <Box {...args} width='300px'>
    <AspectRatio ratio={1}>
      <TransparentBackground />
    </AspectRatio>
  </Box>


export const Regular = Template.bind({})
Regular.args = {

}
