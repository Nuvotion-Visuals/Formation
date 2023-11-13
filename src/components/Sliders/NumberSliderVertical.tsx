import styled from 'styled-components'
import React, { memo } from 'react'
import Slider from './RC-Slider'

interface Props {
  value: number
  min: number
  max: number
  step?: number
  title?: string
  onChange: (value: number) => void
}

/**
 * A vertical variant of the NumberSlider component. It provides a slider that operates 
 * from a minimum to a maximum value, which are specified by the 'min' and 'max' props. 
 * The 'onChange' callback is used to propagate the new value of the slider back to the parent component.
 *
 * @param {number} value - The current numeric value of the slider
 * @param {number} min - The minimum value for the slider
 * @param {number} max - The maximum value for the slider 
 * @param {number} [step] - The specific increment/decrement interval for the slider's value
 * @param {string} [title] - The title associated with the component
 * @param {Function} onChange - The function to be called when the slider value change
 *
 * @example
 * return (
 *  <NumberSliderVertical 
 *    min={0}
 *    max={100}
 *    value={50}
 *    onChange={(value) => console.log(value)}
 *    title="My Slider"
 *  />
 * )
 * 
 * @component
 */
export const NumberSliderVertical: React.FC<Props> = memo(({ 
  value, 
  min, 
  max, 
  step, 
  onChange, 
  title
}) => {
  return (
    <S.Container title={title}>
      <Slider
        min={min}
        max={max}
        value={value}
        // @ts-ignore
        onChange={onChange}
        step={step}
        vertical
      />
      <S.Bottom />
    </S.Container>
  )
})

const S = {
  Container: styled.div`
    color: var(--F_Font_Color);
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    height: 100%;
    width: var(--F_Input_Height_Compact);
    min-width: var(--F_Input_Height_Compact);
    border-radius: var(--F_Tile_Radius);
    overflow: hidden;
    background: var(--F_Background);

    /* number slider and range slider */
    .rc-slider {
      position: relative;
      height: calc(100% - 16px);
      margin: 8px 0;
      width: 100%;
      display: flex;
      align-items: center;
      -ms-touch-action: none;
          touch-action: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .rc-slider * {
      box-sizing: border-box;
      overflow: visible;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .rc-slider-rail {
      position: absolute;
      width: 100%;
      background: var(--F_Background);
      left: 0px;
      cursor: grab;
    }
    .rc-slider-track {
      position: absolute;
      left: 0px;
      background: var(--F_Surface);
      height: 100%;
      width: 100%;
      /* background: var(--F_Primary_Variant); */
    }
    .rc-slider-handle {
      position: absolute;
      width: 100%;
      height: 16px;
      z-index: 1;
      cursor: pointer;
      cursor: -webkit-grab;
      cursor: grab;
      background: var(--F_Primary_Variant);
      -ms-touch-action: pan-x;
          touch-action: pan-x;
    }
  `,
  Bottom: styled.div`
    position: absolute;
    width: 100%;
    height: 8px;
    background: var(--F_Surface);
    bottom: 0;
  `
};
