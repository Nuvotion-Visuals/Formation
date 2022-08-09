import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TransparentBackground } from './TransparentBackground'
import { AspectRatio } from '../AspectRatio/AspectRatio'

export default {
  title: 'Formation/TransparentBackground',
  component: TransparentBackground,
} as ComponentMeta<typeof TransparentBackground>

const Template: ComponentStory<typeof TransparentBackground> = args => 
<AspectRatio ratio={16/9}>
  <TransparentBackground {...args}>

  </TransparentBackground>
</AspectRatio>
  

export const Default = Template.bind({})
Default.args = {

}
