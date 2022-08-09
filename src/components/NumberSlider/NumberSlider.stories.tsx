import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NumberSlider } from './NumberSlider'


export default {
  title: 'Formation/NumberSlider',
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

