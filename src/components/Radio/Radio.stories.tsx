import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Radio } from '../../internal'


export default {
  title: 'Input/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>

const Template: ComponentStory<typeof Radio> = (args) => {
  const [value, setValue] = useState<string>(args.value)
  return <Radio 
    {...args} 
    onChange={newValue => setValue(newValue)}
    value={value}
  />
}

export const Default = Template.bind({})
Default.args = {
  options: [
    {
      value: 'Option 1',
      name: 'Option 1'
    },
    {
      value: 'Option 2',
      name: 'Option 2'
    },
    {
      value: 'Option 3',
      name: 'Option 3'
    }
  ]
}

