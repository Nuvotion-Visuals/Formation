import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Envelope } from '../../internal'

export default {
  title: 'Input/Envelope',
  component: Envelope,
} as ComponentMeta<typeof Envelope>




const Template: ComponentStory<typeof Envelope> = props => {
  // todo
  // partent give child these props
  // duration
  // customEase curve
  // 

  return <Envelope {...props} />
}
  

export const Default = Template.bind({})
Default.props = {

}
