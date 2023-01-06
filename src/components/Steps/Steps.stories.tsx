import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Steps } from '../../internal'

export default {
  title: 'Display/Steps',
  component: Steps,
} as ComponentMeta<typeof Steps>

const Template: ComponentStory<typeof Steps> = (args) => {

  return <>
    <Steps 
      {...args} 
    />
  </>
}

export const Three = Template.bind({})
Three.args = {
  numberOfSteps: 3,
  activeStepIndex: 0
}

export const Five = Template.bind({})
Five.args = {
  numberOfSteps: 5,
  activeStepIndex: 2
}
