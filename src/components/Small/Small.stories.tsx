import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Small } from '../../internal' // Adjust the import path as needed

export default {
  title: 'Display/Small',
  component: Small,
} as ComponentMeta<typeof Small>

const Template: ComponentStory<typeof Small> = (args) => 
  <Small {...args}>
    Sample Text
  </Small>

export const Default = Template.bind({})
Default.args = {
  children: 'Default Text',
  onClick: () => alert('Clicked!'),
  href: '',
  newTab: false,
  center: false
}

export const WithLink = Template.bind({})
WithLink.args = {
  children: 'Link Text',
  href: 'https://example.com',
  newTab: true
}

export const Centered = Template.bind({})
Centered.args = {
  center: true
}

export const WithUnderline = Template.bind({})
WithUnderline.args = {
  underline: true
}

export const CenteredWithUnderline = Template.bind({})
CenteredWithUnderline.args = {
  center: true,
  href: 'https://example.com',
  underline: true
}