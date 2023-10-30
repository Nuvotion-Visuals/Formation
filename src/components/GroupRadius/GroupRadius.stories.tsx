import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Box, Button, GroupRadius } from '../../internal'

export default {
  title: 'Layout/GroupRadius',
  component: GroupRadius,
} as ComponentMeta<typeof GroupRadius>

const Template: ComponentStory<typeof GroupRadius> = args => {
  return <Box>
    <GroupRadius 
      {...args} 
    />
  </Box>
}
  
    
export const Default = Template.bind({})
Default.args = {
  children: <>
    <Button
      text='Item 1'
    />
     <Button
      text='Item 2'
    />
     <Button
      text='Item 2'
    />
  </>
}

