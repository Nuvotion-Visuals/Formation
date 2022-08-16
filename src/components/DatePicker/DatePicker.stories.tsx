import React, { useState, useEffect } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DatePicker } from './DatePicker'

export default {
  title: 'Input/DatePicker',
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = args => {
  const [value, set_value] = useState(new Date)

  useEffect(() => {
    console.log(value)
  }, [value])

  return <DatePicker 
    // {...args} 
    onChange={result => {
      set_value(result)
    }}
    value={value}
  />
}
  
    
export const Default = Template.bind({})
Default.args = {

}
