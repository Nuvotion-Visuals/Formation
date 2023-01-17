import React, { useState, useEffect } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Tags } from '../../internal'

export default {
  title: 'Input/Tags',
  component: Tags,
} as ComponentMeta<typeof Tags>

const Template: ComponentStory<typeof Tags> = args => {
  const [activeTags, set_activeTags] = useState<string[]>([]) // initially empty

  return <>
    <Tags
      {...args}
      noPadding={true}
      onChange={tags => set_activeTags(tags)}
    />
  </>
}

export const NoneSelected = Template.bind({})
NoneSelected.args = {
  allTags: [{ name: 'rock' }, { name: 'hip hop' }, { name: 'pop' }, { name: 'country' }, { name: 'heavy metal' }, { name: 'classical' }, { name: 'electronic' }],
  initialActiveTags: [],
}

export const InitialSelected = Template.bind({})
InitialSelected.args = {
  allTags: [{ name: 'rock' }, { name: 'hip hop' }, { name: 'pop' }, { name: 'country' }, { name: 'heavy metal' }, { name: 'classical' }, { name: 'electronic' }],
  initialActiveTags: ['rock', 'hip hop'],
}

export const MulitColored = Template.bind({})
MulitColored.args = {
  allTags: [
    {
      name: 'red',
      background: 'red'
    },
    {
      name: 'green',
      background: 'green'  }, 
    {
      name: 'blue',
      background: 'blue'  }, 
    {
      name: 'yellow',
      background: 'yellow'  }, 
    {
      name: 'violet',
      background: 'violet'  }
  ],
  initialActiveTags: ['red']
}
