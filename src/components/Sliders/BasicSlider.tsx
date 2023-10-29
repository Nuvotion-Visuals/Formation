import styled, { css } from 'styled-components'
import React, { memo } from 'react'
import Slider from './RC-Slider'

interface Props {
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}

export const BasicSlider: React.FC<Props> = memo(({ 
  value, 
  min, 
  max, 
  step, 
  onChange, 
}) => {
  return (
    <S.Container >
      <S.SliderContainer>
        <Slider
          min={min}
          max={max}
          value={value}
          // @ts-ignore
          onChange={onChange}
          // @ts-ignore
          step={step}
        />
      </S.SliderContainer>
    </S.Container>
  )
})

const S = {
  Container: styled.div`
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
      margin: 0 .5rem;
      background: none;
    }
    .rc-slider-track {
      background: var(--F_Surface);
      height: .25rem;
    }
    .rc-slider-handle {
      width: 1rem;
      height: 1rem;
      border-radius: 100%;
      background: var(--F_Primary_Variant);
    }
    .rc-slider-rail {
      background: var(--F_Surface);
      height: .25rem;
    }
  `,

  SliderContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
  `,
}
