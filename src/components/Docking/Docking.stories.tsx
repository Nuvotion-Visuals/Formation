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

const Template: ComponentStory<typeof Docking> = () => {
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

  const panelNames = Object.keys(panels)
  
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

  const [currentContent, setCurrentContent] = useState([])

  const [layoutManager, setLayoutManager] = useState<any>(null)

  const titles = getTitles(content)

  const [presetName, setPresetName] = useState('')
  
  const [presets, setPresets] = useState({})

  const addPreset = (name, value) => {
    setPresets(prevPresets => ({
      ...prevPresets,
      [name]: value
    }))
  }

  const presetNames = Object.keys(presets)

  const restorePreset = (presetName) => {
    const preset = presets[presetName]
    if (!preset) {
      console.error('Preset not found:', presetName)
      return
    }
  
    const restoreComponents = (items) => {
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
    const restoredContent = restoreComponents(preset)
    setContent(restoredContent)
  }

  const togglePanel = async (panelName: string) => {
    let newContent = [...content]
  
    const panelExists = (items: any[]): boolean => items.some(item => {
      if (item.title === panelName) {
        return true
      }
      if (item.content && Array.isArray(item.content)) {
        return panelExists(item.content)
      }
      return false
    })
  
    const removePanel = (items: any[]): any[] => items.reduce((acc, item) => {
      if (item.title === panelName) {
        return acc
      }
      if (item.content && Array.isArray(item.content)) {
        const filteredContent = removePanel(item.content)
        if (item.type === 'stack' && filteredContent.length === 0) {
          return acc
        }
        item = { ...item, content: filteredContent }
      }
      acc.push(item)
      return acc
    }, [])
  
    const findFinalStack = (content: any[]): any => {
      let finalStack = null
      for (const item of content) {
        if (item.type === 'stack') {
          finalStack = item
        } else if (item.content && Array.isArray(item.content)) {
          const nestedStack = findFinalStack(item.content)
          if (nestedStack) {
            finalStack = nestedStack
          }
        }
      }
      return finalStack
    }
  
    const addPanel = (): any[] => {
      const finalStack = findFinalStack(newContent)
      if (finalStack) {
        finalStack.content.push({
          component: panels[panelName],
          title: panelName,
          height: 100
        })
      } 
      else {
        // Handle the case where there is no stack in the content
        // For example, by creating a new stack or by choosing an alternative action
      }
      return newContent
    }
  
    if (panelExists(newContent)) {
      newContent = removePanel(newContent)
    } 
    else {
      newContent = addPanel()
    }
  
    console.log(newContent)
  }

  return <S.Container>
    <S.Header>
      <Dropdown
        text='Focus panel'
        compact
        items={titles.map(title => ({
          text: title,
          onClick: () => setActivePanelByTitle(layoutManager, title),
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
          onClick={() => {
            addPreset(presetName, currentContent)
            setPresetName('')
          }}
        />
      </GroupRadius>
      <Dropdown
        text='Load preset'
        compact
        items={presetNames.map(name => ({
          text: name,
          onClick: () => {
            restorePreset(name)
          },
          compact: true
        }))}
      />
      <Dropdown
        text='Toggle'
        compact
        items={panelNames.map(name => {
          const active = titles.includes(name)
          return ({
            icon: active ? 'check' : 'times',
            iconPrefix: 'fas',
            text: name,
            onClick: () => {
              togglePanel(name)
            },
            compact: true
          })
        })}
      />
    </S.Header>
    <Docking
      config={{
        content
      }}
      onLayoutReady={newLayoutManager => setLayoutManager(newLayoutManager)}
      onChange={newContent => {
        setCurrentContent(newContent)
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
  `
}
  
export const Default = Template.bind({})
Default.args = {

}

Default.parameters = {
  layout: 'fullscreen'
}
