import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TimeZone } from './TimeZone'

export default {
  title: 'Components/TimeZone',
  component: TimeZone,
} as ComponentMeta<typeof TimeZone>


const Template: ComponentStory<typeof TimeZone> = args => {
  const [value, set_value] = useState('')
  return <TimeZone 
    {...args} 
    value={value}
    onChange={newValue => set_value(newValue)}
  />
}

export const Regular = Template.bind({})
Regular.args = {
  
}

