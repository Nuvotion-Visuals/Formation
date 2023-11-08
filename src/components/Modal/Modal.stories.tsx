import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button, Modal, AspectRatio, Empty, Box, Steps } from '../../internal'

export default {
  title: 'Layout/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, set_isOpen] = useState(true)

  return (<>
    {
      isOpen 
        ? <Modal 
            {...args} 
            isOpen={isOpen} 
            onClose={() => set_isOpen(false)} 
          />
        : <Box p={1}>
            <Button 
              text='Open modal' 
              onClick={() => set_isOpen(true)} 
            />
          </Box>
    }
  </>)
}

export const Default = Template.bind({})
Default.args = {
  title: 'Default Modal',
  icon: 'heart',
  iconPrefix: 'fas',
  content: <Box minWidth={'20rem'}>
    <AspectRatio ratio={16 / 9}>
      <Empty />
    </AspectRatio>
  </Box>,
  fullscreen: false,
}
Default.parameters = {
  layout: 'fullscreen'
}

export const NoTitle = Template.bind({})
NoTitle.args = {
  content: <Box minWidth={'20rem'}>
    <AspectRatio ratio={16 / 9}>
      <Empty />
    </AspectRatio>
  </Box>,
  fullscreen: false,
  minimal: true
}
Default.parameters = {
  layout: 'fullscreen'
}

export const Solid = Template.bind({})
Solid.args = {
  title: 'Default Modal',
  icon: 'heart',
  iconPrefix: 'fas',
  content: <Box minWidth={'20rem'}>
    <AspectRatio ratio={16 / 9}>
      <Empty />
    </AspectRatio>
  </Box>,
  solid: true
}
Solid.parameters = {
  layout: 'fullscreen'
}

export const Fullscreen = Template.bind({})
Fullscreen.args = {
  title: 'Fullscreen Modal',
  icon: 'heart',
  iconPrefix: 'fas',
  content: <Box height='120vh' width={'100%'}>
    <Empty />
  </Box>,
  fullscreen: true,
  solid: true
}
Fullscreen.parameters = {
  layout: 'fullscreen'
}