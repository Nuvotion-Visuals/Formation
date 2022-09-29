import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ExpandableLists } from './ExpandableLists'

import { TextInput, Box, LineBreak, Button, Gap, Label } from '../../internal'

export default {
  title: 'Items/ExpandableLists',
  component: ExpandableLists,
} as ComponentMeta<typeof ExpandableLists>

const Template: ComponentStory<typeof ExpandableLists> = args => {
  const [value, set_value] = useState<any>([])

  const [newItemName, set_newItemName] = useState('')

  const remove = (index: number) => {
    set_value(value.filter((item, i) => index !== i))
  }

  const add = () => {
    set_newItemName('')
    set_value([
      ...value,
      {
        name: newItemName,
        options: [
          {
            icon: 'ellipsis-v',
            iconPrefix: 'fas',
            dropDownOptions: 
              [
                {
                  icon: 'trash-alt',
                  text: 'Trash',
                  onClick: () => {
                    remove(value.length)
                    
                  }
                },
              ] 
          }
        ]
      }
    ])
  }

  return (<>
    <Box p={.75}>
      <Gap disableWrap={true}>
      <TextInput 
        value={newItemName}
        icon='user'
        iconPrefix='fas'
        label='Name'
        onChange={newValue => set_newItemName(newValue)}
        onEnter={newItemName !== '' ? add : undefined}
      />
      <Button
        text='Add'
        icon='plus'
        iconPrefix='fas'
        onClick={add}
        disabled={newItemName === ''}
      />
      
      </Gap>
    </Box>

    <LineBreak />

    <ExpandableLists 
      {...args} 
      // onReorder={newValue => set_value(newValue)}
    />
  </>
  )
}

export const Positions = Template.bind({})
Positions.args = {
  expandableLists: [
    {
      expanded: false,
      value: {
        item: {
          icon: 'chevron-up',
          iconPrefix: 'fas',
          color: 'none',
          title: 'Dancers',
          children: <>
            <Label label={'2 / 3'} color={'darkorange'}/>
          </>,
          options: [
            {
              icon: 'ellipsis-v',
              iconPrefix: 'fas'
            }
          ]
        },
        list: [
          {
            name: 'Scotty Distortion',
            onClick: () => {},
            children: <>
              <Label label={'confirmed'} color={'green'}/>
            </>,
            options: [
              {
                icon: 'ellipsis-v',
                iconPrefix: 'fas'
              }
            ]
          },
          {
            name: 'Sleepy',
            onClick: () => {},
            children: <>
              <Label label={'confirmed'} color={'green'}/>
            </>,
            options: [
              {
                icon: 'ellipsis-v',
                iconPrefix: 'fas'
              }
            ]
          },
          {
            name: 'Isabelle',
            onClick: () => {},
            children: <>
              <Label label={'tentative'} color={'darkorange'}/>
            </>,
            options: [
              {
                icon: 'ellipsis-v',
                iconPrefix: 'fas'
              }
            ]
          }
        ]
      }
    }
  ]
}
Positions.parameters = {
  layout: 'fullscreen'
}
