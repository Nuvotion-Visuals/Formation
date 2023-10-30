import styled from 'styled-components'
import React, { useCallback, useMemo, useRef, useState, ReactElement } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import { useOnClickOutside, Icon, GroupRadius } from '../../internal'
import useEyeDropper from 'use-eye-dropper'

interface ColorItemProps {
  color: string
  isActive: boolean
  onChange: (color: string) => void,
}

const ColorItem: React.FC<ColorItemProps> = React.memo(({ color, isActive, onChange }) => (
  <S.Color
    key={color}
    color={color}
    active={isActive}
    onClick={() => onChange(color)}
  >
    <S.Active
      active={isActive}
      invert={color === '#FFFFFF'}
    />
  </S.Color>
))

interface EyeDropperProps {
  onClick: () => void
}

const EyeDropper: React.FC<EyeDropperProps> = React.memo(({ onClick }) => (
  <S.EyeDropper onClick={onClick}>
    <Icon icon='eye-dropper' />
  </S.EyeDropper>
))

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void,
  hidePresets?: boolean
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, hidePresets }) => {
  const { open, isSupported } = useEyeDropper()
  const [_, setError] = useState<null | Error>(null)
  
  const popover = useRef<HTMLDivElement>(null)
  const [isOpen, toggle] = useState(false)

  const closePicker = useCallback(() => toggle(false), [])
  useOnClickOutside(popover, closePicker)

  const pickColor = useCallback(async () => {
    try {
      const pickedColor = await open()
      onChange(pickedColor.sRGBHex)
    } catch (e: any) {
      if (!e.canceled) setError(e)
    }
  }, [open])

  const isEyeDropperSupported = useMemo(() => isSupported(), [isSupported])

  const colors = useMemo(() => [
    '#FFFFFF',
    '#000000',
    '#9F0500',
    '#D33115',
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
    ], [])

  return (
    <S.Picker>
      <S.Swatch
        backgroundColor={value}
        onClick={() => toggle(true)}
      />

      {
        isOpen &&
          <S.Popover ref={popover}>
            <HexColorPicker color={value} onChange={onChange} />
          </S.Popover>
      }

      <S.HexColorInput color={value} onChange={onChange} />

      {
        isEyeDropperSupported &&
          <EyeDropper onClick={pickColor} />
      }
      {
        !hidePresets &&
          <GroupRadius>
          <S.Colors>
            {
              colors.map(color => 
                <ColorItem 
                  key={color}
                  color={color}
                  isActive={color === value}
                  onChange={onChange}
                /> 
              )
            }
          </S.Colors>
        </GroupRadius>
      }
    </S.Picker>
  )
}

const S = {
  Picker: styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 2px;
    padding: .25rem;
  `,
  Swatch: styled.div<{ backgroundColor: string }>`
    background-color: ${(props) => props.backgroundColor};
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    flex-shrink: 0;
    border-radius: var(--F_Tile_Radius) !important;
  `,
  HexColorInput: styled(HexColorInput)`
    background: none;
    width: 44px;
    height: 1.25rem;
    padding: 0;
    border: none;
    color: var(--F_Font_Color_Label);
    font-family: monospace !important;
    padding-left: .25rem;
    text-transform: uppercase;
  `,
  Popover: styled.div`
    position: absolute;
    top: 100%;
    left: .25rem;
    z-index: 2;
    overflow: hidden;
    .react-colorful__saturation, .react-colorful__hue {
      border-radius: var(--F_Tile_Radius) !important;
    }
  `,
  EyeDropper: styled.button`
    background: none;
    border: none;
    height: 1.25rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    * {
      color: var(--F_Font_Color_Label);
    }
    &:hover {
      * {
        color: var(--F_Font_Color);
      }
    }
  `,
  Colors: styled.div`
    border-radius: 8px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  `,
  Color: styled.div<{ color: string, active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.color};
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
  `,
  Active: styled.div<{ active: boolean, invert: boolean }>`
    display: ${(props) => props.active ? 'block' : 'none'};
    background: ${(props) => props.invert ? 'black' : 'white'};
    width: 8px;
    height: 8px;
    border-radius: 100%;
  `
}
