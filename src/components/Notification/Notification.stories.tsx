import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Notification } from '../../internal'

export default {
  title: 'Displays/Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>

const Template: ComponentStory<typeof Notification> = (args) => <Notification {...args} />

export const Info = Template.bind({})
Info.args = {
  children: 'This is an info-level notification',
  type: 'info',
  iconPrefix: 'fas'
}

export const Success = Template.bind({})
Success.args = {
  children: 'This is an success-level notification',
  type: 'success',
  iconPrefix: 'fas'
}

export const Warning = Template.bind({})
Warning.args = {
  children: 'This is an warning-level notification',
  type: 'warning',
  iconPrefix: 'fas',
}

export const Error = Template.bind({})
Error.args = {
  children: 'This is an error-level notification',
  type: 'error',
  iconPrefix: 'fas',
}