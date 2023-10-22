import React, { FC, useState, memo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { DropCorners } from '../../internal'

type DropTargetProps = {
  onDrop: (data: any) => void,
  acceptedOrigins: string[],
  children: React.ReactNode
}

export const DropTarget: FC<DropTargetProps> = ({ onDrop, acceptedOrigins, children }) => {
  const [isOver, setIsOver] = useState(false)
  const dropTargetRef = useRef<HTMLDivElement | null>(null)

  const handleGlobalTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    const target = dropTargetRef.current as HTMLElement
    const rect = target.getBoundingClientRect()
    
    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
      if (acceptedOrigins.includes((window as any).dragOrigin)) {
        setIsOver(true)
      }
    } 
    else {
      setIsOver(false)
    }
  }

  const handleGlobalTouchEnd = async (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    const target = dropTargetRef.current as HTMLElement
    const rect = target.getBoundingClientRect()

    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {

      if ((window as any).dropData) {
        const data = JSON.parse((window as any).dropData)
        if (acceptedOrigins.includes(data.origin)) {
          await onDrop(data)
        }
      }

      setIsOver(false)
      delete (window as any).dropData
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsOver(false)
    const data = e.dataTransfer.getData('customData')
    if (data) {
      onDrop(JSON.parse(data))
    }
    delete (window as any).dragOrigin
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()

    if (acceptedOrigins.includes((window as any).dragOrigin)) {
      setIsOver(true)
    } 
    else {
      setIsOver(false)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    const { currentTarget, relatedTarget } = e
    if (!currentTarget.contains(relatedTarget as Node)) {
      setIsOver(false)
    }
  }

  useEffect(() => {
    window.addEventListener('touchmove', handleGlobalTouchMove)
    window.addEventListener('touchend', handleGlobalTouchEnd)

    return () => {
      window.removeEventListener('touchmove', handleGlobalTouchMove)
      window.removeEventListener('touchend', handleGlobalTouchEnd)
    }
  }, [])

  return (
    <S.DropTarget 
      ref={dropTargetRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {isOver && <DropCorners />}
      {children}
    </S.DropTarget>
  )
}

export default memo(DropTarget)

const S = {
  DropTarget: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `
}
