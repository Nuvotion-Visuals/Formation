import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../../internal'
import { Spacer } from '../../internal'

export default {
  title: 'Layout/Spacer',
  component: Spacer,
} as ComponentMeta<typeof Spacer>

const Template: ComponentStory<typeof Spacer> = args => 
  <div style={{ display: 'flex'}}>
    <Button text='Click me' />
    <Spacer {...args} />
    <Button text='Click me' />
  </div>
    
export const Default = Template.bind({})
Default.args = {

}
