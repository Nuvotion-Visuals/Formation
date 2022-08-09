import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../Button/Button'
import { Break } from './Break'

export default {
  title: 'Formation/Break',
  component: Break,
} as ComponentMeta<typeof Break>

const Template: ComponentStory<typeof Break> = args => 
  <div style={{display: 'flex', flexWrap: 'wrap', width: '100%'}} >
    <Button text='Click me' />
      <Break />
    <Button text='Click me' />
  </div>

export const Regular = Template.bind({})
Regular.args = {

}
