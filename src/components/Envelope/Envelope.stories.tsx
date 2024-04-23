import React, { useEffect, useRef, useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Timeline } from './Timeline'
import { Box, Envelope, Gap, NumberInput, NumberRange } from '../../internal'
import gsap from 'gsap'
import CustomEase from 'gsap/dist/CustomEase'
import styled from 'styled-components'
gsap.registerPlugin(CustomEase)

// todo `boundHeight` breaks when smaller than 200px
export default {
	component: Envelope,
	title: 'Input/Envelope',
	argTypes: {
		boundHeight: { type: 'number', defaultValue: 500 },
		boundWidth: { type: 'number', defaultValue: 500 },
		path: { type: 'string', defaultValue: 'M0 0 Q0.25 0.25 0.5 0.5 T1 1' },
		// todo how do i min max constrain this value? -- https://storybook.js.org/docs/api/arg-types
		onChange: { action: 'onChange' },
		phase: { type: 'number', defaultValue: 0 },
		value: { type: 'number', defaultValue: 0 },
	},
	tags: ['automation', 'animation'],
} as ComponentMeta<typeof Envelope>

const Template: ComponentStory<typeof Envelope> = (props) => {
  const [path, setPath] = useState(props.path)
  const [value, setValue] = useState(props.value)
  const [phase, setPhase] = useState(props.phase)
  const [duration, setDuration] = useState(4)
  const [range, setRange] = useState<number[]>([0, 100])
  const [direction, setDirection] = useState<'reverse' | 'forward'>('forward')
  const [mode, setMode] = useState<'loop' | 'reflect'>('loop')
  const [measurement, setMeasurement] = useState<'seconds' | 'beats'>('seconds')

  const valueTweenRef = useRef<gsap.core.Tween | null>(null)
  const phaseTweenRef = useRef<gsap.core.Tween | null>(null)
  const tweenProgressRef = useRef(0)
  const directionRef = useRef<'reverse' | 'forward'>('forward') // useRef to persist direction state

  useEffect(() => {
    if (valueTweenRef.current && phaseTweenRef.current) {
      tweenProgressRef.current = valueTweenRef.current.progress()
      valueTweenRef.current.kill()
      phaseTweenRef.current.kill()
    }

    directionRef.current = direction // Update the useRef with the current state

    CustomEase.create('custom', path)
    valueTweenRef.current = gsap.to({ value: 0 }, {
      duration,
      value: 1,
      ease: 'custom',
      repeat: -1,
      yoyo: mode === 'reflect',
      onUpdate: function () {
        setValue(this.targets()[0].value)
      }
    })

    phaseTweenRef.current = gsap.to({ phase: 0 }, {
      duration,
      phase: 1,
      ease: 'none',
      repeat: -1,
      yoyo: mode === 'reflect',
      onUpdate: function () {
        setPhase(this.targets()[0].phase)
      }
    })

    if (valueTweenRef.current && phaseTweenRef.current) {
      valueTweenRef.current.progress(tweenProgressRef.current)
      phaseTweenRef.current.progress(tweenProgressRef.current)
      valueTweenRef.current.reversed(directionRef.current === 'reverse') // Apply direction from ref
      phaseTweenRef.current.reversed(directionRef.current === 'reverse')
    }

    return () => {
      if (valueTweenRef.current) valueTweenRef.current.kill()
      if (phaseTweenRef.current) phaseTweenRef.current.kill()
    }
  }, [path, duration, mode, direction]) // Include direction in the dependency array

  const scaledValue = (value * (range[1] - range[0]) + range[0]) / 100

  return (
    <Box maxWidth={'500px'} wrap>
      <div hidden>
        <NumberRange
          value={[0, 0]}
          min={0}
          max={0}
          onChange={() => {}}
          step={1}
        />
      </div>

      <Timeline
        value={range}
        onChange={setRange}
        min={0}
        max={100}
        value2={value}
        phase={phase}
        duration={duration}
        onDurationChange={setDuration}
        direction={direction}
        onDirectionChange={setDirection}
        mode={mode}
        onModeChange={setMode}
        measurement={measurement}
        onMeasurementChange={setMeasurement}
      />
      <Envelope
        {...props}
        path={path}
        value={value}
        phase={phase}
        onChange={setPath}
      />
      <S.TestContainer>
        <S.Test scale={scaledValue} />
      </S.TestContainer>
    </Box>
  )
}


const S = {
	TestContainer: styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		width: 300px;
		height: 300px;
		margin-top: 1rem;
	`,
	Test: styled.div<{
		scale: number
	}>`
		background: white;
		border-radius: 100%;
		width: 300px;
		height: 300px;
		transform: ${props => `scale(${props.scale})`};
		transform-origin: center;
	`
}

export const Default = Template.bind({})
Default.args = {
	boundHeight: 200,
	boundWidth: 500,
	// linear line
	path: 'M0 0 Q0.25 0.25 0.5 0.5 T1 1',
	duration: 1
}

export const HalfHeightHook = Template.bind({})
HalfHeightHook.args = {
	boundHeight: 400,
	boundWidth: 500,
	// linear line
	path: 'M0 0 Q0.25 0.25 0.5 0.5 T1 0.5',
	duration: 1,
}

export const SCurve = Template.bind({})
SCurve.args = {
	boundHeight: 500,
	boundWidth: 500,
	path: 'M0 0 Q0.5 0.1 0.5 0.5 T1 1',
	duration: 2,
}

export const ShortestHeight = Template.bind({})
ShortestHeight.args = {
	boundHeight: 200,
	boundWidth: 500,
	path: 'M0 0 Q0.5 0.1 0.5 0.5 T1 1',
	duration: 2,
}

export const ShortestWidth = Template.bind({})
ShortestWidth.args = {
	boundHeight: 500,
	boundWidth: 200,
	path: 'M0 0 Q0.5 0.1 0.5 0.5 T1 1',
	duration: 2,
}

export const LowHump = Template.bind({})
LowHump.args = {
	boundHeight: 400,
	boundWidth: 500,
	path: 'M0 0 Q0.25 0.25 0.5 0.1 T1 1',
	duration: 3,
}

export const FivePoint = Template.bind({})
FivePoint.args = {
	boundHeight: 300,
	boundWidth: 500,
	path: 'M0 0 Q0.054 0.121 0.108 0.242 Q0.25 0.25 0.5 0.5 Q0.661 0.591 0.822 0.682 T1 1 ',
	duration: 5,
}
