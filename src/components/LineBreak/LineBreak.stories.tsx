import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LineBreak } from './LineBreak'

export default {
  title: 'Layout/LineBreak',
  component: LineBreak,
} as ComponentMeta<typeof LineBreak>


const Template: ComponentStory<typeof LineBreak> = args => {
  
  return <LineBreak 
    {
      ...args
    }
  />
}

export const Default = Template.bind({})
Default.args = {
  
}

export const Light = Template.bind({})
Light.args = {
  light: true
}

export const Color = Template.bind({})
Color.args = {
  color: 'red'
}


