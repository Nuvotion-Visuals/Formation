import React from 'react'
import styled, { css } from 'styled-components'

interface Props {
  value: string,
  onChange: (arg0: string) => void
}

export const ColorPicker = React.memo(({ value, onChange } : Props) => {
  const colors = [
  '#FFFFFF',
  '#000000',
  '#9F0500',
  '#D33115',
  '#C45100',
  '#E27300',
  '#FB9E00',
  '#FFFF00',
  '#B0BC00',
  '#808900',
  '#194D33',
  '#68BC00',
  '#0C797D',
  '#16A5A5',
  '#0062B1',
  '#009CE0',
  '#653294',
  '#7B64FF',
  '#AB149E',
  '#FA28FF'
  ]
  return (
    <S.Container>
      <S.Colors>
        {
          colors.map(color => 
            <S.Color
              key={color}
              color={color}
              active={color === value}
              onClick={() => onChange(color)}
            >
              <S.Active
                active={color === value}
                invert={color === '#FFFFFF'}
              />
            </S.Color>    
          )
        }
      </S.Colors>
      
    </S.Container>
  )
})

interface ColorProps {
  active: boolean,
  color: string
}

interface ActiveProps {
  active: boolean,
  invert: boolean
}

const S = {
  Container: styled.div`
    color: var(--Font_Color);
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: var(--ControlRadius);
  `,
  Colors: styled.div`
    border-radius: 8px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 2px;
  `,
  Color: styled.div<ColorProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.color};
    width: 24px;
    height: 24px;
    margin: 2px;
    border-radius: 100%;
    cursor: pointer;
    box-shadow: ${props => props.active ? css`
      0px 0px 16px 0px ${props.color};
    ` : 'none'};

    &:hover {
      box-shadow: ${props => css`0px 0px 16px 0px ${props.color};`};
    }
  `,
  Active: styled.div<ActiveProps>`
    display: ${props => props.active ? 'block' : 'none'};
    background: ${props => props.invert ? 'black' : 'white'};
    width: 8px;
    height: 8px;
    border-radius: 100%;
  `
}
