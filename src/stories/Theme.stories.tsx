import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../components/Button/Button'
import { Theme as MyTheme } from './Theme'
import { Empty } from '../components/Empty/Empty'
import { AspectRatio } from '../components/AspectRatio/AspectRatio'

export default {
  title: 'Theme',
  component: MyTheme,
} as ComponentMeta<typeof MyTheme>

const Template: ComponentStory<typeof MyTheme> = args => 
  <MyTheme>
    <AspectRatio ratio={1}>
      <Empty />
    </AspectRatio>
  </MyTheme>


export const Theme = Template.bind({})
Theme.args = {

}
