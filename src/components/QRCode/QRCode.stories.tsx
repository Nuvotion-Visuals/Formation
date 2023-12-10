import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { QRCode } from './QRCode'

export default {
  title: 'Navigation/QRCode',
  component: QRCode,
} as ComponentMeta<typeof QRCode>

const Template: ComponentStory<typeof QRCode> = (args) => <QRCode {...args} />

export const Basic = Template.bind({})
Basic.args = {
  data: 'https://formation.avsync.live'
}

export const Size = Template.bind({})
Size.args = {
  data: 'https://formation.avsync.live',
  width: 150,
  height: 150
}

export const Color = Template.bind({})
Color.args = {
  data: 'https://formation.avsync.live',
  dotsOptions: { 
    color: 'blue' 
  },
  backgroundOptions: { 
    color: 'yellow' 
  }
}

export const Image = Template.bind({})
Image.args = {
  data: 'https://formation.avsync.live',
  image: 'favicon.png',
  imageOptions: { 
    crossOrigin: 'anonymous',
    margin: 10
  },
  dotsOptions: { 
    type: 'rounded', 
    color: '#121212' 
  },
  backgroundOptions: { 
    color: 'white' 
  }
}

export const RoundedDots = Template.bind({})
RoundedDots.args = {
  data: 'https://formation.avsync.live',
  dotsOptions: { 
    type: 'rounded' 
  }
}

export const CustomMargin = Template.bind({})
CustomMargin.args = {
  data: 'https://formation.avsync.live',
  margin: 10
}

export const CustomErrorCorrection = Template.bind({})
CustomErrorCorrection.args = {
  data: 'https://formation.avsync.live',
  errorCorrection: 'H'
}
