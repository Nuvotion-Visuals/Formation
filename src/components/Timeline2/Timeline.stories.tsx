import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Timeline } from './Timeline'
import styled from 'styled-components'

export default {
  title: 'Timeline/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>


const Template: ComponentStory<typeof Timeline> = args => {
  return <S.Container>
    <Timeline 
      {...args} 
    />
  </S.Container>
 
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
  `
}

export const Default = Template.bind({})
Default.args = {
  label: 'Time',
  iconPrefix: 'fas'
}
Default.parameters = {
  layout: 'fullscreen'
}
