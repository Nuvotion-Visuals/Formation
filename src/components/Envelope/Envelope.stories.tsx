import React, { useEffect, useRef, useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Box, Envelope, NumberInput } from '../../internal'
import gsap from 'gsap'
import CustomEase from 'gsap/dist/CustomEase'
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
  const valueTweenRef = useRef<gsap.core.Tween | null>(null)
  const phaseTweenRef = useRef<gsap.core.Tween | null>(null)
  const tweenProgressRef = useRef(0)  // Store the current progress of the tween

  useEffect(() => {
    if (valueTweenRef.current && phaseTweenRef.current) {
      // Capture the current progress before killing the tweens
      tweenProgressRef.current = valueTweenRef.current.progress()
      // Kill the current tweens
      valueTweenRef.current.kill()
      phaseTweenRef.current.kill()
    }

    // Create a new tween for value with the updated path and/or duration
    CustomEase.create('custom', path)
    valueTweenRef.current = gsap.to({ value: 0 }, {
      duration: duration,
      value: 1,
      ease: 'custom',
      repeat: -1,
      onUpdate: function () {
        setValue(this.targets()[0].value)
      }
    })

    // Create a new tween for phase
    phaseTweenRef.current = gsap.to({ phase: 0 }, {
      duration: duration,
      phase: 1,
      ease: 'none',  // Usually, phase animation does not use custom easing
      repeat: -1,
      onUpdate: function () {
        setPhase(this.targets()[0].phase)
      }
    })

    // Restore the progress to the tweens
    if (valueTweenRef.current && phaseTweenRef.current) {
      valueTweenRef.current.progress(tweenProgressRef.current)
      phaseTweenRef.current.progress(tweenProgressRef.current)
    }

    // Return a cleanup function
    return () => {
      if (valueTweenRef.current) {
        valueTweenRef.current.kill()
      }
      if (phaseTweenRef.current) {
        phaseTweenRef.current.kill()
      }
    }
  }, [path, duration])

  return (<Box maxWidth={'500px'} wrap>
		<Envelope
			{...props}
			path={path}
			value={value}
			phase={phase}
			onChange={newPath => setPath(newPath)}
		/>
		<NumberInput
			value={duration}
			onChange={val => setDuration(val)}
			step={1}
		/>
	</Box>)
}

export const Default = Template.bind({})
Default.args = {
	boundHeight: 500,
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
