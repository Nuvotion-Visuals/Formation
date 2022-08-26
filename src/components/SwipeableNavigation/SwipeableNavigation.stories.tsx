import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SwipeableNavigation } from './SwipeableNavigation'

export default {
  title: 'Navigation/SwipeableNavigation',
  component: SwipeableNavigation,
} as ComponentMeta<typeof SwipeableNavigation>

const Template: ComponentStory<typeof SwipeableNavigation> = args => {

  const [activeSwipeIndex, set_activeSwipeIndex] = useState(0)

  return (
    <SwipeableNavigation {...args} 
      activeSwipeIndex={activeSwipeIndex}
      onSwipe={index => set_activeSwipeIndex(index)}
      secondPage={'Second page'}
      thirdPage={'Third page'}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
}
Default.parameters = {
  layout: 'fullscreen'
}


