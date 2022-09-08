import React from 'react'
import styled from 'styled-components'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Grid, Box } from '../../internal'
import { Empty } from '../../internal'
import { AspectRatio } from '../../internal'

function ComponentA() {
  return <h2>A</h2>
}

function ComponentB() {
  return <h2>B</h2>
}

const PlaceholderContent = () => {
  return <Box px={.5}>
    <Grid maxWidth={10}>
      {
        new Array(20).fill(0).map(i =>
          <AspectRatio ratio={16/9}>
            <Empty />
          </AspectRatio>  
        )
      }
    </Grid>
  </Box>
}

import { Docking } from './Docking'

export default {
  title: 'Layout/Docking',
  component: Docking,
} as ComponentMeta<typeof Docking>

const Template: ComponentStory<typeof Docking> = args => {
  return <S.Container>
    <Docking {...args} />
  </S.Container>
}

const S = {
  Container: styled.div`
    height: 100vh;
  `
}
  
export const Default = Template.bind({})
Default.args = {
  config: {
    content: [
      {
        type: 'row',
        content: [
          {
            component: () => <PlaceholderContent />,
            title: 'Scenes'
          }, 
          {
            type: 'column',
            content: [
              {
                component: () => <PlaceholderContent />,
                title: 'Sources'
              },
              {
                component: () => <PlaceholderContent />,
                title: 'Effects'
              }
            ]
          }
        ]
      }
    ]
  }
}

Default.parameters = {
  layout: 'fullscreen'
}
