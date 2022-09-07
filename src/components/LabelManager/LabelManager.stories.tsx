import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LabelManager } from './LabelManager'

export default {
  title: 'Input/LabelManager',
  component: LabelManager,
} as ComponentMeta<typeof LabelManager>


const Template: ComponentStory<typeof LabelManager> = args => {
  const [value, set_value] = useState([
    {
      name: 'pending',
      description: '',
      color: 'orange'
    },
    {
      name: 'rejected',
      description: '',
      color: 'red'
    },
    {
      name: 'accepted',
      description: '',
      color: 'green'
    }
  ])
  return <LabelManager 
    {...args} 
    value={value} 
    onChange={newValue => set_value(newValue)} 
  />
}

export const Default = Template.bind({})
Default.args = {
  
}
Default.parameters = {
  layout: 'fullscreen'
}



