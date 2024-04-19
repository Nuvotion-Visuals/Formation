import React, { useEffect, useRef, useState } from "react"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Envelope } from "../../internal"

// maybe rename to EnvelopeAutomation
export default {
	component: Envelope,
	title: "Input/Envelope",
	argTypes: {
		boundHeight: { type: "number", defaultValue: 500 },
		boundWidth: { type: "number", defaultValue: 500 },
		path: { type: "string", defaultValue: "M0 0 Q0.25 0.25 0.5 0.5 T1 1" },
		// todo how do i min max constrain this value? -- https://storybook.js.org/docs/api/arg-types
		duration: { type: "number", defaultValue: 4, min: 0.1, max: 60, step: 0.1 },
		onChange: { action: "onChange" },
	},
	tags: ["automation", "animation"],
} as ComponentMeta<typeof Envelope>

type Point = {
	id: number
	command: "M" | "Q" | "T" | string
	coordinates: number[]
}

const Template: ComponentStory<typeof Envelope> = (props) => {
	const [path, setPath] = useState<string>(props.path)
	const [width, setWidth] = useState<number>(500)
	const graphRef = useRef<SVGSVGElement>(null)

	// console.log(props)

	const onChange = (newPath: string) => {
		setPath(newPath)
	}

	const handleSetWidth = () => {
		if (graphRef.current) {
			const width = graphRef.current.getBoundingClientRect().width
			// todo, set graph width to `100%` and use this to calc width dynamically
			// console.log("Component width:", width)
			setWidth(width)
		}
	}

	useEffect(() => {
		window.addEventListener("resize", handleSetWidth)
		handleSetWidth()
		return () => window.removeEventListener("resize", handleSetWidth)
	}, [])

	return (
		<Envelope
			{...props}
			path={path}
			onChange={onChange}
			graphRef={graphRef}
			boundWidth={width}
			// defaultPoints={defaultPoints}
		/>
	)
}

export const Default = Template.bind({})
Default.args = {
	boundHeight: 500,
	boundWidth: 500,
	// linear line
	path: "M0 0 Q0.25 0.25 0.5 0.5 T1 1",
	duration: 1,
}

export const HalfHeightHook = Template.bind({})
HalfHeightHook.args = {
	boundHeight: 400,
	boundWidth: 500,
	// linear line
	path: "M0 0 Q0.25 0.25 0.5 0.5 T1 0.5",
	duration: 1,
}

export const SCurve = Template.bind({})
SCurve.args = {
	boundHeight: 500,
	boundWidth: 500,
	path: "M0 0 Q0.5 0.1 0.5 0.5 T1 1",
	duration: 2,
}

export const LowHump = Template.bind({})
LowHump.args = {
	boundHeight: 400,
	boundWidth: 500,
	path: "M0 0 Q0.25 0.25 0.5 0.1 T1 1",
	duration: 3,
}

export const FivePoint = Template.bind({})
FivePoint.args = {
	boundHeight: 300,
	boundWidth: 500,
	path: "M0 0 Q0.054 0.121 0.108 0.242 Q0.25 0.25 0.5 0.5 Q0.661 0.591 0.822 0.682 T1 1 ",
	duration: 5,
}
