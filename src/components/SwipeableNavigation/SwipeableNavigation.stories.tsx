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

  const [spaces, set_spaces] = useState([
    {
      title: 'Jive DJs Cork',
      src: 'https://api.avsync.live/uploads/medium_jive_djs_d7e9e4490a.jpg',
      date: new Date(Date.parse('Sep 1, 2022')),
      location: 'Cypress Avenue, Cork'
    },
    {
      title: 'Kino Battle of the Bands',
      src: 'https://api.avsync.live/uploads/medium_Hero_ab87aace42.jpg',
      date: new Date(Date.parse('Sep 8, 2022')),
      location: 'Kino, Cork'
    },
    {
      title: 'The III Studios Session',
      src: 'https://api.avsync.live/uploads/medium_Poster_6ad4c91377.jpg',
      date: new Date(Date.parse('Oct 29, 2022')),
      location: 'The III Studios, Chicago'
    },
    {
      title: 'Society Chi Presents',
      src: 'https://api.avsync.live/uploads/2_82322a7fdb.jpg',
      date: new Date(Date.parse('Nov 29, 2022')),
      location: 'The Aux, Chicago'
    },
    {
      title: 'Pretty Happy',
      src: 'https://api.avsync.live/uploads/pretty_happy_95bcc1e160.jpg',
      date: new Date(Date.parse('Dec 4, 2022')),
      location: 'Kino, Chicago'
    },
    {
      title: 'Cyprus Avenue Hip Hop Festival',
      src: 'https://api.avsync.live/uploads/1_bc67779458.jpg',
      date: new Date(Date.parse('Dec 6, 2022')),
      location: 'Cypress Avenue, Cork'
    }
  ])
  const [activeSpaceIndex, set_activeSpaceIndex] = useState(0)

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

  const [dates, set_dates] = useState([{
    startTime: '',
    endTime: '',
    date: new Date(spaces[activeSpaceIndex].date).toDateString()
  }])

//   <Channel
//   name='Details'
//   icon='info-circle'
//   iconPrefix='fas'
//   route={`/events/${activeEventGuid}`}
//   hideOptions={true}
//   active={false}
// />
// <Channel
//   name='People'
//   icon='users'
//   iconPrefix='fas'
//   route={`/events/${activeEventGuid}/people`}
//   hideOptions={true}
//   active={true}
// />
// <Channel
//   name='Tasks'
//   icon='check-square'
//   iconPrefix='fas'
//   route={`/events/${activeEventGuid}/tasks`}
//   hideOptions={true}
//   active={false}
// />
// <Channel
//   name='Areas'
//   icon='compass'
//   iconPrefix='fas'
//   route={`/events/${activeEventGuid}/areas`}
//   hideOptions={true}
//   active={false}
// />

  return (
    <SwipeableNavigation {...args} 
      activeSwipeIndex={activeSwipeIndex}
      onSwipe={index => set_activeSwipeIndex(index)}
      spaces={spaces}
      activeSpaceIndex={activeSpaceIndex}
      onSetActiveSpacesIndex={index => set_activeSpaceIndex(index)}
      channels={[
        {
          name: 'Details',
          icon: 'info-circle',
          iconPrefix: 'fas',
          route: '',
          hideOptions: true,
          active: false
        },
        {
          name: 'People',
          icon: 'users',
          iconPrefix: 'fas',
          route: '',
          hideOptions: true,
          active: true
        },
        {
          name: 'Tasks',
          icon: 'check-square',
          iconPrefix: 'fas',
          route: '',
          hideOptions: true,
          active: false
        },
        {
          name: 'Areas',
          icon: 'compass',
          iconPrefix: 'fas',
          route: '',
          hideOptions: true,
          active: false
        },
        {
          name: 'Finances',
          icon: 'money-check-dollar',
          iconPrefix: 'fas',
          route: '',
          hideOptions: true,
          active: false
        }
      ]
      
    }
      navsPrimary={[
        {
          icon: 'calendar-alt',
          iconPrefix: 'fas',
          title: 'All events',
          href: '#',
          active: true
        },
        {
          icon: 'check-square',
          iconPrefix: 'fas',
          title: 'Tasks',
          href: '#'
        },
        {
          icon: 'bell',
          iconPrefix: 'fas',
          title: 'Notifications',
          href: '#'
        },
        {
          icon: 'user',
          iconPrefix: 'fas',
          title: 'Profile',
          href: '#'
        }
      ]}
      navsSecondary={[
        {
          icon: 'info-circle',
          iconPrefix: 'fas',
          title: 'Details',
          href: '#'
        },
        {
          icon: 'users',
          iconPrefix: 'fas',
          title: 'People',
          href: '#',
          active: true
        },
        {
          icon: 'check-square',
          iconPrefix: 'fas',
          title: 'Tasks',
          href: '#'
        },
        {
          icon: 'compass',
          iconPrefix: 'fas',
          title: 'Areas',
          href: '#'
        }
      ]}
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


