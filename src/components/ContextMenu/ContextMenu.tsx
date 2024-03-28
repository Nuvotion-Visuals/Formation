import React, { FC, useState, useRef, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, DropdownProps } from '../../internal'
import styled from 'styled-components'

interface ContextMenuProps {
  dropdownProps: DropdownProps,
  disabled?: boolean,
  children: React.ReactNode
}

export const ContextMenu: FC<ContextMenuProps> = ({ children, dropdownProps, disabled }) => {
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
  const [dropdownDimensions, setDropdownDimensions] = useState({ width: 0, height: 0 })

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const holdTimer = useRef<NodeJS.Timeout>()

  const openMenu = useCallback((x: number, y: number) => {
    if (!disabled) {
      setClickPosition({ x, y })
      setIsOpen(true)
    }
  }, [disabled, dropdownDimensions])

  useEffect(() => {
    if (dropdownRef.current && isOpen) {
      const { x, y } = clickPosition
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const { width, height } = dropdownDimensions
      const adjustedX = (x + width > viewportWidth) ? viewportWidth - (width + (viewportWidth - x)) : x
      const adjustedY = (y + height > viewportHeight) ? viewportHeight - (height + (viewportHeight - y)) : y
      setMenuPosition({ x: adjustedX, y: adjustedY })
    }
  }, [clickPosition, isOpen, dropdownDimensions])

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    openMenu(event.clientX, event.clientY)
  }, [openMenu])

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClose, isOpen])

  useEffect(() => {
    const element = containerRef.current
    let initialTouchX: number | null = 0
    let initialTouchY: number | null = 0
  
    const handleTouchStart = (event: TouchEvent) => {
      if (isOpen) { // Assuming `isOpen` is a state variable that tracks the menu's visibility
        event.stopPropagation() // Prevent touch events from reaching children
        return
      }
  
      initialTouchX = event.touches[0].clientX
      initialTouchY = event.touches[0].clientY
      holdTimer.current = setTimeout(() => {
        if (initialTouchX !== null && initialTouchY !== null)
        openMenu(initialTouchX, initialTouchY)
      }, 300)
    }
  
    const handleTouchMove = (event: TouchEvent) => {
      if (initialTouchX == null || initialTouchY == null) return
      const moveX = event.touches[0].clientX
      const moveY = event.touches[0].clientY
      if (Math.abs(moveX - initialTouchX) > 30 || Math.abs(moveY - initialTouchY) > 30) {
        clearTimeout(holdTimer.current)
      }
    }
  
    const handleTouchEnd = (event: TouchEvent) => {
      if (isOpen) {
        event.stopPropagation() // Prevent touch end events from reaching children if menu is open
      }
      clearTimeout(holdTimer.current)
      initialTouchX = null
      initialTouchY = null
    }
  
    element?.addEventListener('touchstart', handleTouchStart, { passive: false })
    element?.addEventListener('touchmove', handleTouchMove, { passive: false })
    element?.addEventListener('touchend', handleTouchEnd)
  
    return () => {
      element?.removeEventListener('touchstart', handleTouchStart)
      element?.removeEventListener('touchmove', handleTouchMove)
      element?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [openMenu, isOpen])

  return (
    <S.ContextMenu 
      ref={containerRef}
      onContextMenu={handleContextMenu}
    >
      { children }
      {
        isOpen && ReactDOM.createPortal(
          <div 
            ref={dropdownRef}
            style={{ 
              position: 'fixed', 
              top: menuPosition.y, 
              left: menuPosition.x 
            }}
          >
            <Dropdown 
              {...dropdownProps}
              xPosition={menuPosition.x}
              yPosition={menuPosition.y}
              externalOpen={isOpen}
              hideTriggerButton
              onRenderedDimensions={setDropdownDimensions}
            />
          </div>,
          document.body
        )
      }
    </S.ContextMenu>
  )
}

const S = {
  ContextMenu: styled.div`
    width: 100%;
    height: 100%;
  `
}