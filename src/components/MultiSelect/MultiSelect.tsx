import { Gap } from '../../internal'
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

export const MultiSelect = () => {
  const [selectedItems, setSelectedItems] = useState(new Set<number>())
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragEnd, setDragEnd] = useState({ x: 0, y: 0 })
  const [lastSelected, setLastSelected] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ctrlCmdPressed = useRef(false)
  const shiftPressed = useRef(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control" || e.key === "Meta") ctrlCmdPressed.current = true
      
      if (e.key === "Shift") shiftPressed.current = true
      
      if (e.key === "Escape") {
        setIsDragging(false)
        setSelectedItems(new Set<number>())
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control" || e.key === "Meta") ctrlCmdPressed.current = false
      
      if (e.key === "Shift") shiftPressed.current = false
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const handleItemMouseDown = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    const newSelectedItems = new Set(selectedItems)
    if (ctrlCmdPressed.current) {
      if (newSelectedItems.has(index)) {
        newSelectedItems.delete(index)
      } else {
        newSelectedItems.add(index)
        setLastSelected(index)
      }
    } else if (shiftPressed.current && lastSelected != null) {
      for (let i = Math.min(lastSelected, index); i <= Math.max(lastSelected, index); i++) {
        newSelectedItems.add(i)
      }
    } else {
      newSelectedItems.clear()
      newSelectedItems.add(index)
      setLastSelected(index)
    }
    setSelectedItems(newSelectedItems)
    e.preventDefault()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect()
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setDragEnd({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setIsDragging(true)

    // Reset selected items when dragging begins
    setSelectedItems(new Set<number>())
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const rect = containerRef.current!.getBoundingClientRect()
    setDragEnd({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    updateSelection()
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  const updateSelection = () => {
    const rect = containerRef.current!.getBoundingClientRect()
    const selectionRect = {
      top: Math.min(dragStart.y, dragEnd.y),
      bottom: Math.max(dragStart.y, dragEnd.y),
      left: Math.min(dragStart.x, dragEnd.x),
      right: Math.max(dragStart.x, dragEnd.x),
    }

    const newSelectedItems = new Set<number>()
    itemRefs.current.forEach((itemRef, index) => {
      if (itemRef) {
        const itemRect = itemRef.getBoundingClientRect()
        const itemRelativeRect = {
          top: itemRect.top - rect.top,
          bottom: itemRect.bottom - rect.top,
          left: itemRect.left - rect.left,
          right: itemRect.right - rect.left,
        }
        if (
          itemRelativeRect.top < selectionRect.bottom &&
          itemRelativeRect.bottom > selectionRect.top &&
          itemRelativeRect.left < selectionRect.right &&
          itemRelativeRect.right > selectionRect.left
        ) {
          newSelectedItems.add(index)
        }
      }
    })

    setSelectedItems(newSelectedItems)
  }

  return (
    <S.MultiSelectContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Gap>
      {
        Array.from({ length: 10 }, (_, i) => (
          <S.Item
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            selected={selectedItems.has(i)}
            onMouseDown={(e) => handleItemMouseDown(e, i)}
          >
            Item {i + 1}
          </S.Item>
        ))
      }
      </Gap>
      {
        isDragging && (
          <S.SelectionBox
            style={{
              top: `${Math.min(dragStart.y, dragEnd.y)}px`,
              left: `${Math.min(dragStart.x, dragEnd.x)}px`,
              width: `${Math.abs(dragStart.x - dragEnd.x)}px`,
              height: `${Math.abs(dragStart.y - dragEnd.y)}px`,
            }}
          />
        )
      }
    </S.MultiSelectContainer>
  )
}

const S = {
  MultiSelectContainer: styled.div`
    position: relative;
    user-select: none;
    padding: 1rem;
  `,
  Item: styled.div<{ selected: boolean }>`
    padding: 10px;
    background: ${(props) => (props.selected ? 'rgba(0, 123, 255, 0.2)' : 'none')};
    border: 1px solid darkgrey;
    width: 100%;
  `,
  SelectionBox: styled.div`
    border: 2px dashed #007bff;
    background-color: rgba(0, 123, 255, 0.2);
    position: absolute;
    pointer-events: none;
    z-index: 10;
  `,
}