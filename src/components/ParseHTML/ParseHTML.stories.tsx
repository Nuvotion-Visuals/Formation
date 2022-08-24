import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import README from '!raw-loader!../../../README.md'

import { ParseHTML, StyleHTML } from '../../internal'

export default {
  title: 'General/ParseHTML',
  component: ParseHTML,
} as ComponentMeta<typeof ParseHTML>

const Template: ComponentStory<typeof ParseHTML> = (args) => <StyleHTML>
  <ParseHTML {...args} />
</StyleHTML>

export const Markdown = Template.bind({})
Markdown.args = {
  markdown: README
}

export const HTML = Template.bind({})
HTML.args = {
  markdown: `<h1>Formation</h1>`
}
