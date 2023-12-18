import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TextArea } from '../../internal'

export default {
  title: 'Input/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = args => {
  const [value, setValue] = useState('')
  return <TextArea 
    {...args} 
    value={value}
    onChange={newValue => setValue(newValue)}
  />
}

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Enter text here...'
}