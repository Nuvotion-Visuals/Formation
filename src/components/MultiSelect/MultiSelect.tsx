import { ContextMenu, DropdownProps, Gap } from '../../internal'
import React, { ReactNode, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

type PropType = {
  children: React.ReactElement[],
  selectedIndices: number[],
  setSelectedIndices: (indices: number[]) => void,
  menuOptions: DropdownProps,
}

export const MultiSelect = ({ children, selectedIndices, setSelectedIndices, menuOptions }: PropType) => {
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
        setSelectedIndices([])
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
    
    let newSelectedIndices = [...selectedIndices]
    
    if (e.button === 2) { // Check if right-click
      if (!selectedIndices.includes(index)) { // Check if the item is already selected
        newSelectedIndices = [index]
        setLastSelected(index)
      }
    } 
    else {
      if (ctrlCmdPressed.current) {
        const indexPosition = newSelectedIndices.indexOf(index)
  
        if (indexPosition !== -1) {
          newSelectedIndices.splice(indexPosition, 1)
        } else {
          newSelectedIndices.push(index)
          setLastSelected(index)
        }
      } else if (shiftPressed.current && lastSelected != null) {
        newSelectedIndices = []
  
        for (let i = Math.min(lastSelected, index); i <= Math.max(lastSelected, index); i++) {
          newSelectedIndices.push(i)
        }
      } else {
        newSelectedIndices = [index]
        setLastSelected(index)
      }
    }
  
    setSelectedIndices(newSelectedIndices)
    e.preventDefault()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect()
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setDragEnd({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setIsDragging(true)
    setSelectedIndices([])
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

    const newSelectedIndices: number[] = [...selectedIndices];
    itemRefs.current.forEach((itemRef, index) => {
      if (itemRef) {
        const itemRect = itemRef.getBoundingClientRect()
        const itemRelativeRect = {
          top: itemRect.top - rect.top,
          bottom: itemRect.bottom - rect.top,
          left: itemRect.left - rect.left,
          right: itemRect.right - rect.left,
        }

        if (itemRelativeRect.top < selectionRect.bottom &&
            itemRelativeRect.bottom > selectionRect.top &&
            itemRelativeRect.left < selectionRect.right &&
            itemRelativeRect.right > selectionRect.left) {
              newSelectedIndices.push(index)
        }
      }
    })

    setSelectedIndices(newSelectedIndices)
  }

  return (
    <S.MultiSelectContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
       <ContextMenu
            dropdownProps={{
              ...menuOptions,
              items: menuOptions.items.map(item => ({
                ...item,
                onClick: (e) => {
                  if (item.onClick) {
                    item.onClick(e)
                  }
                },
              })),
            }}
          >
      <Gap>
      {
        React.Children.map(children, (child, i) => (
         
            <S.Item
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              selected={selectedIndices.includes(i)}
              onMouseDown={(e) => handleItemMouseDown(e, i)}
            >
              {
                child
              }
            </S.Item>
        ))
      }
      </Gap>
      </ContextMenu>

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