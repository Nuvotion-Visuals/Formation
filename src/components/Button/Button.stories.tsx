import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './Button'

export default {
  title: 'Formation/Button',
  component: Button,
} as ComponentMeta<typeof Button>


const Template: ComponentStory<typeof Button> = args => 
  <div style={{display: 'flex'}}>
    <Button {...args} />
    <div style={{width: '100%'}} />
  </div>

export const Regular = Template.bind({})
Regular.args = {
  text: 'Send message',
  icon: 'paper-plane'
}

export const Primary = Template.bind({})
Primary.args = {
  text: 'Send message',
  icon: 'paper-plane',
  primary: true
}

export const Secondary = Template.bind({})
Secondary.args = {
  text: 'Send message',
  secondary: true,
  icon: 'paper-plane',
}

export const Hero = Template.bind({})
Hero.args = {
  text: 'Send message',
  hero: true,
  icon: 'paper-plane',
}

export const HeroPrimary = Template.bind({})
HeroPrimary.args = {
  text: 'Send message',
  hero: true,
  icon: 'paper-plane',
  primary: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  text: 'Send message',
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