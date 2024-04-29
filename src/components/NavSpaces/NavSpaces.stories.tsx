import React, { useState, useEffect } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DateAndTimePicker, Box, Placeholders } from '../../internal'
import { NavSpaces } from './NavSpaces'
import { NavTabs } from './NavTabs'
import { SpacesSidebar } from './SpacesSidebar'
import { SpaceSidebar } from './SpaceSidebar'

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

const Template: ComponentStory<typeof NavSpaces> = args => {
  const [activeSwipeIndex, set_activeSwipeIndex] = useState(0)

  const [spaces, set_spaces] = useState([
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
      href: '#test',
      labelColor: 'indigo'
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
      name: '🐦',
      labelColor: 'cyan'
    },
    {
      labelColor: 'red',
      channels: organizationChannels
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
    timeZone: '',
    date: 
    spaces[activeSpaceIndex]?.date
      ? spaces?.[activeSpaceIndex]?.date?.toDateString() || ''
      : ''
  }])

  const FirstPage = React.memo(({}) => <div style={{display: 'flex', height: '100%'}}>
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
    />
  </div>)

  return (<>
    <NavSpaces {...args} 
      activeSwipeIndex={activeSwipeIndex}
      onSwipe={index => set_activeSwipeIndex(index)}
      firstPage={<FirstPage />}
      secondPage={<>
     
        <Placeholders />
        <Placeholders />
        <Placeholders />
      </>}
      thirdPage={
        <Box p={.75}>
          <DateAndTimePicker 
            onChange={result => {
              set_dates(result)
            }}
            value={dates}
            iconPrefix='fas'
          />
        </Box>
      }
    />
  </>)
}

export const Default = Template.bind({})
Default.args = {
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
}
Default.parameters = {
  layout: 'fullscreen'
}