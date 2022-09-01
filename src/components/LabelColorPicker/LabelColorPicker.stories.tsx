import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LabelColorPicker } from './LabelColorPicker'

export default {
  title: 'Input/LabelColorPicker',
  component: LabelColorPicker,
} as ComponentMeta<typeof LabelColorPicker>


const Template: ComponentStory<typeof LabelColorPicker> = args => {
  const [value, set_value] = useState<string>('red')
  return <LabelColorPicker 
    {...args} 
    value={value} 
    onChange={newValue => set_value(newValue)} 
  />
}

export const Default = Template.bind({})
Default.args = {
  options: [
    'pink',  'red', 'orange', 'purple', 'darkpurple', 'indigo', 'blue', 'lightblue', 'cyan', 'teal',
  ],
  label: 'Label color'
}


