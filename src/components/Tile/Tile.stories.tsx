import React, { useState, useEffect } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Grid, Tile } from '../../internal'

export default {
  title: 'Items/Tile',
  component: Tile,
} as ComponentMeta<typeof Tile>

const Template: ComponentStory<typeof Tile> = args => {
  return <Grid maxWidth={10}>
    <Tile
      {...args}
    />
  </Grid>
}

export const BlendMode = Template.bind({})
BlendMode.args = {
  onClick: () => alert('clicked'),
  header: {
    text: 'Difference',
    compact: true
  },
  content: {
    backgroundSrc: `/blendPreviews/Difference.jpg`
  }
}
