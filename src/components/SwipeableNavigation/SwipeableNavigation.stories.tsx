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

  const [dates, set_dates] = useState([{
    startTime: '',
    endTime: '',
    date: new Date().toDateString()
  }])

  const [positions, set_positions] = useState([
    {
        'title': '🎧 DJs',
        'guid': '',
        'listItems': [
            {
                'title': 'DJ SKoli',
                'avatar': false
            },
            {
                'title': 'King Spookey',
                'avatar': false
            },
            {
                'title': 'Subsus',
                'avatar': false
            }
        ]
    },
    {
        'title': '🔥 Fire Dancers',
        'guid': '',
        'listItems': [
            {
                'title': 'Isabella',
                'avatar': false
            },
            {
                'title': 'Lexi',
                'avatar': false
            },
            {
                'title': 'Gloria',
                'avatar': false
            },
            {
                'title': 'Michael',
                'avatar': false
            },
            {
                'title': 'PJ',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            }
        ]
    },
    {
        'title': '📺 Vusicians',
        'guid': '',
        'listItems': [
            {
                'title': 'AVsync.LIVE',
                'avatar': false
            },
            {
                'title': 'Neocord',
                'avatar': false
            }
        ]
    },
    {
        'title': '💡 Lighting Designer',
        'guid': '',
        'listItems': [
            {
                'title': 'Atomosity',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            }
        ]
    },
    {
        'title': '🍺 Bartenders',
        'guid': '',
        'listItems': [
            {
                'title': '',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            }
        ]
    },
    {
        'title': '🛡️ Security',
        'guid': '',
        'listItems': [
            {
                'title': '',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            }
        ]
    },
    {
        'title': '🔊 Audio engineer',
        'guid': '',
        'listItems': [
            {
                'title': 'Ricky Havansek',
                'avatar': false
            }
        ]
    },
    {
        'title': '🍽️ Waitstaff',
        'guid': '',
        'listItems': [
            {
                'title': '',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            },
            {
                'title': '',
                'avatar': false
            }
        ]
    }
])

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
              value: positions,
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
            set_dates(result)
          }}
          value={dates}
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


