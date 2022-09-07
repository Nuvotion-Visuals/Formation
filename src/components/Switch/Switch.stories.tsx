import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Switch } from '../../internal'

export default {
  title: 'Input/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const Small= Template.bind({})
Small.args = {
  switch: {
    value: 'true',
  }
}
