import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Label } from '../../internal'

export default {
  title: 'Display/Label',
  component: Label,
} as ComponentMeta<typeof Label>

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />

export const Red = Template.bind({})
Red.args = {
  labelColor: 'red',
  label: 'denied'
}

export const Orange = Template.bind({})
Orange.args = {
  labelColor: 'orange',
  label: 'pending'
}

export const Yellow = Template.bind({})
Yellow.args = {
  labelColor: 'yellow',
  label: 'caution'
}

export const Green = Template.bind({})
Green.args = {
  labelColor: 'green',
  label: 'accepted'
}

export const Blue = Template.bind({})
Blue.args = {
  labelColor: 'blue',
  label: 'absent'
}

export const Indigo = Template.bind({})
Indigo.args = {
  labelColor: 'indigo',
  label: 'VIP'
}

export const Purple = Template.bind({})
Purple.args = {
  labelColor: 'purple',
  label: 'interested'
}

export const OnClick = Template.bind({})
OnClick.args = {
  labelColor: 'purple',
  label: 'blacklisted',
  onClick: () => alert('Hello')
}