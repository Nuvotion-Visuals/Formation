import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Page } from '../../internal'
import { Empty } from '../../internal'
import { AspectRatio } from '../../internal'

export default {
  title: 'Layout/Page',
  component: Page,
} as ComponentMeta<typeof Page>

const Template: ComponentStory<typeof Page> = args => 
  <Page >
    <AspectRatio ratio={1/3}>
      <Empty />
    </AspectRatio>  
  
  </Page>

export const Regular = Template.bind({})
Regular.args = {
}
Regular.parameters = {
  layout: 'fullscreen'
}


