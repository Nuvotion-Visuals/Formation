import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Empty } from '../../internal'
import { AspectRatio } from '../../internal'

export default {
  title: 'Layout/Empty',
  component: Empty,
} as ComponentMeta<typeof Empty>

const Template: ComponentStory<typeof Empty> = args => 
<AspectRatio ratio={16/9}>
  <Empty {...args}>

  </Empty>
</AspectRatio>
  

export const Default = Template.bind({})
Default.args = {

}
