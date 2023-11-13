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

/**
 * The ZoomSlider component provides a customization on the BasicSlider that has clickable icons to decrement and increment the value of the slider.
 * The slider operates from a minimum and a maximum value, defined by the 'min' and 'max' props.
 * The 'onChange' callback is used to propagate the new value of the slider back to the parent component when the slider is moved manually or when the button to increment/decrement is clicked.
 *
 * @param {number} value - The current numeric value of the slider
 * @param {number} min - The minimum value for the slider
 * @param {number} max - The maximum value for the slider 
 * @param {Function} onChange - The function to be called when the slider value changes
 * @param {number} [step=1] - The specific increment/decrement interval for the slider's value when plus or minus button is clicked.
 * @param {IconPrefix} [iconPrefix] - The FontAwesome icon prefix to use for the zoom in and zoom out buttons. Default is 'fas'.
 *
 * @example
 * return (
 *  <ZoomSlider
 *    min={0}
 *    max={100}
 *    value={50}
 *    onChange={(value) => console.log(value)}
 *    iconPrefix="fas"
 *  />
 * )
 * 
 * @component
 */
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
