import React, { useEffect, useRef, useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Timeline } from './Timeline'
import { Box, Envelope, NumberRange } from '../../internal'
import gsap from 'gsap'
import CustomEase from 'gsap/dist/CustomEase'
import styled from 'styled-components'
gsap.registerPlugin(CustomEase)

const isPlayingBackwards = (animation) => {
  if (!animation) return false;

  const reversed = animation.reversed();
  const totalTime = animation.totalTime();
  const cycleDuration = animation.duration() + animation.repeatDelay();

  if (animation.repeat() && animation.yoyo() && totalTime < animation.totalDuration()) {
    if (Math.floor(totalTime / cycleDuration) % 2 === 1) {
      return !reversed;
    }
  }
  return reversed;
};

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
  const [value, setValue] = useState(0)
  const [phase, setPhase] = useState(props.phase)
  const [duration, setDuration] = useState(2)
  const [range, setRange] = useState<number[]>([0, 100])
  const [direction, setDirection] = useState<'reverse' | 'forward'>('forward')
  const [mode, setMode] = useState<'loop' | 'reflect'>('reflect')
  const [measurement, setMeasurement] = useState<'seconds' | 'beats'>('seconds')
  
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const tweenProgressRef = useRef(0)
  
  useEffect(() => {
    if (timelineRef.current) {
      tweenProgressRef.current = timelineRef.current.progress()
      timelineRef.current.kill()
    }
  
    const customEase = CustomEase.create('custom', path)
  
    timelineRef.current = gsap.timeline({
      repeat: -1,
      yoyo: mode === 'reflect',
      paused: true,
      onUpdate: function() {
        const rawValue = this.getChildren()[0].targets()[0].value;
        const rawPhase = this.getChildren()[1].targets()[0].phase;

        // Clamp the value and phase within the specified range
        const clampedValue = Math.min(Math.max(rawValue, 0), 1);
        const clampedPhase = Math.min(Math.max(rawPhase, 0), 1);

        setValue(clampedValue);
        setPhase(clampedPhase);
        
        if (clampedPhase === 0 && this.reversed()) {
          this.restart();
          setDirection('forward');
        }
      },
      onRepeat: function () {
        setDirection(
          isPlayingBackwards(timelineRef.current)
            ? 'reverse'
            : 'forward'
        )
      }
    })
  
    timelineRef.current.to({ value: 0 }, {
      duration,
      value: 1,
      ease: customEase
    }, 0)
  
    timelineRef.current.to({ phase: 0 }, {
      duration,
      phase: 1,
      ease: 'none'
    }, 0)
  
    if (timelineRef.current) {
      timelineRef.current.progress(tweenProgressRef.current).resume()
    }
  
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [path, duration, mode, direction])

  useEffect(() => {
    if (timelineRef.current) {
      if (direction === 'reverse') {
        timelineRef.current.reversed(true)
      }
    }
  }, [direction, mode])

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
        phase={phase}
        onChange={setPath}
        range={range}
      />
      <S.TestContainer>
        <S.Test scale={scaledValue} />
      </S.TestContainer>
    </Box>
  )
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
