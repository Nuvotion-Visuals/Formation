import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LabelEditor } from './LabelEditor'

export default {
  title: 'Input/LabelEditor',
  component: LabelEditor,
} as ComponentMeta<typeof LabelEditor>

const Template: ComponentStory<typeof LabelEditor> = (args) => {
  const [value, set_value] = useState({
    name: '',
    description: '',
    color: ''
  })

  return (
    <LabelEditor {...args} value={value} onChange={newValue => set_value(newValue)}/>
  )
}

export const Default = Template.bind({})
Default.args = {
 
}
Default.parameters = {
  layout: 'fullscreen'
}
