import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button, Modal, AspectRatio, Empty, Box, Steps, Gap } from '../../internal'

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

const content = <>
<AspectRatio ratio={16/9} >
  <Empty />
</AspectRatio><AspectRatio ratio={16/9} >
  <Empty />
</AspectRatio>
<AspectRatio ratio={16/9} >
  <Empty />
</AspectRatio>
</>

export const ExtraLarge = Template.bind({})
ExtraLarge.args = {
  title: 'Extra Large Modal',
  icon: 'heart',
  iconPrefix: 'fas',
  content,
  size: 'xl',
  onBack: undefined
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
  size: 'lg',
  onBack: undefined
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
  size: 'md',
  onBack: undefined
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
  size: 'tall',
  onBack: undefined
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
  size: 'sm',
  onBack: undefined
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
  fullscreen: true,
  onBack: undefined
}
Fullscreen.parameters = {
  layout: 'fullscreen'
}

export const Back = Template.bind({})
Back.args = {
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

export const Footer = Template.bind({})
Footer.args = {
  title: 'Footer',
  icon: 'heart',
  iconPrefix: 'fas',
  content,
  size: 'lg',
  onBack: undefined,
  hasSteps: true,
  footerContent: <>
    <Button
        text='Next'
        primary={true}
        expand={true}
      />
  </>
}
Footer.parameters = {
  layout: 'fullscreen'
}

export const FooterFullscreen = Template.bind({})
FooterFullscreen.args = {
  title: 'Footer fullscreen',
  icon: 'heart',
  iconPrefix: 'fas',
  content,
  size: 'sm',
  fullscreen: true,
  hasSteps: true,
  onBack: undefined,
  stepsContent: <>
  <Steps activeStepIndex={0} numberOfSteps={3} />
  </>,
  footerContent: <>
    <Button
        text='Next'
        primary={true}
        expand={true}
      />
  </>
}
FooterFullscreen.parameters = {
  layout: 'fullscreen'
}

export const FooterFullscreenNoSteps = Template.bind({})
FooterFullscreenNoSteps.args = {
  title: 'Footer fullscreen',
  icon: 'heart',
  iconPrefix: 'fas',
  content,
  size: 'sm',
  fullscreen: true,
  onBack: undefined,
  footerContent:  <>
  
  <Button
      text='Next'
      primary={true}
      expand={true}
    />
</>
}
FooterFullscreen.parameters = {
  layout: 'fullscreen'
}