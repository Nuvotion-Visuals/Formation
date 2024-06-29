import React, {
	useRef,
	MouseEvent,
	DragEvent,
	useState,
	useEffect,
} from 'react'
import gsap from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import { useGSAP } from '@gsap/react'
import styled from 'styled-components'
import { Box, Dropdown, Gap, NumberInput, Select, Spacer } from '../../internal'

type Props = {
	phase: number
	path: string
	boundHeight: number
	boundWidth: number
	onChange: (path: string) => void
	range: number[]
}

export const Envelope = ({
	path = 'M0 0 Q0.25 0.25 0.5 0.5 T1 1',
	onChange,
	boundHeight,
	boundWidth,
	phase,
	range,
}: Props) => {
	const graphRef = useRef<SVGSVGElement>(null)

	const [points, setPoints] = useState<Point[]>(
		convertPathStringToPoints(path, {
			h: boundHeight,
			w: boundWidth,
		})
	)
	const [scaledPath, setScaledPath] = useState<string>(() => {
		return writeScaledPath(points, {
			h: boundHeight,
			w: boundWidth,
		})
	})
	const curveEditorRef = useRef<HTMLDivElement>(null)
	const linePathRef = useRef<SVGPathElement>(null)

	const handlePointsUpdateEnd = (updatedPoints: Point[]) => {
		const bounds = { h: boundHeight, w: boundWidth }

		setPoints(updatedPoints)
		setScaledPath(writeScaledPath(updatedPoints, bounds))
		onChange(writeNormalizedPath(updatedPoints, bounds))
	}

	const getUpdatedPointsAndSort = (
		cursorPos: Draggable.Vars,
		point: Point,
		type: 'point' | 'point_curve'
	) => {
		const boundW = Math.abs(cursorPos.minX) + Math.abs(cursorPos.maxX)
		const boundH = Math.abs(cursorPos.minY) + Math.abs(cursorPos.maxY)
		const x = (cursorPos.x + Math.abs(cursorPos.minX)) / boundW
		const y = (cursorPos.y + Math.abs(cursorPos.minY)) / boundH
		const gx = Number(x * boundWidth)
		const gy = Number(y * boundHeight)

		const pointIndex = points.findIndex((p: Point) => p.id === point.id)
		if (pointIndex === -1) return points
		const thisPoint = points[pointIndex]
		const prevAnchorX = points[pointIndex - 1]
			? coordinateAnchor(points[pointIndex - 1]).x
			: 0

		if (!thisPoint || !thisPoint.coordinates) {
			console.error('Point or coordinates undefined', thisPoint)
			return points
		}

		const updatedPointByCommand = () => {
			switch (point.command) {
				case 'M':
				case 'L':
					return {
						...thisPoint,
						coordinates: [
							point.id === 0
								? 0
								: point.id === points.length - 1
								? boundWidth
								: gx,
							gy,
						],
					}

				default:
					if (type === 'point' && thisPoint.coordinates.length >= 4) {
						return {
							...thisPoint,
							coordinates: [
								clampAxis(thisPoint.coordinates[0], prevAnchorX, gx),
								thisPoint.coordinates[1],
								point.id === points.length - 1 ? boundWidth : gx,
								gy,
							],
						}
					} else if (thisPoint.coordinates.length >= 4) {
						return {
							...thisPoint,
							coordinates: [
								clampAxis(gx, prevAnchorX, coordinateAnchor(thisPoint).x),
								gy,
								thisPoint.coordinates[2],
								thisPoint.coordinates[3],
							],
						}
					} else {
						return thisPoint
					}
			}
		}

		const updatedPoint = updatedPointByCommand()

		const updatedPoints = [
			...points.slice(0, pointIndex),
			updatedPoint,
			...points.slice(pointIndex + 1),
		]
		return sortPoints(updatedPoints)
	}

	useGSAP(
		() => {
			gsap.registerPlugin(Draggable)

			points.map((point, i) => {
				Draggable.create(`.point_${point.id}`, {
					bounds: graphRef.current,
					type:
						point.id === 0 || point.id === points[points.length - 1].id
							? 'y'
							: 'x,y',
					onDrag: function () {
						const pointIndex = points.findIndex((p) => p.id === point.id)
						if (pointIndex === -1) return
						const updatedPoints = getUpdatedPointsAndSort(this, point, 'point')

						setScaledPath(
							writeScaledPath(updatedPoints, {
								w: boundWidth,
								h: boundHeight,
							})
						)
					},
					onDragEnd: function () {
						console.log('## point onDragEnd')

						const pointIndex = points.findIndex((p) => p.id === point.id)
						if (pointIndex === -1) return
						const updatedPoints = getUpdatedPointsAndSort(this, point, 'point')
						handlePointsUpdateEnd(updatedPoints)
					},
				})

				Draggable.create(`.point_curve_${point.id}`, {
					bounds: graphRef.current,
					type: 'x,y',
					onDrag: function () {
						const pointIndex = points.findIndex((p) => p.id === point.id)
						if (pointIndex === -1) return
						const updatedPoints = getUpdatedPointsAndSort(
							this,
							point,
							'point_curve'
						)

						setScaledPath(
							writeScaledPath(updatedPoints, {
								w: boundWidth,
								h: boundHeight,
							})
						)
					},
					onDragEnd: function () {
						const pointIndex = points.findIndex((p) => p.id === point.id)
						if (pointIndex === -1) return
						const updatedPoints = getUpdatedPointsAndSort(
							this,
							point,
							'point_curve'
						)

						handlePointsUpdateEnd(updatedPoints)
					},
				})
			})
		},
		{
			scope: graphRef,
			dependencies: [points],
			revertOnUpdate: true,
		}
	)

	const getCursorPoint = (
		event: DragEvent<SVGRectElement | SVGCircleElement>
	) => {
		if (!graphRef.current)
			return {
				command: 'MOUSE',
				coordinates: [0, 0],
			}
		let cursorPoint = graphRef.current.createSVGPoint()
		cursorPoint.x = event.clientX
		cursorPoint.y = event.clientY
		cursorPoint = cursorPoint.matrixTransform(
			graphRef.current.getScreenCTM()?.inverse()
		)

		return {
			command: 'MOUSE',
			coordinates: [cursorPoint.x, cursorPoint.y],
		}
	}

	const addPoint = (event: MouseEvent<SVGRectElement, MouseEvent>) => {
		event.stopPropagation()

		const cursorPoint = getCursorPoint(event as any)
		// @ts-ignore
		const sortedPoints = sortPoints([...points, cursorPoint])
		const index = sortedPoints.findIndex(
			(point) => point.coordinates[0] === cursorPoint.coordinates[0]
		)
		const prevPoint = sortedPoints[index - 1] || points[0]
		const prevAnchor: SimpleCoordinate = coordinateAnchor(prevPoint)
		const newPoint = {
			id: index,
			command: 'Q',
			coordinates: [
				lerp(prevAnchor.x, cursorPoint.coordinates[0], 0.5),
				lerp(prevAnchor.y, cursorPoint.coordinates[1], 0.5),
				cursorPoint.coordinates[0],
				cursorPoint.coordinates[1],
			],
		} as Point
		handlePointsUpdateEnd(sortPoints([...points, newPoint], boundWidth))
	}

	const removePoint = (
		event: MouseEvent<SVGCircleElement, MouseEvent>,
		index: number
	) => {
		event.stopPropagation()
		const newAreaPoints = [...points]
		if (newAreaPoints.length > 3) {
			newAreaPoints.splice(index, 1)
			handlePointsUpdateEnd(sortPoints(newAreaPoints, boundWidth))
		}
	}

	useEffect(() => {
		const newPoints = convertPathStringToPoints(path, {
			h: boundHeight,
			w: boundWidth,
		})
		if (
			!newPoints ||
			newPoints.some((point) => typeof point === 'undefined' || point === null)
		) {
			console.error('Invalid points data:', newPoints)
		} else {
			setPoints(newPoints)

			setScaledPath(
				writeScaledPath(newPoints, {
					h: boundHeight,
					w: boundWidth,
				})
			)
		}
	}, [path, boundHeight, boundWidth])

	const [activePoint, setActivePoint] = useState<Point | undefined>()

	function handleCurveSelection(command: CommandLetter) {
		if (!activePoint) return

		const prevPoint = points[activePoint.id - 1] || points[0]
		const nextPoint = points[activePoint.id + 1] || points[points.length - 1]
		const nextAnchor: SimpleCoordinate = coordinateAnchor(prevPoint)
		const prevAnchor: SimpleCoordinate = coordinateAnchor(prevPoint)

		const updatedPoint = (() => {
			switch (command) {
				case 'M':
				case 'L':
					return {
						...nextPoint,
						command: nextPoint.command === 'M' ? 'M' : command,
						coordinates: [
							coordinateAnchor(nextPoint).x,
							coordinateAnchor(nextPoint).y,
						],
					}
				default:
					return {
						...nextPoint,
						command: command,
						coordinates: [
							nextPoint.coordinates.length > 2
								? nextPoint.coordinates[0]
								: lerp(
										coordinateAnchor(activePoint).x,
										coordinateAnchor(nextPoint).x,
										0.5
								  ),
							nextPoint.coordinates.length > 2
								? nextPoint.coordinates[1]
								: lerp(
										coordinateAnchor(activePoint).y,
										coordinateAnchor(nextPoint).y,
										0.5
								  ),
							coordinateAnchor(nextPoint).x,
							coordinateAnchor(nextPoint).y,
						],
					}
			}
		})()

		const updatedPoints = [
			...points.slice(0, nextPoint.id),
			updatedPoint,
			...points.slice(nextPoint.id + 1),
		] as Point[]

		setPoints(sortPoints(updatedPoints))

		const bounds = { w: boundWidth, h: boundHeight }

		setScaledPath(writeScaledPath(updatedPoints, bounds))
		onChange(writeNormalizedPath(updatedPoints, bounds))
	}

	const updatePhase = (newPhase: number) => {
		if (activePoint == null) return
		const newPoints = [...points]
		newPoints[activePoint.id].coordinates[
			coordinateAnchor(points[activePoint.id]).x
		] = (newPhase / 100) * boundWidth
		handlePointsUpdateEnd(newPoints)
	}

	const updateValue = (newValue: number) => {
		if (activePoint == null) return
		const newPoints = [...points]
		newPoints[activePoint.id].coordinates[
			coordinateAnchor(points[activePoint.id]).y
		] = (newValue / 100) * boundHeight
		handlePointsUpdateEnd(newPoints)
	}

	const customEases = [
		{ label: 'Default', value: 'M0 0 L1 1' },
		{
			label: 'Digital',
			value:
				'M0 0 L0 1 L0.25 1 L0.25001 0 L0.5 0 L0.50001 1 L0.75 1 L0.75001 0 L1 0',
		},
		{
			label: 'Jaws',
			value:
				'M0 0 Q0.0625 0.8 0.125 0.8 Q0.1875 0 0.25 0 Q0.3125 0.8 0.375 0.8 Q0.4375 0 0.5 0 Q0.5625 0.8 0.625 0.8 Q0.6875 0 0.75 0 Q0.8125 0.8 0.875 0.8 Q0.9375 0 1 0',
		},
		{
			label: 'Noise',
			value:
				'M0 0 Q0.05 0.3 0.1 0.6 Q0.15 0 0.2 0 Q0.25 0.4 0.3 0.4 Q0.35 0 0.4 1 Q0.45 0 0.5 0 Q0.55 0.3 0.6 0.6 Q0.65 1 0.7 1 Q0.75 0.1 0.8 0.2 Q0.85 0.9 0.9 0.8 Q0.95 0.2 1 0.4',
		},
		{
			label: 'Saw',
			value:
				'M0 0 L0.125 1 L0.25 0 L0.375 1 L0.5 0 L0.625 1 L0.75 0 L0.875 1 L1 0',
		},
	]

	return (
		<S.Wrapper ref={curveEditorRef}>
			<S.Graph
				ref={graphRef}
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
				x='0px'
				y='0px'
				height={boundHeight}
				width={boundWidth}
				preserveAspectRatio='xMidYMid meet'
				xmlSpace='preserve'
			>
				<defs>
					<clipPath id='graph_path'>
						<rect x='0' y='-200' height={boundHeight * 2} width={boundWidth} />
					</clipPath>
					<clipPath id='graph_path_reveal'>
						<rect
							x='0'
							y='-200'
							height={boundHeight * 2}
							width={boundWidth * phase}
							className='line_path_reveal'
						/>
					</clipPath>
				</defs>

				<svg
					id='svg_path'
					height={boundHeight}
					width={boundWidth}
					preserveAspectRatio='xMidYMid meet'
					xmlSpace='preserve'
				>
					<S.GraphPath
						id='line_path'
						ref={linePathRef}
						d={scaledPath}
						clipPath='url(#graph_path)'
					/>

					<path
						d={`M0,${boundHeight} ${scaledPath.slice(1)} V0 H0 Z`}
						fill='var(--F_Surface_0)'
					/>

					<S.GraphPathReveal
						d={scaledPath}
						clipPath='url(#graph_path_reveal)'
					/>

					<rect
						height={boundHeight}
						width={boundWidth}
						fillOpacity='0'
						onDoubleClick={(e: any) => addPoint(e)}
					/>

					{points.map((p, i) => (
						<PointGroup
							key={p.id}
							i={i}
							p={p}
							className={'point_'}
							removePoint={removePoint}
							activePoint={activePoint}
							onSetActivePoint={() => setActivePoint(p)}
						/>
					))}
				</svg>
			</S.Graph>

			<Box mt={0.25}>
				<Gap disableWrap gap={1}>
					<Gap autoWidth gap={0.25}>
						<S.Label>Phase</S.Label>
						{activePoint != null && (
							<NumberInput
								value={
									(points[activePoint.id]?.coordinates[
										coordinateAnchor(points[activePoint.id]).x
									] /
										boundWidth) *
									100
								}
								onChange={(value) => updatePhase(value)}
							/>
						)}
						<S.Label>%</S.Label>
					</Gap>

					<Gap autoWidth gap={0.25}>
						<S.Label>Value</S.Label>
						{activePoint != null && (
							<NumberInput
								value={
									(points[activePoint.id]?.coordinates[
										coordinateAnchor(points[activePoint.id]).y
									] /
										boundHeight) *
										(range[1] - range[0]) +
									range[0]
								}
								onChange={(value) => updateValue(value)}
							/>
						)}
					</Gap>

					<Spacer />
					<Gap autoWidth gap={0.5}>
						<S.Label>Curve</S.Label>
						<Box width={8}>
							{activePoint?.id === points.length - 1 ? (
								<p> --n/a-- </p>
							) : (
								<Select
									value={
										activePoint
											? (getNextPoint(activePoint, points).command as string)
											: 'Q'
									}
									compact
									options={[
										{
											value: 'Q',
											label: 'Quadratic',
										},
										{
											value: 'S',
											label: 'Smooth',
										},
										{
											value: 'L',
											label: 'Linear',
										},
									]}
									onChange={(val: unknown) => {
										handleCurveSelection(val as CommandLetter)
									}}
								/>
							)}
						</Box>
					</Gap>
					<Dropdown
						icon={'bars'}
						iconPrefix='fas'
						items={customEases.map((ease) => ({
							text: ease.label,
							onClick: () => {
								onChange(ease.value)
							},
						}))}
						square
						compact
					/>
				</Gap>
			</Box>
			<p>debug path: {path}</p>
			<br />
			<pre>debug activePoint: {JSON.stringify(activePoint, null, 2)}</pre>
		</S.Wrapper>
	)
}

type PointGroupProps = {
	i: number
	p: Point
	removePoint?: (e: any, i: number) => any
	className: string
	isCurveEdit?: boolean
	activePoint: Point | undefined
	onSetActivePoint: (p: Point) => void
}

const PointGroup = ({
	i,
	p,
	removePoint = (e, i) => null,
	className = 'point_',
	isCurveEdit = true,
	activePoint,
	onSetActivePoint,
}: PointGroupProps) => {
	return (
		<g id={`p_${p.id}`}>
			{p.coordinates.length > 2 && isCurveEdit && (
				<>
					<S.CurveTangent
						className={`point_tangent_${p.id}`}
						points={p.coordinates.join(',')}
					/>
					<S.CurvePoint
						cx={p.coordinates[0]}
						cy={p.coordinates[1]}
						r='5'
						className={`point_curve_${p.id}`}
					/>
				</>
			)}
			<circle
				cx={coordinateAnchor(p).x}
				cy={coordinateAnchor(p).y}
				r='5'
				fill={
					activePoint && activePoint.id === p.id
						? 'var(--F_Primary_Variant)'
						: 'white'
				}
				className={`${className + p.id}`}
				onDoubleClick={(e: any) => removePoint(e, Number(p.id))}
				onClick={() => onSetActivePoint(p)}
			/>
		</g>
	)
}

const writeScaledPath = (points: Point[], bounds: Bounds) => {
	let directionString = ''

	points.map((point) => {
		directionString += point.command + point.coordinates.join(' ') + ' '
	})

	return directionString
}

const writeNormalizedPath = (
	points: Point[],
	bounds: { w: number; h: number }
) => {
	let normalizedPath = ''

	points.map((point) => {
		normalizedPath +=
			point.command +
			normalizeCoordinates(point.coordinates, bounds).join(' ') +
			' '
	})

	return normalizedPath
}

const scaleCoordinates = (coordinates: number[], bounds: Bounds) => {
	const scaledCoordinates = coordinates.map((num, i) =>
		i % 2 === 0
			? num * bounds.w
			: num * bounds.h
	)
	return scaledCoordinates
}

const normalizeCoordinates = (coordinates: number[], bounds: Bounds) => {
	const normalized = coordinates.map((num, i) =>
		i % 2 === 0 ? num / bounds.w : num / bounds.h
	)
	return normalized
}

const convertPathStringToPoints = (path: string, bounds: Bounds) => {
	const commands = path.match(/[a-z][^a-z]*/gi)
	if (!commands) throw Error('no commands found')
	const scaledPoints = commands.map((commandString, i) => {
		const command = commandString[0]
		const coordinates = commandString
			.slice(1)
			.trim()
			.split(/[\s,]+/)
			.map(Number)

		return {
			id: i,
			command,
			coordinates: scaleCoordinates(coordinates, bounds),
		}
	})

	return scaledPoints
}

function coordinateAnchor(point: Point) {
	return {
		x: point.coordinates[point.coordinates.length - 2],
		y: point.coordinates[point.coordinates.length - 1],
	}
}

function getNextPoint(activePoint: Point, points: Point[]) {
	const nextPoint = points[activePoint.id + 1] || points[points.length - 1]
	return nextPoint
}

const sortPoints = (points: Point[] | CursorPoint[], boundWidth?: number) => {
	const sortedPoints = points.sort((a, b) => {
		return coordinateAnchor(a as Point).x - coordinateAnchor(b as Point).x
	})

	const pointsWithIDs = sortedPoints.map((p, i) => ({ ...p, id: i }))
	return pointsWithIDs as Point[]
}

const lerp = (start: number, end: number, amt: number) => {
	return (1 - amt) * start + amt * end
}

function clampAxis(
	currentPosition: number,
	prevAnchorAxis: number,
	thisAnchorAxis: number
) {
	switch (true) {
		case currentPosition > thisAnchorAxis:
			return thisAnchorAxis

		case currentPosition < prevAnchorAxis:
			return prevAnchorAxis

		default:
			return currentPosition
	}
}

type CommandLetter = 'M' | 'L' | 'Q' | 'S'

type Command = {
	M: [number, number]
	L: [number, number]
	Q: [number, number, number, number]
	S: [number, number, number, number]
	T: [number, number]
	[command: string]: number[]
}

type Point<K extends keyof Command = keyof Command> = {
	id: number
	command: K
	coordinates: Command[K]
}

type Bounds = { w: number; h: number }
type SimpleCoordinate = { x: number; y: number }

type CursorPoint = {
	command: 'MOUSE'
	coordinates: [number, number]
}

const S = {
	Wrapper: styled.div`
		display: grid;
	`,
	Graph: styled.svg`
		transform: scale(1, -1);
		background-size: 40px 40px;
		background-image: linear-gradient(
			to right,
			var(--F_Surface_0) 1px,
			transparent 1px
		);
		background-color: var(--F_Background_Alternating);
	`,
	GraphPath: styled.path`
		fill: none;
		stroke: var(--F_Surface_1);
		stroke-width: 3px;
		stroke-linecap: round;
		stroke-linejoin: round;
	`,
	GraphPathReveal: styled.path`
		fill: none;
		stroke: var(--F_Font_Color);
		stroke-width: 2px;
		stroke-linecap: round;
		stroke-linejoin: round;
	`,
	CurveTangent: styled.polyline`
		stroke: var(--F_Surface_2);
	`,
	CurvePoint: styled.circle`
		stroke: var(--F_Font_Color);
		stroke-width: 2px;
		z-index: 3;
		fill: transparent;
		cursor: pointer;
	`,
	Label: styled.div`
		font-size: var(--F_Font_Size_Small);
		color: var(--F_Font_Color_Disabled);
	`,
}