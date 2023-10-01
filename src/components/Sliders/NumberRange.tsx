import styled from 'styled-components'

import React from 'react'

import Slider from './RC-Slider'

import { NumberInput, Box } from '../../internal'

interface Props {
  value: number[];
  min: number;
  max: number;
  onChange: (value: number[]) => void;
  hideNumberInput?: boolean,
  precise?: boolean
}

export const NumberRange = React.memo(({ 
  value, 
  min, 
  max, 
  onChange,
  hideNumberInput,
  precise
}: Props) => {
  const handleChange = (newValue: number, index: number) => {
    const newSyncValue = [...value]
    newSyncValue[index] = newValue
    onChange(newSyncValue)
  }

  return (
    <S.Container precise={precise}>
      <S.RangeSliderContainer>
        {
          !hideNumberInput &&
            <Box pr={.25}>
              <NumberInput
                value={value[0]}
                onChange={(newValue) => handleChange(newValue, 0)}
              />
            </Box>
        }
        
        <S.SliderContainer>
          <Slider
            range
            min={min} 
            max={max} 
            value={value} 
            // @ts-ignore
            onChange={onChange} 
          />
          <S.Left precise={precise} />
          <S.Right precise={precise} />
        </S.SliderContainer>
        {
          !hideNumberInput &&
            <NumberInput
              value={value[1]} 
              onChange={(newValue) => handleChange(newValue, 1)}
            />
        }
       
      </S.RangeSliderContainer>
    </S.Container>
  )
})

const S = {
  Container: styled.div<{
    precise?: boolean,
    center?: boolean
  }>`
    color: var(--F_Font_Color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    width: 100%;
    height: var(--F_Input_Height_Compact);
    overflow: hidden;
    .rc-slider {
      margin: ${props => props.precise ? '0 3px' : '0 8px'};
    }
    .rc-slider-track {
      background: ${props => props.center ? 'var(--F_Background)' : 'var(--F_Surface)'};
    }
    .rc-slider-handle {
      width: ${props => props.precise ? '6px' : '16px'};
      border-radius: ${props => props.precise ? '0' : 'var(--Tile_Radius)'};
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

  NumberInput: styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    -webkit-appearance: none; 
    margin: 0;
    border: none;
    color: var(--F_Font_Color);
    font-size: var(--F_Font_Size);
    background: none;
    text-align: center;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
  `,

  SliderContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
  `,
  Left: styled.div<{
    precise?: boolean
  }>`
    width: ${props => props.precise ? '3px' : '8px'};
    position: absolute;
    height: 100%;
    background: var(--F_Background);
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
