import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AspectRatio } from '../AspectRatio/AspectRatio'
import { TransparentBackground } from '../TransparentBackground/TransparentBackground'
import { Grid } from './Grid'

export default {
  title: 'Formation/Grid',
  component: Grid,
} as ComponentMeta<typeof Grid>

const Template: ComponentStory<typeof Grid> = args => 
  <Grid {...args}>
    {
      new Array(20).fill(0).map(i =>
        <AspectRatio ratio={16/9}>
          <TransparentBackground />
        </AspectRatio>  
      )
    }
  </Grid>


export const MaxWidth20rem = Template.bind({})
MaxWidth20rem.args = {
  maxWidth: 20
}

export const MaxWidth10rem = Template.bind({})
MaxWidth10rem.args = {
  maxWidth: 10
}