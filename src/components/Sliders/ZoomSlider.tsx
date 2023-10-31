import React from 'react'
import styled from 'styled-components'
import { BasicSlider } from './BasicSlider'
import { Button } from '../../internal'
import { IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void,
  iconPrefix?: IconPrefix
}

export const ZoomSlider = ({ 
  value, 
  min, 
  max, 
  step = 1, // Default step is 1
  onChange, 
  iconPrefix
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
        iconPrefix={iconPrefix ? iconPrefix : 'fas'}
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
        iconPrefix={iconPrefix ? iconPrefix : 'fas'}
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
