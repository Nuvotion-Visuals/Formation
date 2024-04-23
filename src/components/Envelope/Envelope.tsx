import React, { useRef, MouseEvent, DragEvent, useState, useEffect } from 'react'
import gsap from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import { useGSAP } from '@gsap/react'
// @ts-ignore
import styles from './envelope.module.css'

type Props = {
	phase: number
	value: number
	path: string
	duration: number
	boundHeight: number
	boundWidth: number
	onChange: (path: string) => void
}

export const Envelope = ({
	path = 'M0 0 Q0.25 0.25 0.5 0.5 T1 1',
	duration = 4,
	onChange,
	boundHeight,
	boundWidth,
	phase,
	value
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
		// todo clamp x between neighboring point's x value
		// todo if start or end point always make x = 0 || x = graph.w
		const gx = Number(x * boundWidth)
		const gy = Number(y * boundHeight)

		const pointIndex = points.findIndex((p: Point) => p.id === point.id)
		if (pointIndex === -1) return points
		const thisPoint = points[pointIndex]

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
					// todo hacky way of seeing if curve point or reg point. Maybe there is a more elgant way of doing this
					return type === 'point'
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
			...points.slice(0, pointIndex),
			updatedPoint,
			...points.slice(pointIndex + 1),
		]

		// todo why sorting points here is buggy?
		return sortPoints(updatedPoints)
	}

	useGSAP(() => {
		gsap.registerPlugin(Draggable)

		// gsap.to('.line_path_reveal', {
		// 	width: boundWidth,
		// 	// duration: state.duration,
		// 	duration: duration,
		// 	repeat: -1,
		// 	ease: 'none',
		// 	// reversed: true,
		// })

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
			duration,
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
		const newAreaPoints = [...points, newPoint]

		const sortedPoints2 = sortPoints(newAreaPoints)

		handlePointsUpdateEnd(sortedPoints2)
	}

	const removePoint = (
		event: MouseEvent<SVGCircleElement, MouseEvent>,
		index: number
	) => {
		event.stopPropagation()
		const newAreaPoints = [...points]
		if (newAreaPoints.length > 3) {
			newAreaPoints.splice(index, 1)
			const sortedPoints = sortPoints(newAreaPoints)

			handlePointsUpdateEnd(sortedPoints)
		}
	}

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

	return (
		<>
			<div className={styles.wrapper} ref={curveEditorRef}>
				<div style={{ display: 'flex' }}>
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
							<rect
								className={styles.graph_bg}
								x='0'
								y='-150'
								width={boundWidth}
								height={boundHeight}
								rx='0.2'
								ry='0.2'
								clipPath='url(#graph_path)'
							/>

							<path
								id='line_path'
								ref={linePathRef}
								className={styles.graph_path}
								d={scaledPath}
								clipPath='url(#graph_path)'
							/>

							<path
								className={styles.graph_path_reveal}
								d={scaledPath}
								clipPath='url(#graph_path_reveal)'
							/>

							<rect
								height={boundHeight}
								width={boundWidth}
								fill='#04948d'
								fillOpacity='0.3'
								onDoubleClick={(e: any) => addPoint(e)}
							/>

							<PointGroup
								i={0}
								p={points[0]}
								className={'point_'}
								isCurveEdit={false}
							/>
							{/* .slice removes 1st and last element (start end points) without mutating */}
							{
								points.slice(1, -1).map((p, i) => (
									<PointGroup
										key={p.id}
										i={i}
										p={p}
										className={'point_'}
										// dragPoint={dragPoint}
										removePoint={removePoint}
									/>
								))
							}
							<PointGroup
								i={points.length - 1}
								p={points[points.length - 1]}
								className={'point_'}
								isCurveEdit={false}
							/>
						</svg>
					</svg>

					<svg
						className={styles.progress_wrap + ' progress_track_parameter'}
						height={boundHeight}
						width={10}
					>
						<rect
							x={0}
							y={0}
							height={boundHeight}
							width={10}
							className={styles.progress_track}
						/>
						<circle
							className={styles.progress_dot + ' progress_dot_parameter'}
							cy={value * size.height}
							cx={5}
							r='5'
							fill='limegreen'
						/>
					</svg>
				</div>

				<svg
					className={styles.progress_wrap + ' progress_track_time'}
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
					<circle
						className={styles.progress_dot}
						cy={5}
						cx={phase * size.width}
						r='5'
						fill='limegreen'
					/>
				</svg>
			</div>
		</>
	)
}

type PointGroupProps = {
	i: number
	p: Point
	removePoint?: (e: any, i: number) => any
	className: string
	isCurveEdit?: boolean
}

// todo make more robust conditional depending on `command` type
const PointGroup = ({
	i,
	p,
	removePoint = (e, i) => null,
	className = 'point_',
	isCurveEdit = true,
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
				className={styles.point_2 + ` ${className + p.id}`}
				onDoubleClick={(e: any) => removePoint(e, Number(p.id))}
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
