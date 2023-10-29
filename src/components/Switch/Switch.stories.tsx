import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Switch } from '../../internal'

export default {
  title: 'Input/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => {
  const [value, setValue] = useState(false)
  return <Switch {...args} value={value} onChange={val => setValue(val)} />
}

export const Default = Template.bind({})
Default.args = {
}
