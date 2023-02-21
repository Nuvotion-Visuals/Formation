import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RichTextEditor, Box } from '../../internal'


export default {
  title: 'Input/RichTextEditor',
  component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>

const Template: ComponentStory<typeof RichTextEditor> = args => {
  const [value, set_value] = useState('')

  return (<>
    <RichTextEditor {...args} value={value} onChange={newValue => set_value(newValue)} />

    <Box width='100%' py={.5} />
    <RichTextEditor value={value} readOnly />
  </>
  )
}

export const Regular = Template.bind({})
Regular.args = {

}

export const Outset = Template.bind({})
Outset.args = {
  outset: true,
  onEnter: () => alert('Enter')
}

export const FixedHeight = Template.bind({})
FixedHeight.args = {
  placeholder: 'Ask me a question',
  height: '600px'
}

export const Buttons = Template.bind({})
Buttons.args = {
  placeholder: 'Ask me a question',
  height: '300px',
  buttons: [
    {
      icon: 'paper-plane',
      iconPrefix: 'fas',
      minimal: true,
    }
  ]
}