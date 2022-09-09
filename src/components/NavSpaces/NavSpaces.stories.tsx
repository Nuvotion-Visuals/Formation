import React, { useState, useEffect } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DateAndTimePicker, Box } from '../../internal'
import { ListEditor } from '../ListEditor'
import { NavSpaces } from './NavSpaces'
import { NavTabs } from './NavTabs'

export default {
  title: 'Navigation/NavSpaces',
  component: NavSpaces,
} as ComponentMeta<typeof NavSpaces>

const eventChannels = [
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

const organizationChannels = [
  {
    name: 'Events',
    icon: 'calendar-alt',
    iconPrefix: 'fas',
    route: '',
    hideOptions: true,
    active: false
  },
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
    name: 'Finances',
    icon: 'money-check-dollar',
    iconPrefix: 'fas',
    route: '',
    hideOptions: true,
    active: false
  }
]

const Template: ComponentStory<typeof NavSpaces> = args => {
  const [activeSwipeIndex, set_activeSwipeIndex] = useState(0)

  const [spaces, set_spaces] = useState([
    {
      title: 'Jive DJs Cork',
      // src: 'https://api.avsync.live/uploads/medium_jive_djs_d7e9e4490a.jpg',
      date: new Date(Date.parse('Sep 1, 2022')),
      location: 'Cypress Avenue, Cork',
      channels: eventChannels,
      href: '#test'
    },
    {
      title: 'Kino Battle of the Bands',
      src: 'https://api.avsync.live/uploads/medium_Hero_ab87aace42.jpg',
      date: new Date(Date.parse('Sep 8, 2022')),
      location: 'Kino, Cork',
      channels: eventChannels
    },
    {
      title: 'The III Studios Session',
      src: 'https://api.avsync.live/uploads/medium_Poster_6ad4c91377.jpg',
      date: new Date(Date.parse('Oct 29, 2022')),
      location: 'The III Studios, Chicago',
      channels: eventChannels
    },
    {
      title: 'Society Chi Presents',
      src: 'https://api.avsync.live/uploads/2_82322a7fdb.jpg',
      date: new Date(Date.parse('Nov 29, 2022')),
      location: 'The Aux, Chicago',
      channels: eventChannels
    },
    {
      title: 'Pretty Happy',
      src: 'https://api.avsync.live/uploads/pretty_happy_95bcc1e160.jpg',
      date: new Date(Date.parse('Dec 4, 2022')),
      location: 'Kino, Chicago',
      channels: eventChannels
    },
    {
      title: 'Cyprus Avenue Hip Hop Festival',
      src: 'https://api.avsync.live/uploads/1_bc67779458.jpg',
      date: new Date(Date.parse('Dec 6, 2022')),
      location: 'Cypress Avenue, Cork',
      channels: eventChannels
    },
    {
      title: 'AVsync.LIVE Artists Chicago',
      src: 'https://api.avsync.live/uploads/avsync_logo_border_45b816cca1.png',
      channels: organizationChannels
    },
    {
      title: 'Chicago Venue Owners',
      src: 'https://pbs.twimg.com/media/DtF4cwDWoAMLBCN?format=jpg&name=4096x4096',
      channels: organizationChannels
    },
    {
      title: 'Glitch Artists Chicago',
      src: 'https://api.avsync.live/uploads/Mosh_Banner_626d750b85.png',
      channels: organizationChannels
    }
  ])
  const [activeSpaceIndex, set_activeSpaceIndex] = useState(0)

  const [dates, set_dates] = useState([{
    startTime: '',
    endTime: '',
    date: 
    spaces[activeSpaceIndex]?.date
      ? spaces?.[activeSpaceIndex]?.date?.toDateString() || ''
      : ''
  }])

  return (
    <NavSpaces {...args} 
      activeSwipeIndex={activeSwipeIndex}
      onSwipe={index => set_activeSwipeIndex(index)}
      spaces={spaces}
      activeSpaceIndex={activeSpaceIndex}
      onSetActiveSpacesIndex={index => set_activeSpaceIndex(index)}
      channels={spaces?.[activeSpaceIndex].channels}
      onCreateSpace={() => alert('Create space handler')}
      secondPage={<>
        <NavTabs
          navs={(args as any).secondaryTopNav}
          borderBottom={true}
        />
        <ListEditor 
          {...{
            value: (args as any).lists,
            onChange: (lists) => { console.log(lists)},
            onRemoveFunction: () => alert('remove'),
            calculateRecommendationLists: () => [],
            calculateRecentLists: () => [],
            isCreating: false,
            label: (args as any).label
          }}
        />
      </>}
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

export const Positions = Template.bind({})
Positions.args = {
  label: 'Position title',
  secondaryTopNav: [
    {
      title: 'People',
      href: '#'
    },
    {
      title: 'Positions',
      href: '/iframe.html?args=&id=navigation-navspaces--positions&viewMode=story',
      active: true
    },
    {
      title: 'Teams',
      href: '/iframe.html?args=&id=navigation-navspaces--teams&viewMode=story'
    },
  ],
  lists: [
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
  ],
  navsPrimary: [
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
  ],
  navsSecondary: [
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
  ]
}
Positions.parameters = {
  layout: 'fullscreen'
}

export const Teams = Template.bind({})
Teams.args = {
  label: 'Team title',
  secondaryTopNav: [
    {
      title: 'People',
      href: '#'
    },
    {
      title: 'Positions',
      href: '/iframe.html?args=&id=navigation-navspaces--positions&viewMode=story',
    },
    {
      title: 'Teams',
      href: '/iframe.html?args=&id=navigation-navspaces--teams&viewMode=story',
      active: true
    },
  ],
  lists: [
    {
      'title': 'Artists',
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
      'title': 'Crew',
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
      'title': 'Management',
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
      'title': 'Kitchen',
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
    }
  ],
  navsPrimary: [
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
  ],
  navsSecondary: [
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
  ]
}
Teams.parameters = {
  layout: 'fullscreen'
}

