import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../../internal'

export default {
  title: 'Input/Button',
  component: Button,
} as ComponentMeta<typeof Button>


const Template: ComponentStory<typeof Button> = args => 
  <div style={{display: 'flex'}}>
    <Button {...args} />
    <div style={{width: '100%'}} />
  </div>

export const Regular = Template.bind({})
Regular.args = {
  text: 'Download'
}

export const Secondary = Template.bind({})
Secondary.args = {
  text: 'Download',
  secondary: true,
  iconPrefix: 'fas',
  icon: 'download',
}

export const Primary = Template.bind({})
Primary.args = {
  text: 'Download',
  icon: 'download',
  iconPrefix: 'fas',
  primary: true
}


export const HeroPrimary = Template.bind({})
HeroPrimary.args = {
  text: 'Download',
  hero: true,
  iconPrefix: 'fas',
  icon: 'download',
  primary: true
}

export const HeroNoIcon = Template.bind({})
HeroNoIcon.args = {
  text: 'Download',
  hero: true,
  primary: true
}

export const Square = Template.bind({})
Square.args = {
  icon: 'times',
  iconPrefix: 'fas',
  square: true,
}

export const SquareHero = Template.bind({})
SquareHero.args = {
  icon: 'times',
  iconPrefix: 'fas',
  square: true,
  hero: true
}

export const Circle = Template.bind({})
Circle.args = {
  icon: 'times',
  iconPrefix: 'fas',
  circle: true,
}

export const CircleHero = Template.bind({})
CircleHero.args = {
  icon: 'times',
  iconPrefix: 'fas',
  circle: true,
  hero: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  text: 'Claim reward',
  disabled: true
}

export const Link = Template.bind({})
Link.args = {
  icon: 'external-link',
  iconPrefix: 'fas',
  text: 'Open link',
  href: 'https://www.npmjs.com/package/@avsync.live/formation'
}

export const LinkNewTab = Template.bind({})
LinkNewTab.args = {
  icon: 'external-link',
  iconPrefix: 'fas',
  text: 'Open link in new tab',
  href: 'https://www.npmjs.com/package/@avsync.live/formation',
  newTab: true
}

export const Expand = Template.bind({})
Expand.args = {
  text: 'Download',
  expand: true,
  hero: true
}

export const Blink = Template.bind({})
Blink.args = {
  text: 'Download',
  icon: 'download',
  iconPrefix: 'fas',
  expand: true,
  hero: true,
  blink: true
}

export const SingleBlink = Template.bind({})
SingleBlink.args = {
  text: 'Download',
  icon: 'download',
  iconPrefix: 'fas',
  expand: true,
  hero: true,
  singleBlink: true
}

export const CustomColor = Template.bind({})
CustomColor.args = {
  text: 'Download',
  background: '#aacfff',
  primary: true
}