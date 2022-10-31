import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button, Modal, AspectRatio, Empty, Box } from '../../internal'

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
  </>
    
  )
}

const content = <AspectRatio ratio={16/9} >
  <Empty />
</AspectRatio>

export const ExtraLarge = Template.bind({})
ExtraLarge.args = {
  title: 'Extra Large Modal',
  icon: 'heart',
  iconPrefix: 'fas',
  content,
  size: 'xl'
}
ExtraLarge.parameters = {
  layout: 'fullscreen'
}

export const Large = Template.bind({})
Large.args = {
  title: 'Large Modal',
  icon: 'heart',
  iconPrefix: 'fas',
  content,
  size: 'lg'
}
Large.parameters = {
  layout: 'fullscreen'
}

export const Medium = Template.bind({})
Medium.args = {
  title: 'Medium Modal',
  icon: 'heart',
  iconPrefix: 'fas',
  content,
  size: 'md'
}
Medium.parameters = {
  layout: 'fullscreen'
}

export const Tall = Template.bind({})
Tall.args = {
  title: 'Tall Modal',
  icon: 'heart',
  iconPrefix: 'fas',
  content,
  size: 'tall'
}
Tall.parameters = {
  layout: 'fullscreen'
}

export const Small = Template.bind({})
Small.args = {
  title: 'Small Modal',
  icon: 'heart',
  iconPrefix: 'fas',
  content,
  size: 'sm'
}
Small.parameters = {
  layout: 'fullscreen'
}

export const Fullscreen = Template.bind({})
Fullscreen.args = {
  title: 'Fullscreen Modal',
  icon: 'heart',
  iconPrefix: 'fas',
  content,
  size: 'sm',
  fullscreen: true
}
Fullscreen.parameters = {
  layout: 'fullscreen'
}