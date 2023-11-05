import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Tabs } from '../../internal'

export default {
  title: 'Navigation/Tabs',
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
    },
    {
      name: 'Layer',
    },
    {
      name: 'Add',
    }
  ]
}


export const Compact = Template.bind({})
Compact.args = {
  tabs: [
    {
      name: 'Scene',
    },
    {
      name: 'Layer',
    },
    {
      name: 'Add',
    }
  ],
  compact: true
}
