import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SwipeableNavigation } from './SwipeableNavigation'
import { NavTabs } from './NavTabs'
import { NavHeaderSpacer } from './NavHeaderSpacer'

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
      secondPage={
          <NavTabs
            navs={[
              {
                icon: 'users',
                iconPrefix: 'fas',
                title: 'People',
                href: '#'
              },
              {
                icon: 'users',
                iconPrefix: 'fas',
                title: 'Positions',
                href: '#'
              },
              {
                icon: 'users',
                iconPrefix: 'fas',
                title: 'Teams',
                href: '#'
              },
            ]}
          borderBottom={true}
        />
        }
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


