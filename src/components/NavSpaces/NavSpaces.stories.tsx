import React, { useState, useEffect } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DateAndTimePicker, Box } from '../../internal'
import { NavSpaces } from './NavSpaces'
import { NavTabs } from './NavTabs'
import { SpacesSidebar } from './SpacesSidebar'
import { SpaceSidebar } from './SpaceSidebar'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

export default {
  title: 'Spaces/NavSpaces',
  component: NavSpaces,
} as ComponentMeta<typeof NavSpaces>

const eventChannels = [
  {
    name: 'Details',
    icon: 'info-circle',
    iconPrefix: 'fas',
    href: '#',
    hideOptions: true,
    active: false
  },
  {
    name: 'People',
    icon: 'users',
    iconPrefix: 'fas',
    href: '#',
    hideOptions: true,
    active: true
  },
  {
    name: 'Tasks',
    icon: 'check-square',
    iconPrefix: 'fas',
    href: '#',
    hideOptions: true,
    active: false
  },
  {
    name: 'Areas',
    icon: 'compass',
    iconPrefix: 'fas',
    href: '#',
    hideOptions: true,
    active: false
  },
  {
    name: 'Finances',
    icon: 'money-check-dollar',
    iconPrefix: 'fas',
    href: '#',
    hideOptions: true,
    active: false
  },
  {
    name: '',
    icon: 'money-check-dollar',
    iconPrefix: 'fas',
    href: '#',
    hideOptions: true,
    active: false
  },
  {
    name: 'Everyone',
    icon: 'hashtag',
    iconPrefix: 'fas',
    href: '#',
    hideOptions: true,
    active: false
  },
  {
    name: 'Organizers',
    icon: 'hashtag',
    iconPrefix: 'fas',
    href: '#',
    hideOptions: true,
    active: false
  },
  {
    name: 'Volunteers',
    icon: 'hashtag',
    iconPrefix: 'fas',
    href: '#',
    hideOptions: true,
    active: false
  }
]

const organizationChannels = [
  {
    name: 'Events',
    icon: 'calendar-alt',
    iconPrefix: 'fas',
    href: '',
    hideOptions: true,
    active: false
  },
  {
    name: 'Details',
    icon: 'info-circle',
    iconPrefix: 'fas',
    href: '',
    hideOptions: true,
    active: false
  },
  {
    name: 'People',
    icon: 'users',
    iconPrefix: 'fas',
    href: '',
    hideOptions: true,
    active: true
  },
  {
    name: 'Tasks',
    icon: 'check-square',
    iconPrefix: 'fas',
    href: '',
    hideOptions: true,
    active: false
  },
  {
    name: 'Finances',
    icon: 'money-check-dollar',
    iconPrefix: 'fas',
    href: '',
    hideOptions: true,
    active: false
  }
]

import { Space } from './NavSpaces'

const Template: ComponentStory<typeof NavSpaces> = args => {
  const [activeSwipeIndex, set_activeSwipeIndex] = useState(0)

  const [spaces, set_spaces] = useState<Space[]>([
    {
      name: '',
      icon: 'message',
      iconPrefix: 'fas'
    },
    {
      name: 'Jive DJs Cork',
      // src: 'https://api.avsync.live/uploads/medium_jive_djs_d7e9e4490a.jpg',
      date: new Date(Date.parse('Sep 1, 2022')),
      location: 'Cypress Avenue, Cork',
      channels: eventChannels,
      href: '#test'
    },
    {
      name: 'Kino Battle of the Bands',
      src: 'https://api.avsync.live/uploads/medium_Hero_ab87aace42.jpg',
      date: new Date(Date.parse('Sep 8, 2022')),
      location: 'Kino, Cork',
      channels: eventChannels
    },
    {
      name: 'The III Studios Session',
      src: 'https://api.avsync.live/uploads/medium_Poster_6ad4c91377.jpg',
      date: new Date(Date.parse('Oct 29, 2022')),
      location: 'The III Studios, Chicago',
      channels: eventChannels
    },
    {
      name: 'Society Chi Presents',
      src: 'https://api.avsync.live/uploads/2_82322a7fdb.jpg',
      date: new Date(Date.parse('Nov 29, 2022')),
      location: 'The Aux, Chicago',
      channels: eventChannels
    },
    {
      name: 'Pretty Happy',
      src: 'https://api.avsync.live/uploads/pretty_happy_95bcc1e160.jpg',
      date: new Date(Date.parse('Dec 4, 2022')),
      location: 'Kino, Chicago',
      channels: eventChannels
    },
    {
      name: 'Cyprus Avenue Hip Hop Festival',
      src: 'https://api.avsync.live/uploads/1_bc67779458.jpg',
      date: new Date(Date.parse('Dec 6, 2022')),
      location: 'Cypress Avenue, Cork',
      channels: eventChannels
    },
    {
      name: 'AVsync.LIVE Artists Chicago',
      src: 'https://api.avsync.live/uploads/avsync_logo_border_45b816cca1.png',
      channels: organizationChannels
    },
    {
      name: 'Chicago Venue Owners',
      src: 'https://pbs.twimg.com/media/DtF4cwDWoAMLBCN?format=jpg&name=4096x4096',
      channels: organizationChannels
    },
    {
      name: 'Glitch Artists Chicago',
      src: 'https://api.avsync.live/uploads/Mosh_Banner_626d750b85.png',
      channels: organizationChannels
    },
    {
      name: '',
      icon: 'plus',
      iconPrefix: 'fas'
    },
  ])
  const [activeSpaceIndex, set_activeSpaceIndex] = useState(2)

  const [dates, set_dates] = useState([{
    startTime: '',
    endTime: '',
    date: 
    spaces[activeSpaceIndex]?.date
      ? spaces?.[activeSpaceIndex]?.date?.toDateString() || ''
      : ''
  }])

  const FirstPage = React.memo(({}) => <>
    <SpacesSidebar 
      activeSpaceIndex={activeSpaceIndex}
      onClickIndex={index => set_activeSpaceIndex(index)}
      spaces={spaces}
    />

    <SpaceSidebar 
      name={spaces[activeSpaceIndex]?.name}
      src={spaces[activeSpaceIndex]?.src}
      dateString={
        spaces[activeSpaceIndex]?.date?.toLocaleString('en-us', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })}
      location={spaces[activeSpaceIndex]?.location}
      channels={spaces[activeSpaceIndex]?.channels}
      dropdownOptions={[]}
    />
  </>)

  return (<>
    <NavSpaces {...args} 
      activeSwipeIndex={activeSwipeIndex}
      onSwipe={index => set_activeSwipeIndex(index)}
      activeSpaceIndex={activeSpaceIndex}
      spaces={spaces}
      channels={spaces?.[activeSpaceIndex].channels}
      firstPage={<FirstPage />}
      secondPage={<>
        <NavTabs
          navs={(args as any).secondaryTopNav}
          borderBottom={true}
        />
      </>}
      thirdPage={
        <DateAndTimePicker 
          onChange={result => {
            set_dates(result)
          }}
          value={dates}
          iconPrefix='fas'
        />
      }
      dropdownOptions={[
        {
          icon: 'ellipsis-v',
          iconPrefix: 'fas',
          dropDownOptions: [
            {
              icon: 'user-plus',
              iconPrefix: 'fas',
              text: 'Invite'
            },
            {
              icon: 'share',
              iconPrefix: 'fas',
              text: 'Share'
            },
            {
              icon: 'archive',
              iconPrefix: 'fas',
              text: 'Archive',
            },
            {
              icon: 'trash-alt',
              text: 'Remove',
            },
          ] 
        }
      ]}
    />
  </>)
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
      iconPrefix: 'fas',
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

