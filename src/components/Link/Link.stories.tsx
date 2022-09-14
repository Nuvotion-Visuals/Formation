import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Link } from '../../internal'

export default {
  title: 'General/Link',
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = args => 
  <Link {...args} />

export const Default = Template.bind({})
Default.args = {
  href: '#link',
  children: 'Link',
}

export const NewTab = Template.bind({})
NewTab.args = {
  href: '#new-link',
  children: 'New Tab Link',
}

export const OverrideComponent = Template.bind({})
OverrideComponent.args = {
  href: '#override',
  linkComponent: () => <a href='#'>Override Component Link</a>
}