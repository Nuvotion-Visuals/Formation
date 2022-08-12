import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme as MyTheme } from './Theme'

export default {
  title: 'Theme',
  component: MyTheme,
} as ComponentMeta<typeof MyTheme>

const Template: ComponentStory<typeof MyTheme> = args => 
  <MyTheme>

  </MyTheme>

export const Theme = Template.bind({})
Theme.args = {

}
