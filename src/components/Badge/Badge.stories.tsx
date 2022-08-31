import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Badge, Icon } from '../../internal'
import { SpaceIcon as FSpaceIcon } from '../NavSpaces/SpaceIcon'
import { NavTabs } from '../NavSpaces/NavTabs'
import { NavBottom } from '../NavSpaces/NavBottom'

export default {
  title: 'Display/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => {
  return <>
    {
      (args as any).disable
        ? args.children
        : <Badge {...args} />
    
    }
  </>
}

export const NotificationBell = Template.bind({})
NotificationBell.args = {
  colorString: 'red',
  count: 3,
  children: <Icon icon='user' iconPrefix='fas' size='2x' />
}

export const SpaceIcon = Template.bind({})
SpaceIcon.args = {
  colorString: 'red',
  count: 11,
  children: <FSpaceIcon {...{
    title: 'Jive DJs Cork',
    src: 'https://api.avsync.live/uploads/medium_jive_djs_d7e9e4490a.jpg',
    date: new Date(Date.parse('Sep 1, 2022')),
    location: 'Cypress Avenue, Cork'
  }} />
}

export const Nav = Template.bind({})
Nav.args = {
  colorString: 'red',
  count: 3,
  disable: true,
  children: <NavBottom
  navs={[
    {
      icon: 'calendar-alt',
      iconPrefix: 'fas',
      title: 'All events',
      href: '#',
      active: true,
      count: 3
    },
    {
      icon: 'check-square',
      iconPrefix: 'fas',
      title: 'Tasks',
      href: '#',
      count: 2
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
  ></NavBottom>
}
Nav.parameters = {
  layout: 'fullscreen'
}
