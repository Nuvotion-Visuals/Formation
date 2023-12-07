import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MultiSelect, AspectRatio, Box, ContextMenu, Spacer } from '../../internal'

export default {
  title: 'Input/MultiSelect',
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>

const Template: ComponentStory<typeof MultiSelect> = (args) => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`))
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])

  const handleDelete = () => {
    const newItems = items.filter((_, index) => {
      return !selectedIndices.includes(index)
    })
    setItems(newItems)
    setSelectedIndices([])
  }

  const handleDeleteIndex = (index: number) => {
    const newItems = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(newItems);
    const newSelectedIndices = selectedIndices.filter(i => i !== index);
    setSelectedIndices(newSelectedIndices);
  }

  const handleDuplicateIndex = (index: number) => {
    const newItems = [...items]
    const newItem = items[index]
    newItems.splice(index, 0, newItem)
    setItems(newItems)
  }

  return (
    <MultiSelect 
      {...args}
      selectedIndices={selectedIndices} 
      setSelectedIndices={setSelectedIndices}
      menuOptions={{
        items: [
          {
            text: 'Remove',
            onClick: () => handleDelete(),
          }
        ],
      }}
    >
      {
        items.map((item, index) => (
          <Box width={'100%'}>
            <ContextMenu
              disabled={selectedIndices.length !== 1}
              dropdownProps={{
                items: [
                  {
                    text: 'Duplicate',
                    onClick: () => handleDuplicateIndex(index),
                  },
                  {
                    text: 'Remove',
                    onClick: () => handleDeleteIndex(index),
                  }
                ],
              }}
            >
              <Box p={1}>
                <p>
                  {
                    item
                  }
                </p>
                <Spacer />
              </Box>
            </ContextMenu>
          </Box>
        ))
      }
    </MultiSelect>
  )
}

export const Default = Template.bind({})
Default.parameters = {
  layout: 'fullscreen'
}