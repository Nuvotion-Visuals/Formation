import { Box, Button, Gap, GroupRadius, NumberInput, NumberRange, Spacer } from '../../internal'
import React from 'react'
import styled from 'styled-components'

interface Props {
  value: number[];
  min: number;
  max: number;
  onChange: (value: number[]) => void;
  hideNumberInput?: boolean,
  precise?: boolean
  step?: number
  value2: number
  phase: number
  duration: number
  onDurationChange: (value: number) => void
  direction: 'reverse' | 'forward'
  onDirectionChange: (value: 'reverse' | 'forward') => void
  mode: 'loop' | 'reflect'
  onModeChange: (value: 'loop' | 'reflect') => void
  measurement: 'seconds' | 'beats'
  onMeasurementChange: (value: 'seconds' | 'beats') => void
}

export const Timeline = (props: Props) => {
  return (<S.Timeline>
    <S.Top>
      <NumberRange
        {...props}
        precise
        hideNumberInput
      />
      <S.Overlay
        width={((props.value[1] - props.value[0]) / (props.max - props.min)) * 100}
        left={`${((props.value[0] - props.min) / (props.max - props.min)) * 100}%`}
      >
        <S.Phase
          left={props.phase * 100}
        />
        <S.Value
          left={props.value2 * 100}
        />
      </S.Overlay>
    </S.Top>
    <S.Bottom>
      <GroupRadius>
        <Button
          text='<'
          compact
          title='Reverse'
          square
          primary={props.direction === 'reverse'}
          onClick={() => props.onDirectionChange('reverse')}
        />
        <Button
          text='>'
          compact
          title='Forward'
          square
          primary={props.direction === 'forward'}
          onClick={() => props.onDirectionChange('forward')}
        />
        <Button
          text='L'
          compact
          title='Loop'
          square
          primary={props.mode === 'loop'}
          onClick={() => props.onModeChange('loop')}
        />
        <Button
          text='R'
          compact
          title='Reflect'
          square
          primary={props.mode === 'reflect'}
          onClick={() => props.onModeChange('reflect')}
        />
      </GroupRadius>
      <Spacer />
      <Gap autoWidth>
        <GroupRadius>
          <Button
            text='S'
            compact
            title='Seconds'
            square
            primary={props.measurement === 'seconds'}
            onClick={() => props.onMeasurementChange('seconds')}
          />
          <Button
            text='B'
            compact
            title='Beats'
            square
            primary={props.measurement === 'beats'}
            onClick={() => props.onMeasurementChange('beats')}
          />
        </GroupRadius>
      
        <S.Label>
          Seconds
        </S.Label>
      </Gap>
      
      <Box width={3} height={'var(--F_Input_Height_Compact)'}>
        <NumberInput
          value={props.duration}
          onChange={val => props.onDurationChange(val)}
          step={1}
        />
      </Box>
    </S.Bottom>
  </S.Timeline>)
}

const S = {
  Timeline: styled.div`
    width: 100%;
  `,
  Top: styled.div`
    width: 100%;
    position: relative;
    padding-top: 0.25rem;
  `,
 
  Overlay: styled.div<{
    width: number
    left: string
  }>`
    position: absolute;
    width: ${props => `${props.width}%`};
    height: calc(20px + .5rem);
    bottom: 0;
    z-index: 1;
    left: ${props => props.left};
    pointer-events: none;
  `,
  Phase: styled.div<{
    left: number
  }>`
    position: absolute;
    width: 2px;
    background: white;
    height: 20px;
    left: ${props => `calc(${props.left}% - 1px)`};
    top: .375rem;
  `,
  Value: styled.div<{
    left: number
  }>`
    position: absolute;
    width: 0;
    height: 0;
    border-left: 0.375rem solid transparent;
    border-right: 0.375rem solid transparent;
    border-top: 0.75rem solid var(--F_Font_Color);
    left: ${props => `calc(${props.left}% - 0.375rem)`};
  `,
   Bottom: styled.div`
    display: flex;
    width: 100%;
    height: var(--F_Input_Height);
    position: relative;
    align-items: center;
  `,
  Label: styled.div`
    font-size: var(--F_Font_Size_Small);
    color: var(--F_Font_Color_Disabled);
  `
}