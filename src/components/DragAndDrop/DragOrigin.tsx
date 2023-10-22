import React, { FC, memo, useRef, useEffect } from 'react'
import styled from 'styled-components'

type DragOriginProps = {
  data: any,
  children: React.ReactNode
}

export const DragOrigin: FC<DragOriginProps> = ({ children, data }) => {
  const dragOriginRef = useRef<HTMLDivElement | null>(null)
  const dragPreviewRef = useRef<HTMLElement | null>(null)
  const touchOffsetRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 })

  const createDragPreview = (e: TouchEvent) => {
    const rect = (dragOriginRef.current as HTMLElement).getBoundingClientRect()

    if (!dragPreviewRef.current) {
      dragPreviewRef.current = (dragOriginRef.current as HTMLElement).cloneNode(true) as HTMLElement
      dragPreviewRef.current.style.position = 'fixed'
      dragPreviewRef.current.style.width = `${rect.width}px`
      dragPreviewRef.current.style.height = `${rect.height}px`
      dragPreviewRef.current.style.opacity = '0.5'
      dragPreviewRef.current.style.pointerEvents = 'none'
      dragPreviewRef.current.style.zIndex = '9999'
      document.body.appendChild(dragPreviewRef.current)
    }

    const touch = e.touches[0]
    touchOffsetRef.current.x = touch.clientX - rect.left
    touchOffsetRef.current.y = touch.clientY - rect.top

    updateDragPreviewPosition(e)
  }

  const updateDragPreviewPosition = (e: TouchEvent) => {
    if (dragPreviewRef.current) {
      const touch = e.touches[0]

      dragPreviewRef.current.style.top = `${touch.clientY - touchOffsetRef.current.y}px`
      dragPreviewRef.current.style.left = `${touch.clientX - touchOffsetRef.current.x}px`
    }
  }

  const removeDragPreview = () => {
    if (dragPreviewRef.current) {
      document.body.removeChild(dragPreviewRef.current)
      dragPreviewRef.current = null
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    createDragPreview(e.nativeEvent);
    (window as any).dragOrigin = data.origin
    window.addEventListener('touchmove', updateDragPreviewPosition, { passive: true })
  }

  const handleTouchEnd = () => {
    if (dragPreviewRef.current) {
      (window as any).dropData = JSON.stringify(data)
    }
    removeDragPreview()
    delete (window as any).dragOrigin
    window.removeEventListener('touchmove', updateDragPreviewPosition)
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('customData', JSON.stringify(data));
    (window as any).dragOrigin = data.origin
  }

  const handleDragEnd = () => {
    delete (window as any).dragOrigin
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('touchmove', updateDragPreviewPosition)
    }
  }, [])

  return (
    <S.DragOrigin
      ref={dragOriginRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </S.DragOrigin>
  )
}

export default memo(DragOrigin)

const S = {
  DragOrigin: styled.div`
    width: 100%;
    display: flex;
  `
}
