import React from 'react'

export const onScrollWheelClick = (callback: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) => 
  (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.button === 1) {
      callback(event)
    }
  }