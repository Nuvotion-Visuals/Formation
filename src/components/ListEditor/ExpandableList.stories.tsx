import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Label, ExpandableList, Dropdown } from '../../internal'

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
          ? 'caret-down' 
          : 'caret-right',
        minimalIcon: true
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
    subtitle: 'Dancers',
    children: <>
      <Label label={'2 / 3'} labelColor={'orange'}/>
    </>
  },
  list: [
    {
      name: 'Scotty Distortion',
      labelColor: 'red',
      onClick: () => {},
      children: <>
        <Label label={'confirmed'} labelColor={'green'}/>
      </>
    },
    {
      name: 'Sleepy',
      labelColor: 'green',
      onClick: () => {},
      active: true,
      children: <>
        <Label label={'confirmed'} labelColor={'green'}/>
      </>
    },
    {
      name: 'Isabelle',
      labelColor: 'blue',
      onClick: () => {},
      children: <>
        <Label label={'tentative'} labelColor={'orange'}/>
      </>
    }
  ]
}
Positions.parameters = {
  layout: 'fullscreen'
}

export const Group = Template.bind({})
Group.args = {
  item: {
    icon: 'caret-down',
    iconPrefix: 'fas',
    labelColor: 'none',
    subtitle: 'Dancers',
    children: <>
      <Dropdown
        icon='ellipsis-v'
        minimal
        minimalIcon={true}
        iconPrefix='fas'
        items={[]}
      />
    </>
  },
  list: [
    {
      subtitle: 'Scotty Distortion',
      icon: 'hashtag',
      minimalIcon: true,
      iconPrefix: 'fas',
      onClick: () => {},
      children: <>
        <Dropdown
          icon='ellipsis-v'
          minimal
          minimalIcon={true}
          iconPrefix='fas'
          items={[]}
        />
      </>
    },
    {
      subtitle: 'Sleepy',
      icon: 'hashtag',
      minimalIcon: true,
      iconPrefix: 'fas',
      onClick: () => {},
      active: true,
      children: <>
        <Dropdown
          icon='ellipsis-v'
          minimal
          minimalIcon={true}
          iconPrefix='fas'
          items={[]}
        />
      </>
    },
    {
      subtitle: 'Isabelle',
      icon: 'hashtag',
      minimalIcon: true,
      onClick: () => {},
      children: <>
        <Dropdown
          icon='ellipsis-v'
          minimal
          minimalIcon={true}
          iconPrefix='fas'
          items={[]}
        />
      </>
    }
  ]
}
Group.parameters = {
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
    </>
  },
  list: [
    {
      icon: 'info-circle',
      iconPrefix: 'fas',
      label: 'Name',
      title: 'Hydrodynamics',
      labelColor: 'none',
      onClick: () => {}
    },
    {
      icon: 'calendar-alt',
      iconPrefix: 'fas',
      label: 'Date',
      title: 'Monday, October 31, 2022',
      labelColor: 'none',
      active: true,
      onClick: () => {}
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
      </>
    },
    {
      icon: 'map-marker-alt',
      iconPrefix: 'fas',
      label: 'Location',
      onClick: () => {},
      title: 'South Loop',
      labelColor: 'none'
    },
    
  ]
}
Details.parameters = {
  layout: 'fullscreen'
}
