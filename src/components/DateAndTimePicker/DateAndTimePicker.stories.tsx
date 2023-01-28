import React, { useState, useEffect } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DateAndTimePicker } from '../../internal'

export default {
  title: 'Input/DateAndTimePicker',
  component: DateAndTimePicker,
} as ComponentMeta<typeof DateAndTimePicker>

const Template: ComponentStory<typeof DateAndTimePicker> = args => {
  const [value, set_value] = useState([{
    startTime: '',
    endTime: '',
    date: '',
    timeZone: ''
  }])

  useEffect(() => {
    console.log(value)
  }, [value])

  return <DateAndTimePicker 
    {...args} 
    onChange={result => {
      set_value(result)
    }}
    value={value}
  />
}
  
    
export const Default = Template.bind({})
Default.args = {
  iconPrefix: 'fas',
}

export const MultiDay = Template.bind({})
MultiDay.args = {
  iconPrefix: 'fas',
  isMultiDay: true
}
