import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Item } from '../../internal'

export default {
  title: 'Items/Item',
  component: Item,
} as ComponentMeta<typeof Item>

const Template: ComponentStory<typeof Item> = args => 
  <Item {...args} />

export const Person = Template.bind({})
Person.args = {
  name: 'DJ SKoli',
  labelColor: 'purple',
  options: [
    {
      icon: 'ellipsis-v',
      iconPrefix: 'fas',
      dropDownOptions: 
        [
          {
            icon: 'user',
            iconPrefix: 'fas',
            text: 'View profile'
          },
          {
            icon: 'paper-plane',
            text: 'Message',
          },
          {
            icon: 'handshake-angle',
            iconPrefix: 'fas',
            text: 'Set status'
          },
          {
            icon: 'trash-alt',
            text: 'Trash',
          },
        ] 
    }
  ]
}
Person.parameters = {
  layout: 'fullscreen'
}

export const Notification = Template.bind({})
Notification.args = {
  text: 'You have been invited to the event: AVsync Launch Party, Would you like to accept?',
  icon: 'bell',
  iconPrefix: 'fas',
  options: [
    {
      icon: 'check',
      iconPrefix: 'fas',
    },
    {
      icon: 'ellipsis-v',
      iconPrefix: 'fas',
      dropDownOptions: 
        [
          {
            icon: 'user',
            iconPrefix: 'fas',
            text: 'View profile'
          },
          {
            icon: 'paper-plane',
            text: 'Message',
          },
          {
            icon: 'times',
            iconPrefix: 'fas',
            text: 'Decline'
          }
        ] 
    }
  ]
}
Notification.parameters = {
  layout: 'fullscreen'
}

export const Detail = Template.bind({})
Detail.args = {
  text: '21 people',
  icon: 'user',
  labelColor: 'none',
  iconPrefix: 'fas',
  options: [
    {
      icon: 'arrow-right',
      iconPrefix: 'fas'
    }
  ]
}
Detail.parameters = {
  layout: 'fullscreen'
}

export const Title = Template.bind({})
Title.args = {
  label: 'Name',
  title: 'Hydrodynamics',
  labelColor: 'none',
  iconPrefix: 'fas',
  options: [
    {
      icon: 'arrow-right',
      iconPrefix: 'fas'
    }
  ]
}
Title.parameters = {
  layout: 'fullscreen'
}


export const Event = Template.bind({})
Event.args = {
  label: 'Liquid Dance Chicago Presents',
  subtitle: 'Jan 24, 2022',
  src: 'https://api.avsync.live/uploads/avsync_logo_border_45b816cca1.png',
  title: 'Hydrodynamics',
  labelColor: 'none',
  iconPrefix: 'fas',
  options: [
    {
      icon: 'edit',
      iconPrefix: 'fas'
    }
  ]
}
Event.parameters = {
  layout: 'fullscreen'
}


export const Space = Template.bind({})
Space.args = {
  label: 'Liquid Dance Chicago Presents',
  src: 'https://api.avsync.live/uploads/1_bc67779458.jpg',
  title: 'Hydrodynamics',
  labelColor: 'none',
  iconPrefix: 'fas',
  options: [
    {
      icon: 'arrow-right',
      iconPrefix: 'fas'
    }
  ],
  spaceIcon: true,
  date: new Date()
}
Space.parameters = {
  layout: 'fullscreen'
}

export const PageName = Template.bind({})
PageName.args = {
  pageTitle: 'Test'
}
PageName.parameters = {
  layout: 'fullscreen'
}

export const Group = Template.bind({})
Group.args = {
  subtitle: 'Test',
  icon: 'thumbtack',
  iconPrefix: 'fas',
  minimalIcon: true
}
Group.parameters = {
  layout: 'fullscreen'
}

export const DisablePadding = Template.bind({})
DisablePadding.args = {
  subtitle: 'Test',
  iconPrefix: 'fas',
  minimalIcon: true,
  disablePadding: true
}
DisablePadding.parameters = {
  layout: 'fullscreen'
}

export const Active = Template.bind({})
Active.args = {
  text: 'Select',
  active: true,
  primary: true,
  compact: true
}
Active.parameters = {
  layout: 'fullscreen',
}

export const HideHover = Template.bind({})
HideHover.args = {
  label: 'Select',
  hideHover: true
}
HideHover.parameters = {
  layout: 'fullscreen'
}

export const BorderRadius = Template.bind({})
BorderRadius.args = {
  text: 'Select',
  active: true,
  primary: true,
  borderRadius: .25
}
BorderRadius.parameters = {
  layout: 'fullscreen',
}