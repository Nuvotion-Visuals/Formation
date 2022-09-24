import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SpacesSidebar } from './SpacesSidebar'
import { SpaceSidebar } from './SpaceSidebar'
import { Space } from './NavSpaces'

export default {
  title: 'Spaces/SpacesSidebar',
  component: SpacesSidebar,
} as ComponentMeta<typeof SpacesSidebar>

const Template: ComponentStory<typeof SpacesSidebar> = (args) => {
  const [activeSpaceIndex, set_activeSpaceIndex] = useState(2)

  return (
    <SpacesSidebar 
      {
        ...args
      }
      onClickIndex={index => set_activeSpaceIndex(index)}
      activeSpaceIndex={activeSpaceIndex}
    />
  )
} 
  


export const Regular = Template.bind({})
Regular.args = {
  spaces: [
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
      href: '#test'
    },
    {
      name: 'Kino Battle of the Bands',
      src: 'https://api.avsync.live/uploads/medium_Hero_ab87aace42.jpg',
      date: new Date(Date.parse('Sep 8, 2022')),
      location: 'Kino, Cork',
    },
    {
      name: 'The III Studios Session',
      src: 'https://api.avsync.live/uploads/medium_Poster_6ad4c91377.jpg',
      date: new Date(Date.parse('Oct 29, 2022')),
      location: 'The III Studios, Chicago',
    },
    {
      name: 'Society Chi Presents',
      src: 'https://api.avsync.live/uploads/2_82322a7fdb.jpg',
      date: new Date(Date.parse('Nov 29, 2022')),
      location: 'The Aux, Chicago',
    },
    {
      name: 'Pretty Happy',
      src: 'https://api.avsync.live/uploads/pretty_happy_95bcc1e160.jpg',
      date: new Date(Date.parse('Dec 4, 2022')),
      location: 'Kino, Chicago',
    },
    {
      name: 'Cyprus Avenue Hip Hop Festival',
      src: 'https://api.avsync.live/uploads/1_bc67779458.jpg',
      date: new Date(Date.parse('Dec 6, 2022')),
      location: 'Cypress Avenue, Cork',
    },
    {
      name: 'AVsync.LIVE Artists Chicago',
      src: 'https://api.avsync.live/uploads/avsync_logo_border_45b816cca1.png',
    },
    {
      name: 'Chicago Venue Owners',
      src: 'https://pbs.twimg.com/media/DtF4cwDWoAMLBCN?format=jpg&name=4096x4096',
    },
    {
      name: 'Glitch Artists Chicago',
      src: 'https://api.avsync.live/uploads/Mosh_Banner_626d750b85.png',
    },
    {
      name: '',
      icon: 'plus',
      iconPrefix: 'fas'
    },
  ]
}
Regular.parameters = {
  layout: 'fullscreen'
}