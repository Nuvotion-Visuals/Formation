import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Grid } from '../Grid/Grid'
import { Empty } from '../Empty/Empty'
import { AspectRatio } from './AspectRatio'

export default {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
} as ComponentMeta<typeof AspectRatio>

const Template: ComponentStory<typeof AspectRatio> = args => 
  <Grid maxWidth={10}>
    {
      new Array(20).fill(0).map(i =>
        <AspectRatio {...args}>
          <Empty />
        </AspectRatio>  
      )
    }
  </Grid>


export const Widescreen16x9 = Template.bind({})
Widescreen16x9.args = {
  ratio: 16/9
}

export const Fullscreen4x3 = Template.bind({})
Fullscreen4x3 .args = {
  ratio: 4/3
}

export const Square1x1 = Template.bind({})
Square1x1.args = {
  ratio: 1
}

