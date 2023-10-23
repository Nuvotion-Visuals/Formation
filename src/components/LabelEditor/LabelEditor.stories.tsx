import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LabelEditor } from './LabelEditor'
import { LabelColor } from '../../internal'

export default {
  title: 'Input/LabelEditor',
  component: LabelEditor,
} as ComponentMeta<typeof LabelEditor>

const Template: ComponentStory<typeof LabelEditor> = (args) => {
  const [value, set_value] = useState({
    name: '',
    description: '',
    labelColor: 'orange' as LabelColor
  })

  return (
    <LabelEditor {...args} value={value} onChange={newValue => set_value(newValue)}/>
  )
}

export const Default = Template.bind({})
Default.args = {

}
