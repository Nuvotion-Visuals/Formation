import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../../internal'
import { Search } from '../../internal'

export default {
  title: 'Input/Search',
  component: Search,
} as ComponentMeta<typeof Search>

const Template: ComponentStory<typeof Search> = args => 
  <Search {...args}>
    <Button text='Click me' />
    <Button text='Click me' />
    <Button text='Click me' />
    <Button text='Click me' />
  </Search>


export const Default = Template.bind({})
Default.args = {

}

export const SearchSortFilter = Template.bind({})
SearchSortFilter.args = {
  sortOptions: [
    {
      icon: 'sort-alpha-down',
      iconPrefix: 'fas',
      dropDownOptions: [
        {
          icon: 'sort-alpha-down',
          iconPrefix: 'fas',
          text: 'Alphabetical'
        },
        {
          icon: 'sort-alpha-up',
          iconPrefix: 'fas',
          text: 'Reverse'
        },
        {
          icon: 'heart',
          iconPrefix: 'fas',
          text: 'Most used'
        },
        {
          icon: 'calendar-alt',
          iconPrefix: 'fas',
          text: 'Upcoming'
        }
      ]
    }
  ],
  filterOptions: [
    {
      icon: 'filter',
      iconPrefix: 'fas',
      dropDownOptions: [
        {
          icon: 'filter',
          text: 'All'
        },
        {
          icon: 'layer-group',
          text: 'Layer'
        },
        {
          icon: 'adjust',
          text: 'Filter'
        }
      ]
    }
  ]
}


