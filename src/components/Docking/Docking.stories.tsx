import React, { useState } from 'react'
import styled from 'styled-components'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Docking } from './Docking'
import { getTitles, setActivePanelByTitle } from './docking-interface'
import { Box, Button, Dropdown, GroupRadius, TextInput } from '../../internal'

export default {
  title: 'Layout/Docking',
  component: Docking,
} as ComponentMeta<typeof Docking>

const Template: ComponentStory<typeof Docking> = args => {
  const panels = {
    'Playlist': () => <></>,
    'Program': () => <></>,
    'Preview': () => <></>,
    'Selection': () => <></>,
    'Sources': () => <></>,
    'Effects': () => <></>,
    'Transitions': () => <></>,
    'Scenes': () => <></>,
    'Shortcuts': () => <></>,
  }
  
  // Define the content state using the panels object
  const [content, setContent] = useState([
    {
      type: 'column',
      content: [
        {
          type: 'row',
          content: [
            {
              type: 'stack',
              content: [
                {
                  component: panels['Playlist'],
                  title: 'Playlist'
                },
              ]
            },
          ]
        },
        {
          type: 'row',
          content: [
            {
              type: 'column',
              content: [
                {
                  component: panels['Program'],
                  title: 'Program',
                  height: 60
                },
                {
                  component: panels['Preview'],
                  title: 'Preview',
                  height: 40
                }
              ]
            },
            {
              type: 'stack',
              content: [
                {
                  component: panels['Selection'],
                  title: 'Selection'
                },
              ]
            },
            {
              type: 'stack',
              content: [
                {
                  component: panels['Sources'],
                  title: 'Sources'
                },
                {
                  component: panels['Effects'],
                  title: 'Effects'
                },
                {
                  component: panels['Transitions'],
                  title: 'Transitions'
                },
                {
                  component: panels['Scenes'],
                  title: 'Scenes'
                },
                {
                  component: panels['Shortcuts'],
                  title: 'Shortcuts'
                },
              ]
            },
          
          ]
        }
      ]
    }
  ])

  const [layoutManager, setLayoutManager] = useState<any>(null)

  const titles = getTitles(content)

  const [prestName, setPresetName] = useState('')
  const [presetNames, setPresetNames] = useState<string[]>([])

  return <S.Container>
    <S.Header>
      <GroupRadius>
      <Dropdown
        text='Focus panel'
        compact
        items={titles.map(title => ({
          text: title,
          onClick: () => setActivePanelByTitle(layoutManager, title),
          compact: true
        }))}
      />
      <Box width={8}>
        <TextInput
          value={prestName}
          onChange={val => setPresetName(val)}
          compact
        />
      </Box>
      <Button
        text='Save preset'
        compact
        onClick={() => {
         
        }}
      />
      <Dropdown
        text='Load preset'
        compact
        items={presetNames.map(name => ({
          text: name,
          onClick: () => {

          },
          compact: true
        }))}
      />
      </GroupRadius>
    </S.Header>
    <Docking
      config={{
        content
      }}
      onLayoutReady={newLayoutManager => setLayoutManager(newLayoutManager)}
    />
  </S.Container>
}

const S = {
  Header: styled.div`
    width: calc(100vw - 1rem);
    padding: 0 .5rem;
    height: var(--F_Input_Height);
    display: flex;
    align-items: center;
    gap: .5rem;
    border-bottom: 1px solid var(--F_Surface);
  `,
  Container: styled.div`
    height: calc(calc(100vh - var(--F_Input_Height)) - 1px);
  `
}
  
export const Default = Template.bind({})
Default.args = {

}

Default.parameters = {
  layout: 'fullscreen'
}
