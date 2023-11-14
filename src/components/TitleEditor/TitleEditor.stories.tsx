import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TitleEditor } from '../../internal'

export default {
  title: 'Input/TitleEditor',
  component: TitleEditor,
} as ComponentMeta<typeof TitleEditor>

const Template: ComponentStory<typeof TitleEditor> = args => {
  const [value, setValue] = useState('Formation: A Great Component Library')
  return <TitleEditor
    {...args}
    value={value}
    onChange={val => setValue(val)}
  />
}

export const Default = Template.bind({})
Default.args = {
 
}

export const AutoFocus = Template.bind({})
AutoFocus.args = {
  autoFocus: true
}

export const OnBlur = Template.bind({})
OnBlur.args = {
  onBlur: () => alert('onBlur')
}

export const Compact = Template.bind({})
Compact.args = {
 compact: true
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
 readOnly: true
}
