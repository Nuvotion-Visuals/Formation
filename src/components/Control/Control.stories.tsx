import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Box, Button, Control, Gap, NumberSlider } from '../../internal'

export default {
  title: 'Display/Control',
  component: Control,
} as ComponentMeta<typeof Control>

const Template: ComponentStory<typeof Control> = args => 
  <Control {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Scale',
  children: <NumberSlider
    precise
    value={50}
    onChange={() => {}}
    min={0}
    max={100}
  />
}

export const Emphasize = Template.bind({})
Emphasize.args = {
  label: 'Scale',
  emphasize: true,
  children: <NumberSlider
    precise
    value={50}
    onChange={() => {}}
    min={0}
    max={100}
  />
}

const MultiTemplate: ComponentStory<typeof Control> = args => 
<Box width='100%' wrap>
  <Control {...args} />
  <Control {...args} />
  <Control {...args} />
  <Control {...args} />
</Box>

export const Multiple = MultiTemplate.bind({})
Multiple.args = {
  label: 'Scale',
  children: <Gap gap={.125} disableWrap>
    <NumberSlider
      precise
      value={50}
      onChange={() => {}}
      min={0}
      max={100}
    />
  
  </Gap>
}
