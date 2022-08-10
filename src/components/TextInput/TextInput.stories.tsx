import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TextInput } from './TextInput'

export default {
  title: 'Formation/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>


const Template: ComponentStory<typeof TextInput> = args => {
  const [value, set_value] = useState('')
  return <div style={{display: 'flex'}}>
    <TextInput 
      {...args} 
      value={value}
      onChange={newValue => set_value(newValue)}
    />
    <div style={{width: '100%'}} />
  </div>
}

export const Regular = Template.bind({})
Regular.args = {
  label: 'Email address',
}
