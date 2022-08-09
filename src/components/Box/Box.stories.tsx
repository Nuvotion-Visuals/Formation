import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../Button/Button'
import { Box } from './Box'

export default {
  title: 'Formation/Box',
  component: Box,
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = args => 
  <Box {...args}>
    <Button text='Click me' />
  </Box>


export const Regular = Template.bind({})
Regular.args = {

}
