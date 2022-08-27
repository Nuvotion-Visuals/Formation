import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ListEditor } from '../ListEditor'
import { SwipeableNavigation } from './SwipeableNavigation'
import { NavTabs } from './NavTabs'

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
      secondPage={<>
        <NavTabs
            navs={[
              {
                title: 'People',
                href: '#'
              },
              {
                title: 'Positions',
                href: '#',
                active: true
              },
              {
                title: 'Teams',
                href: '#'
              },
            ]}
          borderBottom={true}
        />
        <ListEditor 
        
            {...{
              calculateInitialValue: () =>[],
              onChange: (lists) => { console.log(lists)},
              onRemoveFunction: () => alert('remove'),
              calculateRecommendationLists: () => [],
              calculateRecentLists: () => [],
              isCreating: false
            }}
        />
      </>
          
        }
      thirdPage={<></>}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
}
Default.parameters = {
  layout: 'fullscreen'
}


