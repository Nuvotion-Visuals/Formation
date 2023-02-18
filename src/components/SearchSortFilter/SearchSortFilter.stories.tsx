import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SearchSortFilter } from '../../internal'

export default {
  title: 'Input/SearchSortFilter',
  component: SearchSortFilter,
} as ComponentMeta<typeof SearchSortFilter>

const Template: ComponentStory<typeof SearchSortFilter> = args => {
  const [expanded, set_expanded] = useState(false)

  const [value, set_value] = useState('')

  return (
    <SearchSortFilter 
      {...args} 
      value={value}
      onChange={value => set_value(value)}
      expanded={expanded}
      onExpand={newExpanded => set_expanded(newExpanded)}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  iconPrefix: 'fas',
  hideOutline: true,
  minimal: true,
  icon: 'sort',
  items: [
    {
      icon: 'arrow-up',
      iconPrefix: 'fas',
      text: 'Newest'
    },
    {
      icon: 'arrow-down',
      iconPrefix: 'fas',
      text: 'Oldest'
    },
    {
      icon: 'clock',
      iconPrefix: 'fas',
      text: 'Last edited'
    },
    {
      icon: 'thumbtack',
      iconPrefix: 'fas',
      text: 'Custom order'
    }
  ]
}


