import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Label } from '../../internal'

export default {
  title: 'General/Label',
  component: Label,
} as ComponentMeta<typeof Label>

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />

export const Red = Template.bind({})
Red.args = {
  color: 'red',
  label: 'denied'
}

export const Green = Template.bind({})
Green.args = {
  color: 'green',
  label: 'accepted'
}

export const Gray = Template.bind({})
Gray.args = {
  color: 'gray',
  label: 'undefined'
}

