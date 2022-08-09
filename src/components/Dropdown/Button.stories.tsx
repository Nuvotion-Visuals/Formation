import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Dropdown } from './Dropdown'

export default {
  title: 'Formation/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>


const Template: ComponentStory<typeof Dropdown> = args => 
  <Dropdown {...args} />
  

export const Regular = Template.bind({})
Regular.args = {
  options: [
    {
      icon: 'ellipsis-vertical',
      iconPrefix: 'fas',
      dropDownOptions: [
        {
          icon: 'folder',
          text: 'Save'
        },
        {
          icon: 'paper-plane',
          text: 'Send'
        },
        {
          icon: 'plus-square',
          text: 'Add'
        }
      ]
    }
  ]
}