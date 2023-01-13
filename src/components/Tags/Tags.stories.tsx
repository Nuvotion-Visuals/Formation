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
  allTags: ['rock', 'hip hop', 'pop', 'country', 'heavy metal', 'classical', 'electronic'],
  initialActiveTags: [],
}

export const InitialSelected = Template.bind({})
InitialSelected.args = {
  allTags: ['rock', 'hip hop', 'pop', 'country', 'heavy metal', 'classical', 'electronic'],
  initialActiveTags: ['rock', 'hip hop'],
}

export const MulitColored = Template.bind({})
MulitColored.args = {
  allTags: ['red', 'green', 'blue', 'yellow', 'violet'],
  initialActiveTags: ['red']
}
