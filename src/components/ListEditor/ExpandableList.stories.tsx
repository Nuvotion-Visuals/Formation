import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Label, ExpandableList } from '../../internal'

export default {
  title: 'Items/ExpandableList',
  component: ExpandableList,
} as ComponentMeta<typeof ExpandableList>

const Template: ComponentStory<typeof ExpandableList> = args => {
  const [expanded, set_expanded] = useState(true)
  
  const [value, set_value] = useState<any>(args)

  useEffect(() => {
    set_value({
      ...value,
      item: {
        ...value.item,
        icon: expanded 
          ? 'chevron-up' 
          : 'chevron-down'
      }
    })
  }, [expanded])

  return (<>
    <ExpandableList 
      {...args} 
      value={value}
      expanded={expanded}
      onExpand={() => set_expanded(!expanded)}
      onReorder={newValue => set_value({
        ...value,
        list: newValue
      })}
      reorderId='1'
    />
  </>
  )
}

export const Positions = Template.bind({})
Positions.args = {
  item: {
    icon: 'chevron-up',
    iconPrefix: 'fas',
    labelColor: 'none',
    title: 'Dancers',
    children: <>
      <Label label={'2 / 3'} labelColor={'orange'}/>
    </>,
    options: [
      {
        icon: 'ellipsis-v',
        iconPrefix: 'fas'
      }
    ]
  },
  list: [
    {
      name: 'Scotty Distortion',
      onClick: () => {},
      children: <>
        <Label label={'confirmed'} labelColor={'green'}/>
      </>,
      options: [
        {
          icon: 'ellipsis-v',
          iconPrefix: 'fas'
        }
      ]
    },
    {
      name: 'Sleepy',
      onClick: () => {},
      active: true,
      children: <>
        <Label label={'confirmed'} labelColor={'green'}/>
      </>,
      options: [
        {
          icon: 'ellipsis-v',
          iconPrefix: 'fas'
        }
      ]
    },
    {
      name: 'Isabelle',
      onClick: () => {},
      children: <>
        <Label label={'tentative'} labelColor={'orange'}/>
      </>,
      options: [
        {
          icon: 'ellipsis-v',
          iconPrefix: 'fas'
        }
      ]
    }
  ]
}
Positions.parameters = {
  layout: 'fullscreen'
}

export const Details = Template.bind({})
Details.args = {
  item: {
    icon: 'chevron-up',
    iconPrefix: 'fas',
    labelColor: 'none',
    title: 'Basics',
    children: <>
      <Label label={'3 / 3'} labelColor={'green'}/>
    </>,
    options: [
      {
        icon: 'ellipsis-v',
        iconPrefix: 'fas'
      }
    ]
  },
  list: [
    {
      icon: 'info-circle',
      iconPrefix: 'fas',
      label: 'Name',
      title: 'Hydrodynamics',
      labelColor: 'none',
      onClick: () => {},
      options: [
        {
          icon: 'arrow-right',
          iconPrefix: 'fas'
        }
      ]
    },
    {
      icon: 'calendar-alt',
      iconPrefix: 'fas',
      label: 'Date',
      title: 'Monday, October 31, 2022',
      labelColor: 'none',
      active: true,
      onClick: () => {},
      options: [
        {
          icon: 'arrow-right',
          iconPrefix: 'fas'
        }
      ]
    },
    {
      icon: 'money-check-dollar',
      iconPrefix: 'fas',
      label: 'Tickets',
      onClick: () => {},
      labelColor: 'none',
      emphasize: true,
      children: <>
        <Label label={'todo'} labelColor={'orange'}/>
      </>,
      options: [
        {
          icon: 'arrow-right',
          iconPrefix: 'fas'
        }
      ]
    },
    {
      icon: 'map-marker-alt',
      iconPrefix: 'fas',
      label: 'Location',
      onClick: () => {},
      title: 'South Loop',
      labelColor: 'none',
      options: [
        {
          icon: 'arrow-right',
          iconPrefix: 'fas'
        }
      ]
    },
    
  ]
}
Details.parameters = {
  layout: 'fullscreen'
}
