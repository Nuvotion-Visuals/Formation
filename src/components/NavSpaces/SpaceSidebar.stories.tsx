import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SpaceSidebar } from './SpaceSidebar'

const eventChannels = [
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
    name: 'Areas',
    icon: 'compass',
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
  },
  {
    name: '',
    icon: 'money-check-dollar',
    iconPrefix: 'fas',
    href: '',
    hideOptions: true,
    active: false
  },
  {
    name: 'Everyone',
    icon: 'hashtag',
    iconPrefix: 'fas',
    href: '',
    hideOptions: true,
    active: false
  },
  {
    name: 'Organizers',
    icon: 'hashtag',
    iconPrefix: 'fas',
    href: '',
    hideOptions: true,
    active: false
  },
  {
    name: 'Volunteers',
    icon: 'hashtag',
    iconPrefix: 'fas',
    href: '',
    hideOptions: true,
    active: false
  }
]

export default {
  title: 'Spaces/SpaceSidebar',
  component: SpaceSidebar,
} as ComponentMeta<typeof SpaceSidebar>

const Template: ComponentStory<typeof SpaceSidebar> = (args) => {
  return (
    <>
      <SpaceSidebar 
        {...args}
      />
    </>
  )
}

export const Regular = Template.bind({})
Regular.args = {
  name: 'Kino Battle of the Bands',
  channels: eventChannels,
  src:'https://api.avsync.live/uploads/medium_Hero_ab87aace42.jpg',
  dateString: 'Sep 8, 2022',
  location: 'Kino, Cork'
}
Regular.parameters = {
  layout: 'fullscreen'
}