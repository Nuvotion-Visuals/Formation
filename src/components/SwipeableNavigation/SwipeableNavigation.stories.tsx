import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SwipeableNavigation } from './SwipeableNavigation'

export default {
  title: 'Navigation/SwipeableNavigation',
  component: SwipeableNavigation,
} as ComponentMeta<typeof SwipeableNavigation>

const Template: ComponentStory<typeof SwipeableNavigation> = args => {
  return (
    <SwipeableNavigation {...args} />
  )
}



export const Default = Template.bind({})
Default.args = {
}
Default.parameters = {
  layout: 'fullscreen'
}


