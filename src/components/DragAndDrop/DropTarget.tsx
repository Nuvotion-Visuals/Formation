import React, { FC, useState, memo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { DropCorners } from '../../internal'
import { DropOverlay } from './DropOverlay'

type DropTargetProps = {
  onDrop: (data: any) => void
  acceptedOrigins: string[]
  children: React.ReactNode
  expandVertical?: boolean
  overlay?: boolean
}

/**
 * `DropTarget` is a container that can receive draggable items. It works with the `DragOrigin` component to handle the drop part of a drag-and-drop operation.
 * You can specify which origins are accepted, making it versatile for different types of draggable content. When an item is dropped onto the target,
 * the `onDrop` callback is executed with the item's data, allowing you to define how the application should respond to the drop event.
 *
 * @component
 * @param {function} onDrop - The function to call when a draggable item is dropped onto this target. It receives the item's data as its parameter.
 * @param {string[]} acceptedOrigins - An array of origins that this drop target accepts. Only items from these origins will trigger the drop event.
 * @param {React.ReactNode} children - The components to be rendered inside the drop target area.
 * @param {boolean} [expandVertical] - Fill the vertical space of the container.
 * @param {boolean} [overlay] - Use a translucent overlay rather than corners to indicate hover.
 *
 * @example
 * // A drop target that accepts items from 'list-item' origin
 * <DropTarget
 *   onDrop={handleItemDrop}
 *   acceptedOrigins={['list-item']}
 * >
 *   <div>Drop items here</div>
 * </DropTarget>
 */
export const DropTarget: FC<DropTargetProps> = ({ 
  onDrop, 
  acceptedOrigins, 
  children,
  expandVertical,
  overlay
}) => {
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
      expandVertical={expandVertical}
    >
      {
        isOver &&
          (overlay
            ? <DropOverlay />
            : <DropCorners />)
      }
      { children }
    </S.DropTarget>
  )
}

export default memo(DropTarget)

const S = {
  DropTarget: styled.div<{
    expandVertical?: boolean
  }>`
    position: relative;
    width: 100%;
    height: ${props => props.expandVertical ? '100%' : 'auto'};
  `
}
