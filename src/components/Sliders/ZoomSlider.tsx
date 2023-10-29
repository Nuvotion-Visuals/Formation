import React from 'react'
import styled from 'styled-components'
import { BasicSlider } from './BasicSlider'
import { Button } from '../../internal'

interface Props {
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}

export const ZoomSlider = ({ 
  value, 
  min, 
  max, 
  step = 1, // Default step is 1
  onChange, 
}: Props) => {
  const handleClick = (adjustment: number) => {
    let newValue = value + adjustment
    if (newValue > max) {
      newValue = max
    } else if (newValue < min) {
      newValue = min
    }
    onChange(newValue)
  }

  return (
    <S.ZoomSlider>
      <Button
        minimal
        compact
        icon='magnifying-glass-minus'
        iconPrefix='fas'
        onClick={() => handleClick(-step)}
      />
      <BasicSlider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        step={step}
      />
      <Button
        minimal
        compact
        icon='magnifying-glass-plus'
        iconPrefix='fas'
        onClick={() => handleClick(step)}
      />
    </S.ZoomSlider>
  )
}

const S = {
  ZoomSlider: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
  `
}
