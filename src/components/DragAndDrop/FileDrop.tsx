import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { DropCorners } from '../../internal'

interface Props {
  onFileDrop: (files: File[]) => void
  children: ReactNode,
  single?: boolean
}

export const FileDrop: React.FC<Props> = ({ onFileDrop, single, children }) => {
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
      onFileDrop(single ? [filesArray[0]] : filesArray)
    }
  }

  return (
    <S.FileDrop
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      isHovering={isHovering}
    >
      {
        isHovering && <DropCorners />
      }
      {children}
    </S.FileDrop>
  )
}

const S = {
  FileDrop: styled.div<{ isHovering: boolean }>`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    align-items: start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    background: ${props => props.isHovering ? 'var(--Hover)' : 'none'};
  `
}
