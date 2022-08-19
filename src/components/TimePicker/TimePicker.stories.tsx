import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TimePicker } from '../../internal'

export default {
  title: 'Input/TimePicker',
  component: TimePicker,
} as ComponentMeta<typeof TimePicker>


const Template: ComponentStory<typeof TimePicker> = args => {
  const [value, set_value] = useState('')
  return <TimePicker 
    {...args} 
    value={value}
    onChange={newValue => set_value(newValue)}
  />
}

export const Regular = Template.bind({})
Regular.args = {
  label: 'Time',
}