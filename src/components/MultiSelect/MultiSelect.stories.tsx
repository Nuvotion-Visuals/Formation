import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MultiSelect } from './MultiSelect'
import { AspectRatio } from '../AspectRatio/AspectRatio'
import { Box } from '../Box/Box'

export default {
  title: 'Input/MultiSelect',
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>

const Template: ComponentStory<typeof MultiSelect> = (args) => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`))
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])

    const handleDelete = () => {
      const newItems = items.filter((_, index) => {
          return !selectedIndices.includes(index);
      });
      setItems(newItems);
      setSelectedIndices([]);
  };

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
      {items.map((item) => (
        <Box width={8}>
          <AspectRatio ratio={16/9}>
            <p>{item}</p>
          </AspectRatio>
        </Box>
      ))}
    </MultiSelect>
  )
}

export const Default = Template.bind({})
Default.parameters = {
  layout: 'fullscreen'
}