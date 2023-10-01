import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NumberRange } from '../../internal'


export default {
  title: 'Input/NumberRange',
  component: NumberRange,
} as ComponentMeta<typeof NumberRange>

const Template: ComponentStory<typeof NumberRange> = (args) => {
  const [value, setValue] = useState<number[]>(args.value)
  return <NumberRange 
    {...args} 
    onChange={newValue => setValue(newValue)}
    value={value}
  />
}

export const Default = Template.bind({})
Default.args = {
  min: 0,
  max: 100,
  value: [25, 75]
}

export const Precise = Template.bind({})
Precise.args = {
  min: 0,
  max: 100,
  value: [25, 75],
  precise: true
}

