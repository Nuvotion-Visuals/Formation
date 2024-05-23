import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { DropCorners } from '../../internal'

interface FileWithPath extends File {
  path: string
}

interface Props {
  onFileDrop: (files: FileWithPath[]) => void
  children: ReactNode,
  single?: boolean,
  expandVertical?: boolean
}

/**
 * `FileDrop` is a component that provides a drop zone for file uploads. Users can drag and drop files onto the area to upload them.
 * It visually responds to dragging files over it by displaying corners indicating it's an active drop zone. The component can handle single
 * or multiple file uploads depending on the `single` prop.
 *
 * @component
 * @param {function} onFileDrop - Callback function that is called when files are dropped onto the area. Receives an array of `File` objects.
 * @param {ReactNode} children - Elements to be rendered inside the drop zone.
 * @param {boolean} [single] - If set to true, the drop zone will only accept a single file.
 * @param {boolean} [expandVertical] - Fill the vertical space of the container.
 *
 * @example
 * // FileDrop for a single file upload
 * <FileDrop onFileDrop={(files) => handleFile(files[0])} single>
 *   <p>Drag and drop your file here or click to select a file to upload.</p>
 * </FileDrop>
 *
 * @example
 * // FileDrop for multiple file uploads
 * <FileDrop onFileDrop={(files) => handleFiles(files)}>
 *   <p>Drag and drop your files here or click to select files to upload.</p>
 * </FileDrop>
 */
export const FileDrop: React.FC<Props> = ({ 
  onFileDrop, 
  single, 
  children,
  expandVertical
}) => {
  const [isHovering, setIsHovering] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!(window as any).dragOrigin) {
      setIsHovering(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsHovering(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsHovering(false)

    const fileList = e.dataTransfer.files

    if (fileList.length > 0) {
      const filesArray = Array.from(fileList)
      // @ts-ignore
      onFileDrop(single ? [filesArray[0]] : filesArray)
    }
  }

  return (
    <S.FileDrop
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      isHovering={isHovering}
      expandVertical={expandVertical}
    >
      {
        isHovering && <DropCorners />
      }
      {children}
    </S.FileDrop>
  )
}

const S = {
  FileDrop: styled.div<{ 
    isHovering: boolean,
    expandVertical?: boolean
  }>`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    align-items: start;
    flex-direction: column;
    width: 100%;
    height: ${props => props.expandVertical ? '100%' : 'auto'};
    justify-content: flex-start;
    background: ${props => props.isHovering ? 'var(--Hover)' : 'none'};
  `
}
