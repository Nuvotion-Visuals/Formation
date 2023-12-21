import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button, Gap, Dialog, DialogProvider, Break, dialogController } from '../../internal'

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
  const [response, setResponse] = useState<string | boolean | null>('')

  return (
    <Gap>
      <Button onClick={() => dialogController.openDialog({ 
        mode: args.mode, 
        message: args.message, 
        callback: setResponse, 
        placeholder: args.placeholder
      })}>
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
  mode: 'alert'
}

export const Confirm = Template.bind({})
Confirm.args = {
  label: 'Open Confirm Dialog',
  message: 'Are you sure you want to delete this Scene?',
  mode: 'confirm'
}

export const Prompt = Template.bind({})
Prompt.args = {
  label: 'Open Prompt Dialog',
  message: 'Choose a title for your blog post',
  placeholder: 'Title', // Add a placeholder for the prompt input
  mode: 'prompt'
}

const AllDialogsTemplate: ComponentStory<typeof Dialog> = () => {
  const [confirmResponse, setConfirmResponse] = useState<string | boolean | null>('')
  const [promptResponse, setPromptResponse] = useState<string | boolean | null>('')

  return (
    <Gap>
      <Button onClick={() => dialogController.openDialog({
        mode: 'alert',
        message: 'This is an alert!',
      })}>
        Open Alert Dialog
      </Button>
      <Break />

      <Button onClick={() => dialogController.openDialog({
        mode: 'confirm',
        message: 'Are you sure you want to delete this Scene?',
        callback: setConfirmResponse
      })}>
        Open Confirm Dialog
      </Button>
      <p>{confirmResponse !== null ? confirmResponse.toString() : ''}</p>

      <Break />

      <Button onClick={() => dialogController.openDialog({
        mode: 'prompt',
        message: 'Enter your name:',
        callback: setPromptResponse,
        placeholder: 'Name'
      })}>
        Open Prompt Dialog
      </Button>
      <p>{promptResponse !== null ? promptResponse.toString() : ''}</p>
      <Dialog />
    </Gap>
  )
}

export const AllDialogs = AllDialogsTemplate.bind({})