import React, { useState, useEffect } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { union, xor } from 'lodash'

import { Tags } from './Tags'

export default {
  title: 'Formation/Tags',
  component: Tags,
} as ComponentMeta<typeof Tags>

const defaultTags = ['rock', 'hip hop', 'pop', 'country', 'heavy metal', 'classical', 'electronic']

const Template: ComponentStory<typeof Tags> = args => {
  const [activeTags, setActiveTags] = useState<string[]>([]) // initially empty

  return <Tags
    noPadding={true}
    allTags={defaultTags} 
    activeTags={activeTags}
    setActiveTag={tag => 
      setActiveTags(activeTags.includes(tag) 
        ? xor(activeTags, [tag]) 
        : union(activeTags, [tag])
      )  
    } 
  />
}

export const Regular = Template.bind({})
Regular.args = {

}
