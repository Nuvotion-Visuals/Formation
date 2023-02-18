import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Dropdown, TextInput, Box } from '../../internal'

export default {
  title: 'Input/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>


const Template: ComponentStory<typeof Dropdown> = args => 
  <Dropdown {...args} />
  

export const Options = Template.bind({})
Options.args = {
  icon: 'ellipsis-vertical',
  iconPrefix: 'fas',
  minimal: true,
  circle: true,
  items: [
    {
      icon: 'heart',
      title: 'Save',
      onClick: () => {}
    },
    {
      icon: 'paper-plane',
      title: 'Send',
      onClick: () => {}
    },
    {
      icon: 'plus',
      iconPrefix: 'fas',
      title: 'Add',
      onClick: () => {}
    }
  ]
}

export const NoIcons = Template.bind({})
NoIcons.args = {
  icon: 'ellipsis-vertical',
  iconPrefix: 'fas',
  minimal: true,
  circle: true,
  items: [
    {
      title: 'Save',
      onClick: () => {}
    },
    {
      title: 'Send',
      onClick: () => {}
    },
    {
      iconPrefix: 'fas',
      title: 'Add',
      onClick: () => {}
    }
  ]
}

export const Insert = Template.bind({})
Insert.args = {
  icon: 'plus',
  iconPrefix: 'fas',
  minimal: true,
  circle: true,
  items: [
    {
      children: <div onClick={e => e.stopPropagation()}>
        <Box minWidth={17}>
          <TextInput
            value=''
            onChange={() => {}}
            iconPrefix='fas'
            compact
            placeholder='Insert content from URL'
            canClear
            buttons={[
              {
                icon: 'arrow-right',
                iconPrefix: 'fas',
                minimal: true
              }
            ]}
          />
        </Box>
      </div>,
      onClick: () => {}
    },
  ]
}

