import React, { useRef, useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Envelope } from '../../internal'
import CustomEase from 'gsap/dist/CustomEase'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// todo `boundHeight` breaks when smaller than 200px
export default {
	component: Envelope,
	title: 'Input/Envelope',
	argTypes: {
		boundHeight: { type: 'number', defaultValue: 500 },
		boundWidth: { type: 'number', defaultValue: 500 },
		path: { type: 'string', defaultValue: 'M0 0 Q0.25 0.25 0.5 0.5 T1 1' },
		// todo how do i min max constrain this value? -- https://storybook.js.org/docs/api/arg-types
		duration: { type: 'number', defaultValue: 4, min: 0.1, max: 60, step: 0.1 },
		onChange: { action: 'onChange' },
		phase: { type: 'number', defaultValue: 0 },
		value: { type: 'number', defaultValue: 0 },
	},
	tags: ['automation', 'animation'],
} as ComponentMeta<typeof Envelope>

const Template: ComponentStory<typeof Envelope> = (props) => {
  const [path, setPath] = useState<string>(props.path)
  const [phase, setPhase] = useState<number>(props.phase)
  const [value, setValue] = useState<number>(props.value)

  useGSAP(() => {
		gsap.registerPlugin(CustomEase)
		CustomEase.create('custom', path)
		
		gsap.to({}, {
			duration: props.duration,
			value: 500,
			ease: 'custom',
			repeat: -1,
			onUpdate: function () {
				setValue(this.targets()[0].value)
			}
		})

		gsap.to({}, {
			duration: props.duration,
			phase: 500,
			ease: 'none',
			repeat: -1,
			onUpdate: function () {
				setPhase(this.targets()[0].phase)
			}
		})
	}, 
	{
		revertOnUpdate: true,
		dependencies: [
			path,
			props.duration,
		]
	})

  return (
    <Envelope
      {...props}
      path={path}
      value={value}
      phase={phase}
      onChange={newPath => setPath(newPath)}
    />
  )
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
