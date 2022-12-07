import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AspectRatio } from '../../internal'
import { Empty } from '../../internal'
import { ImagePicker } from '../../internal'

export default {
  title: 'Input/ImagePicker',
  component: ImagePicker,
} as ComponentMeta<typeof ImagePicker>

const Template: ComponentStory<typeof ImagePicker> = args => {
  const [value, set_value] = useState(args.value)
  return (
    <ImagePicker {...args}
      value={value}
      onChange={newValue => set_value(newValue)}
    />
  )
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
  iconPrefix: 'fas'
}

export const Hero = Template.bind({})
Hero.args = {
  hero: true,
  label: 'poster',
  ratio: 2,
  icon: 'image',
  iconPrefix: 'fas'
}


export const ImageSelected = Template.bind({})
ImageSelected.args = {
  value: 'https://imageio.forbes.com/specials-images/imageserve/630c01b0d393e40c9e68eccc/Cover-of-Pink-Floyd-s-Animals--2018-Remix--/960x0.jpg?format=jpg&width=960'

}

