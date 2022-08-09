import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NumberRange } from './NumberRange'


export default {
  title: 'Formation/NumberRange',
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

export const Info = Template.bind({})
Info.args = {
  min: 0,
  max: 100,
  value: [25, 75]
}

