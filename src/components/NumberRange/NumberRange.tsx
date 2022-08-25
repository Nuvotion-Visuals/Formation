import styled from 'styled-components'

import React from 'react'

import Slider from 'rc-slider'

interface Props {
  value: number[],
  min: number,
  max: number,
  onChange: (value: number[]) => void
}

export const NumberRange = ({ value, min, max, onChange } : Props) => {
  const handleChange = (newValue : number, index: number) => {
    const newSyncValue = value
    newSyncValue[index] = newValue
    onChange(newSyncValue)
  }

  return (
    <S.Container>
        <S.NumberRange
          type='number'
          value={value[0]}
          onChange={(e) => handleChange(Number(e.target.value), 0)}
        />
        <S.Range
          min={min} 
          max={max} 
          value={value} 
          onChange={(value: any) => typeof value === 'number' ? null: onChange(value)} 
          range
        />
        <S.NumberRange 
          type='number' 
          value={value[1]} 
          onChange={(e) => handleChange(Number(e.target.value), 1)}
        />
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    color: var(--F_Font_Color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  `,
  NumberRange: styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    -webkit-appearance: none; 
    margin: 0;
    font-size: var(--F_Font_Size);
    border: none;
    color: var(--F_Font_Color);
    background: none;
    text-align: center;
    &::-webkit-inner-spin-button, ::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
  `,
  Range: styled(props => <Slider {...props} />)`
    position: relative;
    height: .75rem;
    margin: .5rem 0;
    padding: .25rem 0;
    width: 100%;
    border-radius: .5rem;
    -ms-touch-action: none;
        touch-action: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    .rc-slider * {
      box-sizing: border-box;
      overflow: visible;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .rc-slider-rail {
      position: absolute;
      width: 100%;
      background: var(--F_Surface_1);
      height: .25rem;
      border-radius: .5rem;
      cursor: grab;
    }
    .rc-slider-track {
      position: absolute;
      left: 0;
      height: .25rem;
      border-radius: .5rem;
      background: var(--F_Primary_Variant);
    }
    .rc-slider-handle {
      position: absolute;
      width: 1rem;
      height: 1rem;
      cursor: pointer;
      cursor: -webkit-grab;
      margin-top: -.375rem;
      cursor: grab;
      border-radius: 50%;
      background: var(--F_Primary_Variant);
      -ms-touch-action: pan-x;
          touch-action: pan-x;
    }
  `
}