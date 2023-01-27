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
      labelColor: 'orange'
    },
    {
      name: 'rejected',
      description: '',
      labelColor: 'red'
    },
    {
      name: 'accepted',
      description: '',
      labelColor: 'green'
    }
  ])
  return <LabelManager 
    {...args} 
    // @ts-ignore
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



