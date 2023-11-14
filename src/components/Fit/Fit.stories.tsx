import React, { useState, useEffect } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Box, Button, Fit } from '../../internal'

export default {
  title: 'Layout/Fit',
  component: Fit,
} as ComponentMeta<typeof Fit>

const Template: ComponentStory<typeof Fit> = args => {
  return <Box width={12}>
    <Fit
      {...args}
    />
  </Box>
}

export const Default = Template.bind({})
Default.args = {
  children: <>
    <Button
      text='A'
      compact
    />
     <Button
      text='B'
      compact
    />
     <Button
      text='C'
      compact
    />
  </>
}

export const DisableRadius = Template.bind({})
DisableRadius.args = {
  disableRadius: true,
  children: <>
    <Button
      text='A'
      compact
    />
     <Button
      text='B'
      compact
    />
     <Button
      text='C'
      compact
    />
  </>
}
