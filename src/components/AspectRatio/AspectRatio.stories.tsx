import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../Button/Button'
import { AspectRatio } from './AspectRatio'

export default {
  title: 'Formation/AspectRatio',
  component: AspectRatio,
} as ComponentMeta<typeof AspectRatio>

const Template: ComponentStory<typeof AspectRatio> = args => 
  <AspectRatio {...args}>
    <Button text='Click me' />
  </AspectRatio>


export const Regular = Template.bind({})
Regular.args = {
  aspectRatio: 16/9
}
