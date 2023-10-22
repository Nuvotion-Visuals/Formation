import React, { useState } from 'react'
import { Meta, ComponentStory } from '@storybook/react'
import { FileDrop } from './FileDrop'
import styled from 'styled-components'
import { Box } from '../Box/Box'

export default {
  title: 'DND/FileDrop',
  component: FileDrop,
} as Meta

const Template: ComponentStory<typeof FileDrop> = (args: any) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  
  return (
    <div>
      <S.Outline>
        <FileDrop
          {...args}
          onFileDrop={(files) => {
            setSelectedFiles(files)
          }}
        >
          <Box width='100%' height={'100%'}>
            Drop your file{args.single ? '' : 's'} here
          </Box>
        </FileDrop>
      </S.Outline>
      
      <ul>
        {selectedFiles.map((file, index) => (
          <li key={index}>{file.name} - {file.size} bytes</li>
        ))}
      </ul>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const SingleFile = Template.bind({})
SingleFile.args = {
  single: true
}

const S = {
  Outline: styled.div`
    box-shadow: var(--F_Outline);
    width: 8rem;
    height: 8rem;
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 1rem;
  `
}