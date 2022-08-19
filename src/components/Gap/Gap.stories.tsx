import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../../internal'
import { Gap } from '../../internal'

export default {
  title: 'Layout/Gap',
  component: Gap,
} as ComponentMeta<typeof Gap>

const Template: ComponentStory<typeof Gap> = args => 
  <Gap {...args}>
    <Button text='Click me' />
    <Button text='Click me' />
    <Button text='Click me' />
    <Button text='Click me' />
  </Gap>


export const Default = Template.bind({})
Default.args = {

}

export const LargerGap = Template.bind({})
LargerGap.args = {
  gap: 1
}

