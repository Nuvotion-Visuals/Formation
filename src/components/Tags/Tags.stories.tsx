import React, { useState, useEffect } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'


import { Tags } from './Tags'

export default {
  title: 'Components/Tags',
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
    <div style={{color: 'white'}}>{ activeTags.join(', ') }</div>
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
