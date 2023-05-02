import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RichTextEditor, Box, Button, TextInput } from '../../internal'


export default {
  title: 'Input/RichTextEditor',
  component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>

const Template: ComponentStory<typeof RichTextEditor> = args => {
  const [value, set_value] = useState('')

  const [hightlight, set_highlight] = useState('')

  return (<>
    <TextInput 
      icon='search'
      iconPrefix='fas'
      compact
      placeholder='Find'
      hideOutline
      value={hightlight}
      onChange={val => set_highlight(val)}
    />
    <RichTextEditor {...args} value={value} onChange={newValue => set_value(newValue)} />
    
    <Box width='100%' py={.5} />
   
    <RichTextEditor value={value} readOnly highlightedPart={hightlight} />
  </>
  )
}

export const Regular = Template.bind({})
Regular.args = {

}

export const Autofocus = Template.bind({})
Autofocus.args = {
  autoFocus: true
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
  children: <Button 
    icon='paper-plane'
    iconPrefix='fas'
    minimal
  />
}