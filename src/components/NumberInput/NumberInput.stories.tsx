import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NumberInput } from '../../internal'


export default {
  title: 'Input/NumberInput',
  component: NumberInput,
} as ComponentMeta<typeof NumberInput>

const Template: ComponentStory<typeof NumberInput> = (args) => {
  const [value, setValue] = useState<number>(args.value)
  return <NumberInput 
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

export const Step = Template.bind({})
Step.args = {
  min: 0,
  max: 100,
  value: 50,
  step: .5
}

