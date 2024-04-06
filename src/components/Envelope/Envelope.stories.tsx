import React, { useState } from "react"

import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Envelope } from "../../internal"

// maybe rename to EnvelopeAutomation
export default {
	title: "Input/Envelope",
	component: Envelope,
	argTypes: {
		path: { type: "string", defaultValue: "M0 0 Q0.25 0.25 0.5 0.5 T1 1" },
		// todo how to min max constrain this value -- https://storybook.js.org/docs/api/arg-types
		duration: { type: "number", defaultValue: 4, min: 0.1, max: 60, step: 0.1 },
		onChange: { action: "onChange" },
	},
} as ComponentMeta<typeof Envelope>

// type Props = {
// 	path: string,
//   duration:number,
//   onChange: (any:any) => string,
// }

const Template: ComponentStory<typeof Envelope> = (props) => {
	const [path, setPath] = useState<string>(props.path)

	const handlePathChange = (newPath: string) => {
		setPath(newPath)
	}
	return <Envelope {...props} path={path} onChange={handlePathChange} />
}

export const Default = Template.bind({})
Default.props = {
	// linear line
	path: "M0 0 Q0.25 0.25 0.5 0.5 T1 1",
	duration: 1,
}

export const SCurve = Template.bind({})
SCurve.props = {
	path: "M0 0 Q0.5 0.1 0.5 0.5 T1 1",
	duration: 2,
}

export const LowHump = Template.bind({})
LowHump.props = {
	path: "M0 0 Q0.25 0.25 0.5 0.1 T1 1",
	duration: 3,
}

export const FivePoint = Template.bind({})
FivePoint.props = {
	path: "M0 0 Q0.054 0.121 0.108 0.242 Q0.25 0.25 0.5 0.5 Q0.661 0.591 0.822 0.682 T1 1 ",
	duration: 3,
}
