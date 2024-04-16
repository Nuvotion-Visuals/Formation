import React, {
	useReducer,
	useRef,
	type MouseEvent,
	type DragEvent,
	useEffect,
	RefObject,
} from "react"
import gsap from "gsap"
import Draggable from "gsap/dist/Draggable"
import CustomEase from "gsap/dist/CustomEase"
import { useGSAP } from "@gsap/react"
// @ts-ignore
import styles from "./envelope.module.css"

// ? dimensions of the editor, hight doesn't like to go below 300ish
// todo move this default to parent storybook wrapper
const initGraph = {
	w: 500,
	h: 500,
}

//! make sure ids are unique! `id = 0` is reserved for `startPoint`. `M` should always be the first point
const defaultPoints: Point[] = [
	{
		id: 0,
		command: "M",
		coordinates: [0, 0, 0, 0],
	},
	{
		id: 1,
		command: "Q",
		coordinates: [
			initGraph.w * 0.5,
			initGraph.h * 0.5,
			initGraph.w * 0.5,
			initGraph.h * 0.1,
		],
	},
	{
		//? last point id must = last index of `initPoints.length`. `T` should always be the last point
		id: 2,
		command: "T",
		coordinates: [
			initGraph.w * 1,
			initGraph.h * 1,
			initGraph.w * 0.5,
			initGraph.h * 0.98,
		],
	},
]

type Props = {
	path: string
	duration: number
	boundHeight: number
	boundWidth: number
	graphRef: RefObject<SVGSVGElement>
	onChange: (path: string) => void
}

export function Envelope({
	path = "M0 0 Q0.25 0.25 0.5 0.5 T1 1",
	duration = 4,
	onChange,
	boundHeight,
	boundWidth,
	graphRef,
}: Props) {
	const reducer = (state: EnvelopeState, action: Action) => {
		switch (action.type) {
			case "SET_POINTS":
				//? points must already be sorted going into this action
				// const sortedPoints = sortPoints(action.payload)
				return {
					...state,
					points: action.payload,
					direction: writeDirectionCurve(action.payload, {
						h: boundHeight,
						w: boundWidth,
					}),
					customEase: writeEaseCurve(action.payload, {
						h: boundHeight,
						w: boundWidth,
					}),
				}

			case "SET_DIRECTION":
				return {
					...state,
					direction: action.payload,
				}

			case "SET_WIDTH":
				return {
					...state,
					graph: {
						w: boundWidth,
						h: action.payload,
					},
				}

			// case "SET_DURATION":
			// 	return {
			// 		...state,
			// 		duration: action.payload,
			// 	}

			case "RESET":
				// return initState
				throw new Error("how do i grab `initState` out of component?")

			default:
				return state
		}
	}

	const initState: EnvelopeState = {
		// duration,
		graph: { h: boundHeight, w: boundWidth },
		points: convertPathStringToPoints(path, { h: boundHeight, w: boundWidth }),
		customEase: path,
		// customEase: writeEaseCurve(initPoints, initGraph),
		direction: writeDirectionCurve(
			convertPathStringToPoints(path, { h: boundHeight, w: boundWidth }),
			{
				w: boundWidth,
				h: boundHeight,
			}
		),
	}

	const [state, dispatch] = useReducer(reducer, initState)
	const curveEditorRef = useRef<HTMLDivElement>(null)
	const linePathRef = useRef<SVGPathElement>(null)

	useEffect(() => {
		dispatch({
			type: "SET_POINTS",
			payload: convertPathStringToPoints(path, {
				h: boundHeight,
				w: boundWidth,
			}),
		})

		// return () =>
	}, [path])

	function getUpdatedPointsAndSort(
		cursorPos: Draggable.Vars,
		point: Point,
		type: "point" | "point_curve"
	) {
		const boundW = Math.abs(cursorPos.minX) + Math.abs(cursorPos.maxX)
		const boundH = Math.abs(cursorPos.minY) + Math.abs(cursorPos.maxY)
		const x = (cursorPos.x + Math.abs(cursorPos.minX)) / boundW
		const y = (cursorPos.y + Math.abs(cursorPos.minY)) / boundH
		// todo clamp x between neighboring point's x value
		// todo if start or end point always make x = 0 || x = graph.w
		const gx = Number(x * boundWidth)
		const gy = Number(y * boundHeight)

		const pointIndex = state.points.findIndex((p: Point) => p.id === point.id)
		if (pointIndex === -1) return state.points
		const thisPoint = state.points[pointIndex]

		const updatedPointByCommand = () => {
			switch (point.command) {
				case "M":
					return {
						...thisPoint,
						coordinates: [0, gy],
					}
				case "T":
					return {
						...thisPoint,
						coordinates: [
							// todo make this dynamic
							boundWidth,
							gy,
						],
					}
				case "Q":
					// todo hacky way of seeing if curve point or reg point. Maybe there is a more elgant way of doing this
					return type === "point"
						? {
								...thisPoint,
								coordinates: [
									thisPoint.coordinates[0],
									thisPoint.coordinates[1],
									gx,
									gy,
								],
						  }
						: {
								...thisPoint,
								coordinates: [
									gx,
									gy,
									thisPoint.coordinates[2],
									thisPoint.coordinates[3],
								],
						  }

				default:
					return thisPoint
			}
		}
		const updatedPoint = updatedPointByCommand()

		//? remove the previous point by it's id/index and slot in the upadate one
		const updatedPoints = [
			...state.points.slice(0, pointIndex),
			updatedPoint,
			...state.points.slice(pointIndex + 1),
		]

		// todo why sorting points here is buggy?
		return sortPoints(updatedPoints)
		// return updatedPoints
	}

	useGSAP(
		(context) => {
			let mm = gsap.matchMedia()

			mm.add("(min-width: 100px)", () => {
				gsap.to(".line_path_reveal", {
					width: boundWidth,
					// duration: state.duration,
					duration: duration,
					repeat: -1,
					ease: "none",
					// reversed: true,
				})
			})

			gsap.registerPlugin(Draggable)

			state.points.map((point, i) => {
				// make all cyan white points draggable
				Draggable.create(`.point_${point.id}`, {
					bounds: graphRef.current,
					//! these bounds do not work
					// bounds: {minX: 0, maxX: 10, minY: 0, maxY: 10},
					// bounds: {top: 50, left: 50, width: 100, height: 100},
					// lockAxis: true,
					// If point is start or end of line, lock the X axis
					type:
						point.id === 0 ||
						point.id === state.points[state.points.length - 1].id
							? "y"
							: "x,y",
					// TODO how to get points to sit on edge of graph instead of just inside. account for radius
					// bounds: {top: 0, left: 0, width: boundWidth + 10, height: boundHeight + 10},
					//? update UI curve visually without effecting output easeCurve
					onDrag: function () {
						const pointIndex = state.points.findIndex((p) => p.id === point.id)
						if (pointIndex === -1) return
						const updatedPoints = getUpdatedPointsAndSort(this, point, "point")
						dispatch({
							type: "SET_DIRECTION",
							payload: writeDirectionCurve(updatedPoints, {
								w: boundWidth,
								h: boundHeight,
							}),
						})
					},
					//? actually update easeCurve and perform other clamp functions
					onDragEnd: function () {
						const pointIndex = state.points.findIndex((p) => p.id === point.id)
						if (pointIndex === -1) return
						const updatedPoints = getUpdatedPointsAndSort(this, point, "point")
						onChange(writeEaseCurve(updatedPoints, state.graph))
						dispatch({ type: "SET_POINTS", payload: updatedPoints })
					},
				})

				// hollow curve points
				Draggable.create(`.point_curve_${point.id}`, {
					bounds: graphRef.current,
					type:
						point.id === 0 ||
						point.id === state.points[state.points.length - 1].id
							? "y"
							: "x,y",
					onDrag: function () {
						const pointIndex = state.points.findIndex((p) => p.id === point.id)
						if (pointIndex === -1) return
						const updatedPoints = getUpdatedPointsAndSort(
							this,
							point,
							"point_curve"
						)

						dispatch({
							type: "SET_DIRECTION",
							payload: writeDirectionCurve(updatedPoints, {
								w: boundWidth,
								h: boundHeight,
							}),
						})
					},
					onDragEnd: function () {
						const pointIndex = state.points.findIndex((p) => p.id === point.id)
						if (pointIndex === -1) return
						const updatedPoints = getUpdatedPointsAndSort(
							this,
							point,
							"point_curve"
						)
						onChange(writeEaseCurve(updatedPoints, state.graph))
						dispatch({ type: "SET_POINTS", payload: updatedPoints })
					},
				})
			})

			// return () => {}
		},
		{
			scope: graphRef,
			dependencies: [
				state.customEase,
				// path,
				state.points,
				// state.duration
				duration,
			],
			revertOnUpdate: true,
		}
	)

	useGSAP(
		(context) => {
			let mm = gsap.matchMedia()

			mm.add("(min-width: 100px)", () => {
				gsap.registerPlugin(CustomEase)
				CustomEase.create("custom", state.customEase)
				// CustomEase.create("custom", path)

				gsap.to(".progress_dot_parameter", {
					// duration: state.duration,
					duration: duration,
					y: boundHeight,
					repeat: -1,
					ease: "custom",
					// reversed: true,
				})

				gsap.to(".progress_dot_time", {
					// duration: state.duration,
					duration: duration,
					x: boundWidth,
					repeat: -1,
					ease: "none",
					// reversed: true,
				})
			})

			// return () => {}
		},
		{
			scope: curveEditorRef,
			dependencies: [
				state.customEase,
				// path,
				// state.duration
				duration,
			],
			revertOnUpdate: true,
		}
	)

	const getCursorPoint = (
		event: DragEvent<SVGRectElement | SVGCircleElement>
	) => {
		if (!graphRef.current)
			return {
				command: "MOUSE",
				coordinates: [0, 0],
			}
		let cursorPoint = graphRef.current.createSVGPoint()
		cursorPoint.x = event.clientX
		cursorPoint.y = event.clientY
		cursorPoint = cursorPoint.matrixTransform(
			graphRef.current.getScreenCTM()?.inverse()
		)

		return {
			command: "MOUSE",
			coordinates: [cursorPoint.x, cursorPoint.y],
		}
	}

	function addPoint(event: MouseEvent<SVGRectElement, MouseEvent>) {
		event.stopPropagation()

		const cursorPoint = getCursorPoint(event as any)
		//! component works, idk what the type error is
		// @ts-ignore
		const sortedPoints = sortPoints([...state.points, cursorPoint])
		const index = sortedPoints.findIndex(
			(point) => point.coordinates[0] === cursorPoint.coordinates[0]
		)
		const prevPoint = sortedPoints[index - 1] || state.points[0]
		const prevCoordinates: [number, number] = [
			prevPoint.coordinates[prevPoint.command === "Q" ? 2 : 0],
			prevPoint.coordinates[prevPoint.command === "Q" ? 3 : 1],
		]
		const newPoint = {
			id: index,
			command: "Q",
			coordinates: [
				lerp(prevCoordinates[0], cursorPoint.coordinates[0], 0.5),
				lerp(prevCoordinates[1], cursorPoint.coordinates[1], 0.5),
				cursorPoint.coordinates[0],
				cursorPoint.coordinates[1],
			],
		} as Point
		const newAreaPoints = [...state.points, newPoint]

		const sortedPoints2 = sortPoints(newAreaPoints)
		onChange(writeEaseCurve(sortedPoints2, state.graph))
		dispatch({ type: "SET_POINTS", payload: sortedPoints2 })
	}

	function removePoint(
		event: MouseEvent<SVGCircleElement, MouseEvent>,
		index: number
	) {
		event.stopPropagation()
		const newAreaPoints = [...state.points]
		if (newAreaPoints.length > 3) {
			newAreaPoints.splice(index, 1)
			const sortedPoints = sortPoints(newAreaPoints)
			onChange(writeEaseCurve(sortedPoints, state.graph))
			dispatch({ type: "SET_POINTS", payload: sortedPoints })
		}
	}

	return (
		<>
			<div className={styles.wrapper} ref={curveEditorRef}>
				<div style={{ display: "flex" }}>
					<svg
						className={styles.graph + " graph_wrap_inner"}
						ref={graphRef}
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						height={boundHeight}
						// width={boundWidth}
						width={boundWidth}
						preserveAspectRatio="xMidYMid meet"
						xmlSpace="preserve"
					>
						{/* //TODO this causes scaling issues when shrinking graph hight */}
						<defs>
							<clipPath id="graph_path">
								<rect
									x="0"
									y="-200"
									width={boundWidth}
									height={boundHeight * 2}
								></rect>
							</clipPath>
							<clipPath id="graph_path_reveal">
								<rect
									x="0"
									y="-200"
									width="0"
									height={boundHeight * 2}
									className="line_path_reveal"
								></rect>
							</clipPath>
						</defs>

						<svg
							id="svg_path"
							width={boundWidth}
							height={boundHeight}
							preserveAspectRatio="xMidYMid meet"
							xmlSpace="preserve"
						>
							<rect
								className={styles.graph_bg}
								x="0"
								y="-150"
								width={boundWidth}
								height="650"
								rx="0.2"
								ry="0.2"
								clipPath="url(#graph_path)"
							></rect>

							<path
								id="line_path"
								ref={linePathRef}
								className={styles.graph_path}
								d={state.direction}
								clipPath="url(#graph_path)"
							></path>

							<path
								className={styles.graph_path_reveal}
								d={state.direction}
								clipPath="url(#graph_path_reveal)"
							></path>

							<rect
								width={boundWidth}
								height={boundHeight}
								fill="#04948d"
								fillOpacity="0.3"
								onDoubleClick={(e: any) => addPoint(e)}
							/>

							<PointGroup
								i={0}
								p={state.points[0]}
								className={"point_"}
								isCurveEdit={false}
							/>
							{/* .slice removes 1st and last element (start end points) without mutating */}
							{state.points.slice(1, -1).map((p, i) => (
								<PointGroup
									key={p.id}
									i={i}
									p={p}
									className={"point_"}
									// dragPoint={dragPoint}
									removePoint={removePoint}
								/>
							))}
							<PointGroup
								i={state.points.length - 1}
								p={state.points[state.points.length - 1]}
								className={"point_"}
								isCurveEdit={false}
							/>
						</svg>
					</svg>

					<svg
						className={styles.progress_wrap + " progress_track_parameter"}
						width={10}
						height={boundHeight}
					>
						<rect
							x={0}
							y={0}
							width={10}
							height={boundHeight}
							className={styles.progress_track}
						/>
						<circle
							className={styles.progress_dot + " progress_dot_parameter"}
							cx={5}
							cy={0}
							r="5"
							fill="limegreen"
						/>
					</svg>
				</div>

				<svg
					className={styles.progress_wrap + " progress_track_time"}
					width={boundWidth}
					height={10}
				>
					<rect
						x={0}
						y={0}
						width={boundWidth}
						height={10}
						className={styles.progress_track}
					/>
					<polygon
						className={styles.progress_dot + " progress_dot_time"}
						points="0,0 20,100 80,100"
						fill="limegreen"
					/>
				</svg>
			</div>
		</>
	)
}

type PointGroupProps = {
	i: number
	p: Point
	// dragPoint:(e:any,i:number) => any,
	removePoint?: (e: any, i: number) => any
	className: string
	isCurveEdit?: boolean
}

// todo make more robust conditional depending on `command` type
function PointGroup({
	i,
	p,
	removePoint = (e, i) => null,
	className = "point_",
	isCurveEdit = true,
}: PointGroupProps) {
	return (
		<g id={`p_${p.id}`}>
			<text
				x={p.coordinates[p.command === "Q" ? 2 : 0]}
				y={p.coordinates[p.command === "Q" ? 3 : 1]}
				fontSize="10pt"
				dy="0.35em"
				fill="white"
				style={{ transform: "scale(1,-1)" }}
			>
				{" "}
				{`id:${p.id}`}
			</text>

			{isCurveEdit && (
				<>
					<polyline
						className={styles.curve_tangent + ` point_tangent_${p.id}`}
						points={`
          ${p.coordinates[0]},${p.coordinates[1]},
          ${p.coordinates[2]},${p.coordinates[3]}
        `}
					></polyline>
					<circle
						cx={p.coordinates[0]}
						cy={p.coordinates[1]}
						r="5"
						className={styles.curve_point + ` point_curve_${p.id}`}
					/>
				</>
			)}
			<circle
				cx={p.coordinates[p.command === "Q" ? 2 : 0]}
				cy={p.coordinates[p.command === "Q" ? 3 : 1]}
				r="5"
				className={styles.point_2 + ` ${className + p.id}`}
				// onDrag={(e) => dragPoint(e, i)}
				onDoubleClick={(e: any) => removePoint(e, Number(p.id))}
			/>
		</g>
	)
}

function writeDirectionCurve(points: Point[], bounds: Bounds) {
	let directionString = ""

	points.map((point) => {
		directionString += point.command + point.coordinates.join(" ") + " "
	})

	return directionString
}
function writeEaseCurve(points: Point[], bounds: { w: number; h: number }) {
	let easeString = ""

	points.map((point) => {
		easeString +=
			point.command +
			normalizeCoordinates(point.coordinates, bounds).join(" ") +
			" "
	})

	return easeString
}

function scaleCoordinates(coordinates: number[], bounds: Bounds) {
	return coordinates.map((num, i) => {
		return i % 2 === 0
			? //? if i is even number, scale by Y axis (height).
			  num * bounds.h
			: //? if i is odd number, scale by X axis (width).
			  num * bounds.w
	})
}
function normalizeCoordinates(coordinates: number[], bounds: Bounds) {
	return coordinates.map((num, i) => {
		return i % 2 === 0
			? //? if i is even number, normalize by Y axis (height).
			  num / bounds.h
			: //? if i is odd number, normalize by X axis (width).
			  num / bounds.w
	})
}

function convertPathStringToPoints(path: string, bounds: Bounds) {
	const commands = path.match(/[a-z][^a-z]*/gi)
	if (!commands) return defaultPoints
	const points = commands.map((commandString, i) => {
		const command = commandString[0]
		const coordinates = commandString
			.slice(1)
			.trim()
			.split(/[\s,]+/)
			.map(Number)
		return {
			id: i,
			command,
			coordinates: scaleCoordinates(coordinates, {
				w: bounds.w,
				h: bounds.h,
			}),
		}
	})

	return points || defaultPoints
}

function sortPoints(points: Point[] | CursorPoint[]) {
	const sortedPoints = points.sort((a, b) => {
		// return a.x - b.x
		return a.coordinates[0] - b.coordinates[0]
	})
	//? fix index number
	return sortedPoints.map((p, i) => ({ ...p, id: i }))
}

function lerp(start: number, end: number, amt: number) {
	return (1 - amt) * start + amt * end
}

type EnvelopeState = {
	direction: string
	// duration: number
	customEase: string
	graph: {
		w: number
		h: number
	}
	points: Point[]
}

type Point = {
	id: number
	command: "M" | "Q" | "T" | string
	coordinates: number[]
}

type Bounds = { w: number; h: number }

type CursorPoint = {
	command: "MOUSE"
	coordinates: [number, number]
}

type Action =
	| { type: "RESET" }
	| { type: "SET_POINTS"; payload: Point[] }
	// | { type: "SET_DURATION"; payload: number }
	| { type: "SET_DIRECTION"; payload: string }
	| { type: "SET_WIDTH"; payload: number }
	| {
			type: "SET_EASE"
			payload: {
				x: number
				y: number
			}
	  }

// Helpful docs
// - https://css-tricks.com/svg-path-syntax-illustrated-guide/
// - https://css-tricks.com/svg-line-animation-works/
// - https://www.w3schools.com/graphics/tryit.asp?filename=trysvg_path2
// - https://gsap.com/docs/v3/Plugins/Draggable/
