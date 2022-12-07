import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RichTextEditor, StyleHTML } from '../../internal'


export default {
  title: 'Input/RichTextEditor',
  component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>

const Template: ComponentStory<typeof RichTextEditor> = args => {
  const [value, set_value] = useState()

  return (<>
    <RichTextEditor {...args} value={value} onChange={newValue => set_value(newValue)} />
    <StyleHTML>
      <div dangerouslySetInnerHTML={{ __html: value ? value : '' }} />
    </StyleHTML>
  </>
  )
}

export const Regular = Template.bind({})
Regular.args = {

}
  
export const Label = Template.bind({})
Label.args = {
  label: 'Description',
  placeholder: 'Write a description'
}

export const Icon = Template.bind({})
Icon.args = {
  label: 'Description',
  placeholder: 'Write a description',
  icon: 'info-circle',
  iconPrefix: 'fas'
}