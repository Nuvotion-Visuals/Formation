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
  color: 'red',
  label: 'denied'
}

export const Orange = Template.bind({})
Orange.args = {
  color: 'orange',
  label: 'pending'
}

export const Yellow = Template.bind({})
Yellow.args = {
  color: 'yellow',
  label: 'caution'
}

export const Green = Template.bind({})
Green.args = {
  color: 'green',
  label: 'accepted'
}

export const Blue = Template.bind({})
Blue.args = {
  color: 'blue',
  label: 'absent'
}

export const Indigo = Template.bind({})
Indigo.args = {
  color: 'indigo',
  label: 'VIP'
}

export const Violet = Template.bind({})
Violet.args = {
  color: 'violet',
  label: 'interested'
}

