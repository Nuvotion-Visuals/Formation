import React, { useRef, MouseEvent, DragEvent, useState, useEffect } from 'react'
import gsap from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import { useGSAP } from '@gsap/react'
// @ts-ignore
import styles from './envelope.module.css'
import { Box, Dropdown, Gap, NumberInput, Select, Spacer } from '../../internal'
import styled from 'styled-components'

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
	range
}: Props) => {	
  const graphRef = useRef<SVGSVGElement>(null)

	const [points, setPoints] = useState<Point[]>(
		convertPathStringToPoints(path, {
			h: boundHeight,
			w: boundWidth,
		})
	)
	const [scaledPath, setScaledPath] = useState<string>(
		writeScaledPath(points, {
			h: boundHeight,
			w: boundWidth,
		})
	)
	const curveEditorRef = useRef<HTMLDivElement>(null)
	const linePathRef = useRef<SVGPathElement>(null)

	const handlePointsUpdateEnd = (updatedPoints: Point[]) => {
		const bounds = { h: boundHeight, w: boundWidth }

		setPoints(updatedPoints)
		setScaledPath(writeScaledPath(updatedPoints, bounds))
		//? set curve Path
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
		if (pointIndex === -1) return points // Ensure the point exists
		const thisPoint = points[pointIndex]
		
		if (!thisPoint || !thisPoint.coordinates) {
			console.error("Point or coordinates undefined", thisPoint)
			return points // Return the current points if the new point is undefined
		}
	
		const updatedPointByCommand = () => {
			switch (point.command) {
				case 'M':
					return {
						...thisPoint,
						coordinates: [0, gy],
					}
				case 'T':
					return {
						...thisPoint,
						coordinates: [boundWidth, gy],
					}
				case 'Q':
					if (type === 'point' && thisPoint.coordinates.length >= 4) {
						return {
							...thisPoint,
							coordinates: [
								thisPoint.coordinates[0],
								thisPoint.coordinates[1],
								gx,
								gy,
							],
						}
					} else if (thisPoint.coordinates.length >= 4) {
						return {
							...thisPoint,
							coordinates: [
								gx,
								gy,
								thisPoint.coordinates[2],
								thisPoint.coordinates[3],
							],
						}
					}
					break
				default:
					return thisPoint
			}
		}
		
		const updatedPoint = updatedPointByCommand()
		
		const updatedPoints = [
			...points.slice(0, pointIndex),
			updatedPoint,
			...points.slice(pointIndex + 1),
		]
	
		// @ts-ignore fix this
		return sortPoints(updatedPoints)
	}

	useGSAP(() => {
		gsap.registerPlugin(Draggable)

		points.map((point, i) => {
			// make all cyan white points draggable
			Draggable.create(`.point_${point.id}`, {
				bounds: graphRef.current,
				//! these bounds do not work
				// bounds: {minX: 0, maxX: 10, minY: 0, maxY: 10},
				// bounds: {top: 50, left: 50, width: 100, height: 100},
				// lockAxis: true,
				// If point is start or end of line, lock the X axis
				type:
					point.id === 0 || point.id === points[points.length - 1].id
						? 'y'
						: 'x,y',
				// TODO how to get points to sit on edge of graph instead of just inside. account for radius
				// bounds: {top: 0, left: 0, width: boundWidth + 10, height: boundHeight + 10},
				//? update UI curve visually without effecting output easeCurve
				onDrag: function () {
					const pointIndex = points.findIndex((p) => p.id === point.id)
					if (pointIndex === -1) return
					const updatedPoints = getUpdatedPointsAndSort(this, point, 'point')

					// todo why is this making points barely draggable?
					// handlePointDrag(updatedPoints)
					setScaledPath(
						writeScaledPath(updatedPoints, {
							w: boundWidth,
							h: boundHeight,
						})
					)
				},
				//? actually update easeCurve and perform other clamp functions
				onDragEnd: function () {
					const pointIndex = points.findIndex((p) => p.id === point.id)
					if (pointIndex === -1) return
					const updatedPoints = getUpdatedPointsAndSort(this, point, 'point')
					handlePointsUpdateEnd(updatedPoints)
				},
			})

			// hollow curve points
			Draggable.create(`.point_curve_${point.id}`, {
				bounds: graphRef.current,
				type:
					point.id === 0 || point.id === points[points.length - 1].id
						? 'y'
						: 'x,y',
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
		dependencies: [
			points,
		],
		revertOnUpdate: true,
	})

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
		//! component works, idk what the type error is
		// @ts-ignore
		const sortedPoints = sortPoints([...points, cursorPoint])
		const index = sortedPoints.findIndex(
			(point) => point.coordinates[0] === cursorPoint.coordinates[0]
		)
		const prevPoint = sortedPoints[index - 1] || points[0]
		const prevCoordinates: [number, number] = [
			prevPoint.coordinates[prevPoint.command === 'Q' ? 2 : 0],
			prevPoint.coordinates[prevPoint.command === 'Q' ? 3 : 1],
		]
		const newPoint = {
			id: index,
			command: 'Q',
			coordinates: [
				lerp(prevCoordinates[0], cursorPoint.coordinates[0], 0.5),
				lerp(prevCoordinates[1], cursorPoint.coordinates[1], 0.5),
				cursorPoint.coordinates[0],
				cursorPoint.coordinates[1],
			],
		} as Point
		handlePointsUpdateEnd(sortPoints([...points, newPoint]))
	}

	const removePoint = (
		event: MouseEvent<SVGCircleElement, MouseEvent>,
		index: number
	) => {
		event.stopPropagation()
		const newAreaPoints = [...points]
		if (newAreaPoints.length > 3) {
			newAreaPoints.splice(index, 1)
			handlePointsUpdateEnd(sortPoints(newAreaPoints))
		}
	}
	
	useEffect(() => {
		const newPoints = convertPathStringToPoints(path, {
			h: boundHeight,
			w: boundWidth,
		})
		if (!newPoints || newPoints.some(point => typeof point === 'undefined' || point === null)) {
			console.error('Invalid points data:', newPoints);
		} else {
			setPoints(newPoints)
			setScaledPath(writeScaledPath(newPoints, {
				h: boundHeight,
				w: boundWidth,
			}))
		}
	}, [path, boundHeight, boundWidth])

	const [size, setSize] = useState({ width: 0, height: 0 })

	useEffect(() => {
    const observeSize = (entries: ResizeObserverEntry[]) => {
      const { width, height } = entries[0].contentRect
      setSize({ width, height })
    }
    const observer = new ResizeObserver(observeSize)
    if (graphRef.current) {
      observer.observe(graphRef.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [])

	const [activePoint, setActivePoint] = useState<number | null>(0)

	type CurveOption = {
		value: string
		label: string
		controlPoints: (currentPoint: Point, prevPoint: Point, nextPoint: Point) => number[]
	}
	
	// Example curve shapes with their control point logic
	const curveOptions: CurveOption[] = [
		{
			value: 'linear',
			label: 'Linear',
			controlPoints: (currentPoint, prevPoint, nextPoint) => {
				// Linear doesn't use control points, but we can calculate a midpoint
				return [lerp(prevPoint.coordinates[0], nextPoint.coordinates[0], 0.5), lerp(prevPoint.coordinates[1], nextPoint.coordinates[1], 0.5)]
			}
		},
		{
			value: 'quadratic',
			label: 'Quadratic',
			controlPoints: (currentPoint, prevPoint, nextPoint) => {
				// This is an example, you'd define your own logic for control point calculation
				return [
					lerp(prevPoint.coordinates[0], nextPoint.coordinates[0], 0.25),
					lerp(prevPoint.coordinates[1], nextPoint.coordinates[1], 0.75)
				]
			}
		},
		// Add more curves as needed
	]

	const [activeCurve, setActiveCurve] = useState('Quadratic')

	useEffect(() => {
		console.log(activePoint)
	}, [activePoint])

	const updatePhase = (newPhase: number) => {
		if (activePoint == null) return;
		const newPoints = [...points];
		newPoints[activePoint].coordinates[points[activePoint].command === 'Q' ? 2 : 0] = (newPhase / 100) * boundWidth;
		handlePointsUpdateEnd(newPoints);
	}
	
	const updateValue = (newValue: number) => {
		if (activePoint == null) return;
		const newPoints = [...points];
		newPoints[activePoint].coordinates[points[activePoint].command === 'Q' ? 3 : 1] = (newValue / 100) * boundHeight;
		handlePointsUpdateEnd(newPoints);
	}

	const customEases = [
		{ label: 'Default', value: 'M0 0 L1 1' },
		{ label: 'Digital', value: 'M0 0 L0.16 0 L0.16 1 L0.33 1 L0.33 0 L0.5 0 L0.5 1 L0.66 1 L0.66 0 L0.83 0 L0.83 1 L1 1' },
		{ label: 'Jaws', value: 'M0 0 Q0.0625 0.8 0.125 0.8 Q0.1875 0 0.25 0 Q0.3125 0.8 0.375 0.8 Q0.4375 0 0.5 0 Q0.5625 0.8 0.625 0.8 Q0.6875 0 0.75 0 Q0.8125 0.8 0.875 0.8 Q0.9375 0 1 0' },
		{ label: 'Noise', value: 'M0 0 Q0.05 0.3 0.1 0.6 Q0.15 0 0.2 0 Q0.25 0.4 0.3 0.4 Q0.35 0 0.4 1 Q0.45 0 0.5 0 Q0.55 0.3 0.6 0.6 Q0.65 1 0.7 1 Q0.75 0.1 0.8 0.2 Q0.85 0.9 0.9 0.8 Q0.95 0.2 1 0.4' },
		{ label: 'Saw', value: 'M0 0 L0.125 1 L0.25 0 L0.375 1 L0.5 0 L0.625 1 L0.75 0 L0.875 1 L1 0' }
	]

	return (
		<div className={styles.wrapper} ref={curveEditorRef}>
			<svg
				className={styles.graph + ' graph_wrap_inner'}
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
				{/* //TODO this causes scaling issues when shrinking graph hight */}
				<defs>
					<clipPath id='graph_path'>
						<rect
							x='0'
							y='-200'
							height={boundHeight * 2}
							width={boundWidth}
						/>
					</clipPath>
					<clipPath id='graph_path_reveal'>
						<rect
							x='0'
							y='-200'
							height={boundHeight * 2}
							width={size.width * phase}
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
					<path
						id='line_path'
						ref={linePathRef}
						className={styles.graph_path}
						d={scaledPath}
						clipPath='url(#graph_path)'
					/>

					<path
						d={`M0,${boundHeight} ${scaledPath.slice(1)} V0 H0 Z`}
						fill="var(--F_Surface_0)"
					/>

					<path
						className={styles.graph_path_reveal}
						d={scaledPath}
						clipPath='url(#graph_path_reveal)'
					/>

					<rect
						height={boundHeight}
						width={boundWidth}
						fillOpacity='0'
						onDoubleClick={(e: any) => addPoint(e)}
					/>

					<PointGroup
						i={0}
						p={points[0]}
						className={'point_'}
						isCurveEdit={false}
						activePoint={activePoint}
						onSetActivePoint={id => setActivePoint(id)}
					/>
					{
						// .slice removes 1st and last element (start end points) without mutating
						points.slice(1, -1).map((p, i) => (
							<PointGroup
								key={p.id}
								i={i}
								p={p}
								className={'point_'}
								removePoint={removePoint}
								activePoint={activePoint}
								onSetActivePoint={id => setActivePoint(id)}
							/>
						))
					}
					<PointGroup
						i={points.length - 1}
						p={points[points.length - 1]}
						className={'point_'}
						isCurveEdit={false}
						activePoint={activePoint}
						onSetActivePoint={id => setActivePoint(id)}
					/>
				</svg>
			</svg>
			
			<Box mt={.25}>
				<Gap disableWrap gap={1}>
					<Gap autoWidth gap={.25}>
						<S.Label>
							Phase
						</S.Label>
							{
								activePoint != null && 
									<NumberInput
										value={(points[activePoint]?.coordinates[points[activePoint].command === 'Q' ? 2 : 0] / boundWidth) * 100}
										onChange={value => updatePhase(value)}
									/>
							}
						<S.Label>
							%
						</S.Label>
					</Gap>
					
					<Gap autoWidth gap={.25}>
						<S.Label>
							Value
						</S.Label>
						{
							activePoint != null && 
							<NumberInput
								value={((points[activePoint]?.coordinates[points[activePoint].command === 'Q' ? 3 : 1] / boundHeight) * (range[1] - range[0]) + range[0])}
								onChange={value => updateValue(value)}
							/>
						}
					</Gap>
					
					<Spacer />
					<Gap autoWidth gap={.5}>
						<S.Label>
							Curve
						</S.Label>
						<Box width={8}>
							<Select
								value={activeCurve}
								compact
								options={[
									{
										value: 'Quadratic',
										label: 'Quadratic'
									}
								]}
								onChange={val => setActiveCurve(val)}
							/>
						</Box>
					</Gap>
					<Dropdown
						icon={'bars'}
						iconPrefix='fas'
						items={customEases.map(ease => ({
							text: ease.label,
							onClick: () => {
								onChange(ease.value)
							}
						}))}
						square
						compact
					/>
				</Gap>
			</Box>
		</div>
	)
}

type PointGroupProps = {
	i: number
	p: Point
	removePoint?: (e: any, i: number) => any
	className: string
	isCurveEdit?: boolean
	activePoint: number | null
	onSetActivePoint: (id: number) => void
}

// todo make more robust conditional depending on `command` type
const PointGroup = ({
	i,
	p,
	removePoint = (e, i) => null,
	className = 'point_',
	isCurveEdit = true,
	activePoint,
	onSetActivePoint
}: PointGroupProps) => {
	return (
		<g id={`p_${p.id}`}>
			{isCurveEdit && (
				<>
					<polyline
						className={styles.curve_tangent + ` point_tangent_${p.id}`}
						points={`
							${p.coordinates[0]},${p.coordinates[1]},
							${p.coordinates[2]},${p.coordinates[3]}
						`}
					/>
					<circle
						cx={p.coordinates[0]}
						cy={p.coordinates[1]}
						r='5'
						className={styles.curve_point + ` point_curve_${p.id}`}
					/>
				</>
			)}
			<circle
				cx={p.coordinates[p.command === 'Q' ? 2 : 0]}
				cy={p.coordinates[p.command === 'Q' ? 3 : 1]}
				r='5'
				fill={activePoint === p.id ? 'var(--F_Primary_Variant)' : 'white'}
				className={`${className + p.id}`}
				onDoubleClick={(e: any) => removePoint(e, Number(p.id))}
				onClick={() => onSetActivePoint(p.id)}
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
			 	//? if i is odd number, scale by X axis (width).
			? num * bounds.w
			 	//? if i is even number, scale by Y axis (height).
			: num * bounds.h
	)
	return scaledCoordinates
}

const normalizeCoordinates = (coordinates: number[], bounds: Bounds) => {
	const normalized = coordinates.map((num, i) =>
		// if x axis / by w | if y axis / by h
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

const sortPoints = (points: Point[] | CursorPoint[]) => {
	const sortedPoints = points.sort((a, b) => {
		// return a.x - b.x
		return a.coordinates[0] - b.coordinates[0]
	})
	//? fix index number
	return sortedPoints.map((p, i) => ({ ...p, id: i }))
}

const lerp = (start: number, end: number, amt: number) => {
	return (1 - amt) * start + amt * end
}

type Point = {
	id: number
	command: 'M' | 'Q' | 'T' | string
	coordinates: number[]
}

type Bounds = { w: number; h: number }

type CursorPoint = {
	command: 'MOUSE'
	coordinates: [number, number]
}

// Helpful docs
// - https://css-tricks.com/svg-path-syntax-illustrated-guide/
// - https://css-tricks.com/svg-line-animation-works/
// - https://www.w3schools.com/graphics/tryit.asp?filename=trysvg_path2
// - https://gsap.com/docs/v3/Plugins/Draggable/

const S = {
	Label: styled.div`
		font-size: var(--F_Font_Size_Small);
		color: var(--F_Font_Color_Disabled);
	`
}