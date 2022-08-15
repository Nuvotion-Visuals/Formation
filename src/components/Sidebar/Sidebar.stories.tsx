import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Sidebar } from './Sidebar'

export default {
  title: 'Navigation/Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />

export const Regular = Template.bind({})
Regular.args = {
  navs: [
    {
      type: 'nav',
      name: 'Home',
      icon: 'info-circle',
      href: '/'
    },
    {
      type: 'nav',
      name: 'Scenes',
      icon: 'info-circle',
      href: '/scenes',
      toolTipTitle: 'Browse scenes to build your playlist'
    },
    {
      type: 'clickNav',
      name: 'Deck',
      toolTipTitle: 'Perform live music visuals with the scenes in your playlist',
      icon: 'info-circle',
      href: '/app',
      active: false,
      onClick: ()=> {
      
      }
    },
    {
      type: 'nav',
      name: 'Mosh',
      icon: 'info-circle',
      href: '/mosh',
      toolTipTitle: 'Datamosh video files'
    },
    {
      type: 'spacer'
    },
    {
      type: 'title',
      title: 'Learn'
    },
    {
      type: 'nav',
      name: 'Tutorials',
      icon: 'info-circle',
      href: '/tutorials',
      toolTipTitle: 'Learn how to create, perform, and share live music visuals'
    },
    {
      type: 'nav',
      name: 'FAQ',
      icon: 'info-circle',
      href: '/faq',
      hideWhenCollapsed: true,
      toolTipTitle: 'Get answers about AVsync.LIVE'
    },
    {
      type: 'nav',
      name: 'Contact Us',
      icon: 'info-circle',
      hideWhenCollapsed: true,
      toolTipTitle: 'Contact us on Facebook Messenger, Instagram, or Discord',
      onClick: () => {
      }
    }
  ]
}
Regular.parameters = {
  layout: 'fullscreen'
}