import styled, { css } from 'styled-components'
import React, { memo } from 'react'
import Slider from './RC-Slider'
import { NumberInput, Box } from '../../internal'

interface Props {
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  hideNumberInput?: boolean
  onMaxValueReached?: () => void // Optional callback when the max value is reached by user interaction
  center?: boolean,
  precise?: boolean,
  color?: 'red' | 'green' | 'blue',
  type?: 'opacity' | 'color' | 'hue'
}

/**
 * A component that combines a numeric input with a slider for adjusting the values.
 * It provides diverse customization controls including precision slider, isOpacity, colored and 
 * hue control for a more detailed UX.
 *
 * The 'NumberSlider' operates from a minimum to a maximum value, which are specified by the 'min' and 'max' props. 
 * The 'onChange' callback is used to propagate the new value of the slider back to the parent component.
 * 'onMaxValueReached' adds an extra callback which gets triggered when the current value reaches the maximum value (useful for special UI/UX effects).
 *
 * @param {number} value - The current numeric value of the slider
 * @param {number} min - The minimum value for the slider
 * @param {number} max - The maximum value for the slider 
 * @param {number} [step] - The specific increment/decrement interval for the slider's value
 * @param {boolean} [hideNumberInput] - Whether to hide the numeric input field and only show the slider
 * @param {Function} [onMaxValueReached] - Callback to be invoked when  the max value is reached
 * @param {boolean} [center] - Apply a different visual style to the slider (Precise slider)
 * @param {boolean} [precise] - Alter styles of slider to precise version (smaller, more exact)
 * @param {string} [color] - Alter the color of the slider, options: 'red', 'blue', 'green'
 * @param {string} [type] - Type of the slider, either opacity, color, or hue
 * @param {Function} onChange - The function to be called when the slider value change
 *
 * @example
 * return (
 *  <NumberSlider 
 *    min={0}
 *    max={100}
 *    value={50}
 *    onChange={(value) => console.log(value)}
 *    color="red"
 *  />
 * )
 * 
 * @component
 */
export const NumberSlider: React.FC<Props> = memo(({ 
  value, 
  min, 
  max, 
  step, 
  onChange, 
  hideNumberInput, 
  onMaxValueReached, 
  center, 
  precise,
  type,
  color,
}) => {
  const handleAfterChange = (value: number) => {
    if (value === max && onMaxValueReached) {
      onMaxValueReached()
    }
  }

  return (
    <S.Container center={center} precise={precise} type={type} color={color}>
      <S.RangeSliderContainer>
        {
          !hideNumberInput && 
            <Box pr={.25}>
              <NumberInput value={value} onChange={(newValue) => onChange(newValue)} />
            </Box>
        }
        <S.SliderContainer>
          <Slider
            min={min}
            max={max}
            value={value}
            // @ts-ignore
            onChange={onChange}
            // @ts-ignore
            onAfterChange={handleAfterChange}
            step={step}
            center={center && precise}
          />
          <S.Left center={center} precise={precise}/>
          <S.Right precise={precise}/>
        </S.SliderContainer>
      </S.RangeSliderContainer>
    </S.Container>
  )
})

const S = {
  Container: styled.div<{
    precise?: boolean,
    type?: 'opacity' | 'color' | 'hue',
    center?: boolean,
    
  }>`
    color: var(--F_Font_Color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: var(--F_Input_Height_Compact);
    overflow: hidden;
    width: 100%;
    .rc-slider {
      margin: ${props => props.precise ? '0 3px' : '0 8px'};
    }
    .rc-slider-track {
      background: ${props => props.type === 'hue' ? 'none' : props.center ? 'var(--F_none)' : 'var(--F_Surface)'};
    }
    .rc-slider-handle {
      width: ${props => props.precise ? '6px' : '16px'};
      border-radius: ${props => props.precise ? '0' : 'var(--F_Tile_Radius)'};
      background: ${props => 
        props.color 
          ? props.color 
          : props.type === 'hue'
            ? 'none'
            : 'var(--F_Primary_Variant)'
      };
      box-shadow: ${props => props.type === 'hue' ? 'inset 0 0 0 1px black' : 'none'};
    }
    .rc-slider-rail {
      background-position: 0px 0px, 5px 5px;
      background-size: 10px 10px;
      background-image: ${props => props.type === 'opacity'
        ? `
          linear-gradient(
            45deg, 
            var(--F_Surface_0) 25%, transparent 25%, 
            transparent 75%, var(--F_Surface_0) 75%, 
            var(--F_Surface_0) 100%
          ),
          linear-gradient(
            45deg, 
            var(--F_Surface_0) 25%, var(--F_Surface_1) 25%, 
            var(--F_Surface_1) 75%, var(--F_Surface_0) 75%, 
            var(--F_Surface_0) 100%
          )
        ` 
        : 'none'
      };
      ${props => (props.type === 'opacity' || props.type === 'hue') &&
      css`
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${
            props.type === 'hue'
            ? `
              linear-gradient(
                90deg, 
              rgba(255, 0, 0, 1) 0%,
              rgba(255, 154, 0, 1) 10%,
              rgba(208, 222, 33, 1) 20%,
              rgba(79, 220, 74, 1) 30%,
              rgba(63, 218, 216, 1) 40%,
              rgba(47, 201, 226, 1) 50%,
              rgba(28, 127, 238, 1) 60%,
              rgba(95, 21, 242, 1) 70%,
              rgba(186, 12, 248, 1) 80%,
              rgba(251, 7, 217, 1) 90%,
              rgba(255, 0, 0, 1) 100%
              )
            `
            : `
              linear-gradient(
                90deg,
                rgba(0,0,0,0) 0%, rgba(18,18,18,1) 100%
              )
            `
          };
          pointer-events: none;
        }
      `
    }
    }
  `,

  RangeSliderContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  SliderContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
  `,
  Left: styled.div<{
    precise?: boolean,
    center?: boolean
  }>`
    width: ${props => props.precise ? '3px' : '8px'};
    position: absolute;
    height: 100%;
    background: ${props => props.center ? 'var(--F_Background)' : 'var(--F_Surface)'};
    left: 0;
    border-radius: var(--F_Tile_Radius) 0 0 var(--F_Tile_Radius);
  `,
  Right: styled.div<{
    precise?: boolean
  }>`
    width: ${props => props.precise ? '3px' : '8px'};
    position: absolute;
    height: 100%;
    background: var(--F_Background);
    right: 0;
    border-radius: 0 var(--F_Tile_Radius) var(--F_Tile_Radius) 0;
  `
}
