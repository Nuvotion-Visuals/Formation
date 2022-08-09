import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../Button/Button'
import { Gap } from './Gap'

export default {
  title: 'Formation/Gap',
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

