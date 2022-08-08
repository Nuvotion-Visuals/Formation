import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Tabs } from './Tabs'

export default {
  title: 'Formation/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => {

  const [activeTab, setActiveTab] = useState('Add')

  return <>
    <Tabs 
      {...args} 
      initialActiveTab={activeTab}
      onSetActiveTab={name => setActiveTab(name)}
    />
    <div className='storybook'>Active tab: { activeTab }</div>
  </>
}

export const Regular= Template.bind({})
Regular.args = {
  tabs: [
    {
      name: 'Scene',
      icon: 'folder'
    },
    {
      name: 'Layer',
      icon: 'paper-plane'
    },
    {
      name: 'Add',
      icon: 'plus-square'
    }
  ]
}
