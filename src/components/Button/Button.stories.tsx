import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>


const Template: ComponentStory<typeof Button> = args => 
  <div style={{display: 'flex'}}>
    <Button {...args} />
    <div style={{width: '100%'}} />
  </div>

export const Regular = Template.bind({})
Regular.args = {
  text: 'Bookmark',
  icon: 'bookmark'
}

export const Primary = Template.bind({})
Primary.args = {
  text: 'Bookmark',
  icon: 'bookmark',
  primary: true
}

export const Secondary = Template.bind({})
Secondary.args = {
  text: 'Bookmark',
  secondary: true,
  icon: 'bookmark',
}

export const HeroPrimary = Template.bind({})
HeroPrimary.args = {
  text: 'Bookmark',
  hero: true,
  icon: 'bookmark',
  primary: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  text: 'Bookmark',
  disabled: true
}

export const Link = Template.bind({})
Link.args = {
  text: 'Open link',
  href: 'https://www.npmjs.com/package/@avsync.live/formation'
}

export const LinkNewTab = Template.bind({})
LinkNewTab.args = {
  text: 'Open link in new tab',
  href: 'https://www.npmjs.com/package/@avsync.live/formation',
  newTab: true
}