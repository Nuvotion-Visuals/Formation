import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button, Gap, Dialog, DialogProvider, useDialog } from '../../internal'

export default {
  title: 'Input/Dialog',
  component: Dialog,
  decorators: [(Story) => (
    <DialogProvider>
      <Story />
    </DialogProvider>
  )],
} as ComponentMeta<typeof Dialog>

const Template: ComponentStory<typeof Dialog> = (args: any) => {
  const { openDialog } = useDialog()
  const [response, setResponse] = useState<string | boolean | null>('')

  return (
    <Gap>
      <Button onClick={() => openDialog(args.type, args.message, setResponse)}>
        {args.label}
      </Button>
      <p>{response !== null ? response.toString() : ''}</p>
      <Dialog />
    </Gap>
  )
}

export const Alert = Template.bind({})
Alert.args = {
  label: 'Open Alert Dialog',
  message: 'To create visuals with cameras, please give AVsync.LIVE permission to access your camera. Go to chrome://settings/content/camera',
  type: 'alert'
}

export const Confirm = Template.bind({})
Confirm.args = {
  label: 'Open Confirm Dialog',
  message: 'Are you sure you want to proceed?',
  type: 'confirm'
}

export const Prompt = Template.bind({})
Prompt.args = {
  label: 'Open Prompt Dialog',
  message: 'Please enter your name:',
  type: 'prompt'
}
