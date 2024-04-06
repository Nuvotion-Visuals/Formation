import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Box, Button, Dropdown, GroupRadius, TextInput, Docking, DockingUtils } from '../../internal'

export default {
  title: 'Layout/Docking',
  component: Docking,
} as ComponentMeta<typeof Docking>

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
  'Notes': () => <></>
}

const defaultContent = [
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
]

const Template: ComponentStory<typeof Docking> = () => {
  const [content, set_content] = useState(defaultContent)
  const [serializableContent, set_serializableContent] = useState<any>([])
  const [layoutManager, set_layoutManager] = useState<any>(null)
  const activePanelTitles = DockingUtils.getPanelTitles(content)

  const restoreComponents = (items: any[]) => {
    return items.map(item => {
      if (item.component && panels[item.title]) {
        return {
          ...item,
          component: panels[item.title],
        }
      }
      if (item.content && Array.isArray(item.content)) {
        return {
          ...item,
          content: restoreComponents(item.content)
        }
      }
      return item
    })
  }

  const [presetName, setPresetName] = useState('')
  const [presets, setPresets] = useState<any>({})
  const presetNames = Object.keys(presets)

  const addPreset = (name: string, value: any) => {
    setPresets(prevPresets => ({
      ...prevPresets,
      [name]: value
    }))
    setPresetName('')
  }

  const restorePreset = (presetName: string) => {
    const preset = presets[presetName]
    if (preset) {
      const restoredContent = restoreComponents(preset)
      set_content(restoredContent)
    }
  }

  const toggle = async (panelName: string) => {
    const newContent = DockingUtils.togglePanel(serializableContent, panelName)
    set_content(restoreComponents(newContent))
  }
  
  useEffect(() => {
    if (layoutManager) {
      const newContent = DockingUtils.getCurrentLayout(layoutManager)
      set_serializableContent(newContent)
    }
  }, [content, layoutManager])

  return <S.Container>
    <S.Header>
      <Dropdown
        text='Focus panel'
        compact
        items={activePanelTitles.map(title => ({
          text: title,
          onClick: () => DockingUtils.setActivePanelByTitle(layoutManager, title),
          compact: true
        }))}
      />
      <GroupRadius>
        <Box width={8}>
          <TextInput
            value={presetName}
            onChange={val => setPresetName(val)}
            compact
          />
        </Box>
        <Button
          text='Save preset'
          compact
          onClick={() => addPreset(presetName, serializableContent)}
          disabled={presetName === ''}
        />
      </GroupRadius>
      <Dropdown
        text='Load preset'
        compact
        items={presetNames.map(name => ({
          text: name,
          onClick: () => restorePreset(name),
          compact: true
        }))}
      />
      <Dropdown
        text='Toggle'
        compact
        items={Object.keys(panels).map(name => {
          const active = activePanelTitles.includes(name)
          return ({
            icon: active ? 'check' : 'times',
            iconPrefix: 'fas',
            text: name,
            onClick: () => toggle(name),
            compact: true
          })
        })}
      />
    </S.Header>
    <Docking
      config={{ content }}
      onLayoutReady={newLayoutManager => set_layoutManager(newLayoutManager)}
      onChange={newContent => {
        set_serializableContent(newContent)
      }}
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
    overflow: hidden;
  `,
  Container: styled.div`
    height: calc(calc(100vh - var(--F_Input_Height)) - 1px);
    width: 100vw;
  `
}
  
export const Default = Template.bind({})
Default.args = {

}

Default.parameters = {
  layout: 'fullscreen'
}
