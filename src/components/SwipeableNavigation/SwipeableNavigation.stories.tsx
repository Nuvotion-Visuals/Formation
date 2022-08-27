import React, { useState, useEffect } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DateAndTimePicker, Box } from '../../internal'
import { ListEditor } from '../ListEditor'
import { SwipeableNavigation } from './SwipeableNavigation'
import { NavTabs } from './NavTabs'

export default {
  title: 'Navigation/SwipeableNavigation',
  component: SwipeableNavigation,
} as ComponentMeta<typeof SwipeableNavigation>

const Template: ComponentStory<typeof SwipeableNavigation> = args => {

  const [activeSwipeIndex, set_activeSwipeIndex] = useState(0)

  const [value, set_value] = useState([{
    startTime: '',
    endTime: '',
    date: new Date().toDateString()
  }])

  useEffect(() => {
    console.log(value)
  }, [value])

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
      thirdPage={
        <DateAndTimePicker 
   
          onChange={result => {
            set_value(result)
          }}
          value={value}
        />
      }
    />
  )
}

export const Default = Template.bind({})
Default.args = {
}
Default.parameters = {
  layout: 'fullscreen'
}


