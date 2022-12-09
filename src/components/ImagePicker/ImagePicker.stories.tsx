import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button, ImagePicker } from '../../internal'

export default {
  title: 'Input/ImagePicker',
  component: ImagePicker,
} as ComponentMeta<typeof ImagePicker>

const Template: ComponentStory<typeof ImagePicker> = args => {
  const [value, set_value] = useState(args.value)
  return (<>
    <ImagePicker {...args}
      value={value}
      onChange={newValue => set_value(newValue)}
    />
  </>)
}
  
export const Profile = Template.bind({})
Profile.args = {
  label: 'profile picture',
  ratio: 1,
  circle: true,
  icon: 'user-circle',
  iconPrefix: 'fas'
}

  
export const Label = Template.bind({})
Label.args = {
  ratio: 2,
  label: 'poster',
  icon: 'image',
  iconPrefix: 'fas',
  placeholderRatio: 2.5/1
}

export const Hero = Template.bind({})
Hero.args = {
  hero: true,
  label: 'poster',
  ratio: 2,
  icon: 'image',
  iconPrefix: 'fas'
}


