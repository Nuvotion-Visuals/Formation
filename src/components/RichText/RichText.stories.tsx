import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import RichTextEditor from 'react-rte';

import { RichText } from './RichText'

export default {
  title: 'Formation/RichText',
  component: RichText,
} as ComponentMeta<typeof RichText>


const Template: ComponentStory<typeof RichText> = args => {
  const [value, set_value] = useState('')

  return <div style={{display: 'flex'}}>
    <RichText 
      {...args} 
      value={value}
      onChange={newValue => set_value(newValue)}
    />
  </div>
}

export const Regular = Template.bind({})
Regular.args = {
  
}
