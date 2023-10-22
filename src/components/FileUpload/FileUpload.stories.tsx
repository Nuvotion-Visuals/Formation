import React, { useState } from 'react'
import { Meta, ComponentStory } from '@storybook/react'
import { FileUpload } from '../../internal'
import styled from 'styled-components'
import { Box } from '../../internal'

export default {
  title: 'Input/FileUpload',
  component: FileUpload,
} as Meta

const Template: ComponentStory<typeof FileUpload> = (args) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  
  return (
    <div>
      <FileUpload 
        {...args} 
        onFileChange={(files) => {
          setSelectedFiles(files)
        }}
      />
      {args.multiple ? (
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              <Box mt={1}>
                {file.name}
              </Box>
            </li>
          ))}
        </ul>
      ) : (
        <Box mt={1}>
          {selectedFiles.length > 0 && selectedFiles[0].name}
        </Box>
      )}
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  multiple: true,
}

export const CustomIcon = Template.bind({})
CustomIcon.args = {
  icon: 'upload',
  multiple: true,
}

export const SingleFileUpload = Template.bind({})
SingleFileUpload.args = {
  multiple: false,
  dragMessage: 'Drag a file to upload',
  browseMessage: 'Browse a file'
}

const S = {
  CustomMessage: styled.div`
    width: 100%;
    text-align: center;
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color_Disabled);
    margin-top: .5rem;
  `
}
export const ImageOnly = Template.bind({})
ImageOnly.args = {
  multiple: true,
  dragMessage: 'Drag images to upload',
  browseMessage: 'Browse images',
  accept: 'image/png, image/jpeg',
  children: <S.CustomMessage>Accepted formats: <strong>PNG, JPEG</strong></S.CustomMessage>,
}

