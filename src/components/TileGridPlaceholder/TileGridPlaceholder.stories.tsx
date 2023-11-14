import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button, TileGridPlaceholder } from '../../internal'

export default {
  title: 'Display/TileGridPlaceholder',
  component: TileGridPlaceholder,
} as ComponentMeta<typeof TileGridPlaceholder>

const Template: ComponentStory<typeof TileGridPlaceholder> = args => {
  return <TileGridPlaceholder
    {...args}
  />
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  loading: false,
  noResultsMessage: 'Generate custom Sources by typing in a prompt.',
  maxWidth: 7.5,
  tiles: 40
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  maxWidth: 7.5,
  tiles: 40
}

export const Clear = Template.bind({})
Clear.args = {
  loading: false,
  noResultsMessage: 'There are no effects that match your search.',
  maxWidth: 7.5,
  children: <Button
    icon='eraser'
    iconPrefix='fas'
    text='Clear'
  />,
  tiles: 40
}
