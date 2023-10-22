import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { FileBrowser } from './FileBrowser'
import { ComponentStory } from '@storybook/react'
import { Box, DropTarget, Gap, LineBreak, blobURLToFile } from '../../internal'
import styled from 'styled-components'

export default {
  title: 'Input/FileBrowser',
  component: FileBrowser,
} as Meta

const Template: ComponentStory<typeof FileBrowser> = (args) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  return (<Gap>
    <S.Outline>
      <DropTarget
        onDrop={data => {
          (async () => {
            const file = await blobURLToFile(data.file, data.name)
            setSelectedFiles([file])
          })()
        }}
        acceptedOrigins={['source']}
      >
        <Box width='100%' height='100%'>
          Drop here
        </Box>
      </DropTarget>
     
    </S.Outline>

    {
      selectedFiles.length > 0 &&
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>{file.name} - {file.size} bytes</li>
          ))}
        </ul>
    }

    <LineBreak />
   
    <FileBrowser 
      {...args} 
      setPendingSourceToApply={(name) => console.log(`Pending source to apply: ${name}`)}
      setLayerSource={(name) => console.log(`Layer source: ${name}`)}
      handleFileClickProp={(name, file) => setSelectedFiles([file])}
    />
  </Gap>
  )
}

export const Default = Template.bind({})
Default.args = {
  sourceNames: ['Source 1', 'Source 2'],
  selectedSourceName: 'Source 1',
  
}

const S = {
  Outline: styled.div`
    box-shadow: var(--F_Outline);
    width: 8rem;
    height: 8rem;
    display: flex;
    align-items: center;
    text-align: center;
  `
}