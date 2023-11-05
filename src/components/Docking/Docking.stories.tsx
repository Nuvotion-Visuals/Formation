import React from 'react'
import styled from 'styled-components'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Docking } from './Docking'
import { AspectRatio, Box, Empty, Grid } from '../../internal'

export default {
  title: 'Layout/Docking',
  component: Docking,
} as ComponentMeta<typeof Docking>


const PlaceholderContent = () => {
  return <Box px={.5}>
    <Grid maxWidth={10}>
      {
        new Array(60).fill(0).map(i =>
          <AspectRatio ratio={16/9}>
            <Empty />
          </AspectRatio>  
        )
      }
    </Grid>
  </Box>
}

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
        type: 'column',
        content: [
          {
            type: 'row',
            content: [
              {
                type: 'column',
                content: [
                  {
                    component: () => <></>,
                    title: 'Playlist'
                  },
                ]
              }
            ]
          },
          {
            type: 'row',
            content: [
              {
                component: () => <></>,
                title: 'Visuals'
              },
              {
                type: 'stack',
                content: [
                  {
                    component: () => <></>,
                    title: 'Selection'
                  },
                ]
              },
              {
                type: 'stack',
                content: [
                  {
                    component: () => <></>,
                    title: 'Sources'
                  },
                  {
                    component: () => <></>,
                    title: 'Effects'
                  },
                  {
                    component: () => <></>,
                    title: 'Transitions'
                  },
                  {
                    component: () => <></>,
                    title: 'Scenes'
                  },
                ]
              },
            
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
