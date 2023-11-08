import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Box, Button } from '../../internal'
import { Gap } from '../../internal'

export default {
  title: 'Layout/Gap',
  component: Gap,
} as ComponentMeta<typeof Gap>

const Template: ComponentStory<typeof Gap> = args => 
  <Gap {...args}>
    <Button text='Click me' />
    <Button text='Click me' />
    <Button text='Click me' />
    <Button text='Click me' />
  </Gap>


export const Default = Template.bind({})
Default.args = {

}

export const LargerGap = Template.bind({})
LargerGap.args = {
  gap: 1
}

const TemplateWithBox: ComponentStory<typeof Gap> = args => 
  <Box width={30}>
    <Gap {...args}>
      <Button text='Click me' />
      <Button text='Click me' />
      <Button text='Click me' />
      <Button text='Click me' />
      <Button text='Click me' />
      <Button text='Click me' />
      <Button text='Click me' />
    </Gap>
  </Box>

export const Center = TemplateWithBox.bind({})
Center.args = {
  center: true
}