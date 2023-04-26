import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Radio } from '../../internal'


export default {
  title: 'Input/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>

const Template: ComponentStory<typeof Radio> = (args) => {
  const [value, setValue] = useState<string>(args.value)
  return <Radio 
    {...args} 
    onChange={newValue => setValue(newValue)}
    value={value}
  />
}

export const Label = Template.bind({})
Label.args = {
  label: 'Visibility',
  icon: 'globe',
  iconPrefix: 'fas',
  options: [
    {
      value: 'private',
      title: 'Private',
      subtitle: 'Only you and the people you choose can access your Scene',
      name: 'visibility'
    },
    {
      value: 'unlisted',
      title: 'Unlisted',
      subtitle: 'Anyone with the link can see your Scene',
      name: 'visibility'
    },
    {
      value: 'public',
      title: 'Public',
      subtitle: 'Everyone can see your Scene',
      name: 'visibility'
    }
  ]
}

export const Avatars = Template.bind({})
Avatars.args = {
  label: 'Assignment',
  options: [
    {
      title: 'Tom',
      value: 'tom',
      labelColor: 'orange',
      name: 'assignment',
      icon: undefined
    },
    {
      title: 'Matt',
      value: 'matt',
      labelColor: 'purple',
      name: 'assignment',
      icon: undefined
    },
    {
      title: 'Ennio',
      value: 'ennio',
      labelColor: 'pink',
      name: 'assignment',
      icon: undefined
    }
  ]
}

export const Minimal = Template.bind({})
Minimal.args = {
  label: 'Minimal',
  icon: 'globe',
  iconPrefix: 'fas',
  minimal: true,
  options: [
    {
      value: 'private',
      title: 'Private',
      subtitle: 'Only you and the people you choose can access your Scene',
      name: 'visibility'
    },
    {
      value: 'unlisted',
      title: 'Unlisted',
      subtitle: 'Anyone with the link can see your Scene',
      name: 'visibility'
    },
    {
      value: 'public',
      title: 'Public',
      subtitle: 'Everyone can see your Scene',
      name: 'visibility'
    }
  ]
}
