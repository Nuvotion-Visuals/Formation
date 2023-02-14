import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Dropdown } from '../../internal'

export default {
  title: 'Input/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>


const Template: ComponentStory<typeof Dropdown> = args => 
  <Dropdown {...args} />
  

export const Options = Template.bind({})
Options.args = {
  options: [
    {
      icon: 'ellipsis-vertical',
      iconPrefix: 'fas',
      dropDownOptions: [
        {
          icon: 'heart',
          text: 'Save'
        },
        {
          icon: 'paper-plane',
          text: 'Send'
        },
        {
          icon: 'plus',
          iconPrefix: 'fas',
          text: 'Add'
        }
      ]
    }
  ]
}

export const NoIcons = Template.bind({})
NoIcons.args = {
  options: [
    {
      icon: 'ellipsis-vertical',
      iconPrefix: 'fas',
      dropDownOptions: [
        {
          text: 'Save'
        },
        {
          text: 'Send'
        },
        {
          text: 'Add'
        }
      ]
    }
  ]
}

export const NoIconsLink = Template.bind({})
NoIconsLink.args = {
  options: [
    {
      icon: 'ellipsis-vertical',
      iconPrefix: 'fas',
      dropDownOptions: [
        {
          text: 'Save',
          href: 'https://formation-ui.netlify.app',
          newTab: true
        },
        {
          text: 'Send'
        },
        {
          text: 'Add'
        }
      ]
    }
  ]
}