import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NumberSlider } from '../../internal'

export default {
  title: 'Input/NumberSlider',
  component: NumberSlider,
} as ComponentMeta<typeof NumberSlider>

const Template: ComponentStory<typeof NumberSlider> = (args) => {
  const [value, setValue] = useState<number>(args.value)
  return <NumberSlider 
    {...args} 
    onChange={newValue => setValue(newValue)}
    value={value}
  />
}

export const Default = Template.bind({})
Default.args = {
  min: 0,
  max: 100,
  value: 50
}

export const Precise = Template.bind({})
Precise.args = {
  min: 0,
  max: 100,
  value: 50,
  precise: true
}

export const Hue = Template.bind({})
Hue.args = {
  min: 0,
  max: 100,
  value: 50,
  precise: true,
  type: 'hue'
}

export const opacity = Template.bind({})
opacity.args = {
  min: 0,
  max: 100,
  value: 50,
  precise: true,
  type: 'opacity'
}

export const Color = Template.bind({})
Color.args = {
  min: 0,
  max: 100,
  value: 50,
  precise: true,
  color: 'green'
}

