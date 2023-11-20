import React, { useRef } from 'react'
import { Box, Button, ButtonProps, Gap, Icon } from '../../internal'
import { FileDrop } from '../../internal'
import styled from 'styled-components'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange?: (files: File[]) => void
  children?: React.ReactNode
  icon?: IconName
  iconPrefix?: IconPrefix
  dragMessage?: string
  browseMessage?: string
  minimal?: boolean
  buttonProps?: ButtonProps
}

/**
 * `FileUpload` is a component that provides a user-friendly interface for uploading files either by dragging and dropping or by browsing files via a dialog. It features customizable messages and button properties, and it can be styled minimally.
 *
 * @component
 * @param {function} [onFileChange] - Callback function that is called when files are selected or dropped. It receives an array of `File` objects.
 * @param {React.ReactNode} [children] - Optional children to be rendered inside the drop area.
 * @param {IconName} [icon] - Optional FontAwesome icon name for display.
 * @param {IconPrefix} [iconPrefix] - Optional FontAwesome icon prefix.
 * @param {string} [dragMessage] - Message displayed for the drag area, defaults to 'Drag files to upload'.
 * @param {string} [browseMessage] - Message displayed on the browse files button, defaults to 'Browse files'.
 * @param {boolean} [minimal] - If true, renders the button without the default layout and messages.
 * @param {ButtonProps} [buttonProps] - Optional properties to pass to the button component.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} rest - Any remaining HTML input attributes.
 *
 * @example
 * // Basic file upload with default messages
 * <FileUpload onFileChange={(files) => console.log(files)} />
 *
 * @example
 * // Minimal file upload with a custom icon
 * <FileUpload 
 *   minimal 
 *   icon="file-upload" 
 *   onFileChange={(files) => console.log(files)} 
 *   buttonProps={{ text: 'Upload' }}
 * />
 */
export const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileChange, 
  icon,
  iconPrefix,
  children, 
  dragMessage = 'Drag files to upload', // Default value
  browseMessage = 'Browse files', // Default value
  minimal = false,  // New prop
  buttonProps,
  ...rest 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    if (onFileChange) {
      onFileChange(newFiles)
    }
  }

  const handleFileDrop = (droppedFiles: File[]) => {
    if (onFileChange) {
      onFileChange(droppedFiles)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  if (minimal) {
    return (
      <FileDrop onFileDrop={handleFileDrop}>
        <Button
          {...buttonProps}
          onClick={(e) => {
            triggerFileInput()
            if (buttonProps?.onClick) {
              buttonProps.onClick(e)
            }
          }} 
        />
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleInputChange}
          {...rest}
        />
      </FileDrop>
    )
  }

  return (
    <S.FileUpload onClick={triggerFileInput}>
      <FileDrop onFileDrop={handleFileDrop}>
        <Box width='100%' py={1.75}>
          <Gap gap={.75}>
            <Box width={'100%'}>
              <Icon
                icon={icon ? icon : 'cloud-upload'}
                iconPrefix={iconPrefix}
                size='3x'
              />
            </Box>
            <S.Message>
              {dragMessage}
            </S.Message>
            <S.SubMessage>
              or
            </S.SubMessage>

           <Box width='100%'>
            <Button 
              onClick={e => {
                e.stopPropagation()
                triggerFileInput()
              }} 
              text={browseMessage} 
              primary 
            />
           </Box>

           {
            children
           }
          </Gap>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleInputChange}
            {...rest}
          />
        </Box>
      </FileDrop> 
    </S.FileUpload>
  )
}


const S = {
  FileUpload: styled.div`
    width: 100%;
    border: 2px dashed var(--F_Surface_1);
    border-radius: var(--F_Tile_Radius);
    cursor: pointer;
  `,
  Message: styled.div`
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color);
    width: 100%;
    text-align: center;
  `,
  SubMessage: styled.div`
   font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color_Disabled);
   width: 100%;
   text-align: center;
 `,
}
