import React, { useReducer, useRef, type MouseEvent, type DragEvent} from "react";
import gsap from 'gsap'
import  Draggable  from "gsap/dist/Draggable";
import  CustomEase  from "gsap/dist/CustomEase";
import { useGSAP } from "@gsap/react"
// @ts-ignore
import styles from './envelope.module.css'

// ? dimensions of the editor, hight doesn't like to go below 300ish
const initGraph = {
  w:500,
  h:500
}

//! make sure ids are unique! `id = 0` is reserved for `startPoint`
const initPoints:Point[] = [
  { 
    id: 0, 
    x: 0, 
    y: 0, 
    cx: 0, 
    cy: 0,
  },
  { 
    id: 1, 
    x: initGraph.w * 0.5, 
    y: initGraph.h * 0.5, 
    cx: initGraph.w * 0.5, 
    cy: initGraph.h * 0.1,
  },
  {
    //? last point id must = last index of `initPoints.length`
    id: 2, 
    x: initGraph.w, 
    y: initGraph.h, 
    cx: initGraph.w * 0.5, 
    cy: initGraph.h * 0.98,
  }
]

const initialState:CurveState = {
  direction: writeDirectionCurve(initPoints, {w: initGraph.w, h: initGraph.h }),
  duration: 5,
  customEase: writeEaseCurve(initPoints, initGraph),
  graph: initGraph,
  points: initPoints,
}

const reducer = (state:CurveState, action:Action) => {
  switch (action.type) {

    case "SET_POINTS":
      const sortedPoints = sortPoints(action.payload) as Point[]
      return {
        ...state,
        points: sortedPoints,
        direction: writeDirectionCurve(sortedPoints, {w: initGraph.w, h: initGraph.h }),
        customEase: writeEaseCurve(sortedPoints, initGraph),
      }

    case "SET_DIRECTION":
      return {
        ...state,
        direction: action.payload,
      }

    case "SET_DURATION":
      return {
        ...state,
        duration: action.payload,
      }

    case "RESET":
      return initialState

    default:
      return state;
  }
}

// TODO fn that reverse exports customEase to points
// props to add
// value = string `customEase`
// onChange = fn return the `customEase` for the parameter animation to use

// durationValue
// onDurationChange what is the output of this component

// x axis = comes from global context
// y axis value (opacity, saturation, transform, etc)

//// width = 100%
// get client bounds (dynamic width, dynamically get width of component)
// height = #px (comes from parent)

export function Envelope ({ prop }:Props) {

  const [state, dispatch] = useReducer(reducer, initialState);
  const graphRef = useRef<SVGSVGElement>(null);
  const curveEditorRef = useRef<HTMLDivElement>(null);

  function getUpdatedPoints(cursorPos:Draggable.Vars, point:Point, type:'point'|'point_curve'){
    const boundW = Math.abs(cursorPos.minX) + Math.abs(cursorPos.maxX)
    const boundH = Math.abs(cursorPos.minY) + Math.abs(cursorPos.maxY)
    const x = (cursorPos.x + Math.abs(cursorPos.minX)) / boundW
    const y = (cursorPos.y + Math.abs(cursorPos.minY)) / boundH
    // todo clamp x between neighboring point's x value
    // todo if start or end point always make x = 0 || x = graph.w
    const gx = Number(x * state.graph.w)
    const gy = Number(y * state.graph.h)
    
    const pointIndex = state.points.findIndex((p) => p.id === point.id)
    if (pointIndex === -1) return state.points
    //todo hacky way to update regular vs curve point. might want to change later
    const updatedPoint = (type === 'point') 
      ? { ...state.points[pointIndex], x: gx, y: gy} 
      : { ...state.points[pointIndex], cx: gx, cy: gy}
    
    const updatedPoints = [
      ...state.points.slice(0, pointIndex),
      updatedPoint,
      ...state.points.slice(pointIndex + 1),
    ]
    return updatedPoints
  }

  useGSAP((context) => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 100px)", () => {

      gsap.to('.line_path_reveal', {
        width: state.graph.w,
        duration: state.duration,
        repeat: -1,
        ease: 'none',
        // reversed: true,
      })
    })

    gsap.registerPlugin(Draggable)

    state.points.map((point,i) => {
      // make all cyan white points draggable
      Draggable.create(`.point_${point.id}`, {
        bounds: graphRef.current,
        //! these bounds do not work
        // bounds: {minX: 0, maxX: 10, minY: 0, maxY: 10},
        // bounds: {top: 50, left: 50, width: 100, height: 100},
        // lockAxis: true,
        // If point is start or end of line, lock the X axis 
        type: (point.id === 0 || point.id === state.points[state.points.length-1].id) ? 'y' : 'x,y',
        // TODO how to get points to sit on edge of graph instead of just inside. account for radius
        // bounds: {top: 0, left: 0, width: state.graph.w + 10, height: state.graph.h + 10},
        //? update UI curve visually without effecting output easeCurve
        onDrag: function() {
          const pointIndex = state.points.findIndex((p) => p.id === point.id)
          if (pointIndex === -1) return 
          const updatedPoints = getUpdatedPoints(this, point, 'point')
          dispatch({type: 'SET_DIRECTION', payload: writeDirectionCurve(updatedPoints, {w: initGraph.w, h: initGraph.h })})
        },
        //? actually update easeCurve and perform other clamp functions
        onDragEnd: function() {
          const pointIndex = state.points.findIndex((p) => p.id === point.id)
          if (pointIndex === -1) return 
          const updatedPoints = getUpdatedPoints(this, point, 'point')

          dispatch({type: 'SET_POINTS', payload: updatedPoints })
        }
      })

      // hollow curve points
      Draggable.create(`.point_curve_${point.id}`, {
        bounds: graphRef.current,
        type: (point.id === 0 || point.id === state.points[state.points.length-1].id) ? 'y' : 'x,y',
        onDrag: function() {
          const pointIndex = state.points.findIndex((p) => p.id === point.id)
          if (pointIndex === -1) return 
          const updatedPoints = getUpdatedPoints(this, point, 'point_curve')

          dispatch({type: 'SET_DIRECTION', payload: writeDirectionCurve(updatedPoints, {w: initGraph.w, h: initGraph.h })})
        },
        onDragEnd: function() {
          const pointIndex = state.points.findIndex((p) => p.id === point.id)
          if (pointIndex === -1) return 
          const updatedPoints = getUpdatedPoints(this, point, 'point_curve')
          
          dispatch({type: 'SET_POINTS', payload: updatedPoints })
        }
      })
    })

    // return () => {}
    
  }, { scope: graphRef, dependencies: [state.customEase, state.points, state.duration], revertOnUpdate: true  })

  useGSAP((context) => {
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 100px)", () => {

      gsap.registerPlugin(CustomEase)
      CustomEase.create("custom", state.customEase)
      
      gsap.to(
        ".progress_dot_parameter", 
        { 
          duration: state.duration, 
          y: state.graph.h,
          repeat: -1,
          ease: "custom",
          // reversed: true,
        }
      )
  
      gsap.to(
        ".progress_dot_time", 
        { 
          duration: state.duration, 
          x: state.graph.w,
          repeat: -1,
          ease: "none",
          // reversed: true,
        }
      )
    })

    // return () => {}
    
  }, { scope: curveEditorRef, dependencies: [state.customEase, state.duration], revertOnUpdate: true })

  const getCursorPoint = (event:DragEvent<SVGRectElement|SVGCircleElement>) => {
    if(!graphRef.current) return {x: 0, y: 0}
    let cursorPoint = graphRef.current.createSVGPoint();
    cursorPoint.x = event.clientX;
    cursorPoint.y = event.clientY;
    cursorPoint = cursorPoint.matrixTransform(
      graphRef.current.getScreenCTM()?.inverse()
    )

    return {
      x: cursorPoint.x,
      y: cursorPoint.y,
    }
  };

  function addPoint(event:MouseEvent<SVGRectElement, MouseEvent>){    
    event.stopPropagation();

    const cursorPoint:CursorPoint = getCursorPoint(event as any)
    const sortedPoints = sortPoints([...state.points, cursorPoint])
    const index = sortedPoints.findIndex((point) => point.x === cursorPoint.x)
    const prevPoint = {
      x: sortedPoints[index - 1]?.x || state.points[0].x,
      y: sortedPoints[index - 1]?.y || state.points[0].y,
    }
    const newPoint = {
      id: index,
      ...cursorPoint,
      cx: lerp(prevPoint.x, cursorPoint.x, 0.5),
      cy: lerp(prevPoint.y, cursorPoint.y, 0.5),
    } as Point
    const newAreaPoints = [...state.points, newPoint];

    dispatch({type: 'SET_POINTS', payload: newAreaPoints })
  }

  function removePoint(event:MouseEvent<SVGCircleElement, MouseEvent>, index:number){
    event.stopPropagation();
    const newAreaPoints = [...state.points];
    if (newAreaPoints.length > 3) {
      newAreaPoints.splice(index, 1);
      dispatch({type: 'SET_POINTS', payload: newAreaPoints})
    }
  }

  return <>
    <div className={styles.wrapper} ref={curveEditorRef}>

      <svg 
        className={styles.graph + ' graph_wrap_inner'} 
        ref={graphRef}
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        x="0px" 
        y="0px" 
        // viewBox={`0 0 ${state.graph.w} ${state.graph.h}`}
        height={state.graph.h}
        width={state.graph.w}
        preserveAspectRatio="xMidYMid meet" 
        xmlSpace="preserve"
      >
        {/* //TODO this causes scaling issues when shrinking graph hight */}
        <defs>
          <clipPath id="graph_path">
            <rect 
              x="0" y="-200" 
              width={state.graph.w} height={state.graph.h * 2}
            ></rect>
          </clipPath>
          <clipPath id="graph_path_reveal">
            <rect 
              x="0" y="-200" 
              width="0" height={state.graph.h * 2}
              className="line_path_reveal"
            ></rect>
          </clipPath>
        </defs>
      
        <svg 
          // viewBox={`0 0 ${state.graph.w} ${state.graph.h}`}
          width={state.graph.w}
          height={state.graph.h}
          preserveAspectRatio="xMidYMid meet" 
          xmlSpace="preserve"
        >

          <rect 
            className={styles.graph_bg}
            x="0" y="-150" 
            width={state.graph.w} height="650" 
            rx="0.2" ry="0.2" 
            clipPath="url(#graph_path)"
          ></rect>
          
          <path 
            className={styles.graph_path} 
            d={state.direction} 
            clipPath="url(#graph_path)" 
          ></path>

          <path 
            className={styles.graph_path_reveal}
            d={state.direction} 
            clipPath="url(#graph_path_reveal)"
          ></path>
          
          <rect width={state.graph.w} height={state.graph.h} fill="#04948d" fillOpacity="0.3" onDoubleClick={(e:any) => addPoint(e)}/>

          <PointGroup 
            i={0}
            p={state.points[0]}
            className={'point_'}
            isCurveEdit={false}
          />
          <PointGroup 
            i={state.points.length-1}
            p={state.points[state.points.length-1]}
            className={'point_'}
            isCurveEdit={false}
          />
          {/* .slice removes 1st and last element (start end points) without mutating */}
          {state.points.slice(1, -1).map((p,i) => 
            <PointGroup 
              key={p.id} 
              i={i}
              p={p} 
              className={'point_'}
              // dragPoint={dragPoint} 
              removePoint={removePoint}
            />
          )}

        </svg>
      </svg>

      <svg 
        className={styles.progress_wrap + ' progress_track_parameter'} 
        width={10} 
        height={state.graph.h}
      >
        <rect x={0} y={0} width={10} height={state.graph.h} className={styles.progress_track}  />
        <circle className={styles.progress_dot + ' progress_dot_parameter'} cx={5} cy={0} r="5" fill="limegreen" />
      </svg>

      <svg 
        className={styles.progress_wrap + ' progress_track_time'} 
        width={state.graph.w} 
        height={10}
      >
        <rect x={0} y={0} width={state.graph.w} height={10} className={styles.progress_track}  />
        <polygon className={styles.progress_dot + ' progress_dot_time'} points="0,0 20,100 80,100" fill="limegreen" />
      </svg>
    </div>

    <div>

      <label>
        <span> duration: </span>
        <input type="number" step={0.1} value={state.duration} onChange={(e) => dispatch({type: 'SET_DURATION', payload: Number(e.target.value)})}/>
      </label>

      <h5>direction: </h5>
      <p>  <code>{state.direction}</code></p>
      <h5>customEase: </h5>
      <p> <code> {state.customEase} </code></p>
      <hr />
      <table>
        <caption> Points </caption>
        <thead>
          <tr>
            <td> index </td>
            <td> id </td>
            <td> x </td>
            <td> y </td>
            <td> cx </td>
            <td> cy </td>
          </tr>
        </thead>
        <tbody>
          {state.points.map((p,i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{p.id}</td>
              <td>{Math.round(p.x)}</td>
              <td>{Math.round(p.y)}</td>
              <td>{Math.round(p.cx)}</td>
              <td>{Math.round(p.cy)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
}

type PointGroupProps = {
  i:number,
  p:Point,
  // dragPoint:(e:any,i:number) => any,
  removePoint?:(e:any,i:number) => any,
  className:string,
  isCurveEdit?:boolean,
}

function PointGroup({ i, p, removePoint = (e,i) => null, className = 'point_', isCurveEdit = true}:PointGroupProps) {

  return  <g>
    <text x={p.x} y={p.y} fontSize="10pt" dy="0.35em" fill="white" style={{transform: 'scale(1,-1)'}}> {`id:${p.id}`}</text>

    {isCurveEdit && <>
      <polyline 
        className={styles.curve_tangent + ` point_tangent_${p.id}`}
        points={`
          ${p.x},${p.y},
          ${p.cx},${p.cy}
        `}
      ></polyline>
      <circle 
        cx={p.cx}  cy={p.cy} 
        r="5" 
        className={styles.curve_point + ` point_curve_${p.id}`} 
      />
    </>}
    <circle 
      cx={p.x}  cy={p.y} 
      r="5" 
      className={styles.point_2 + ` ${className + p.id}`} 
      // onDrag={(e) => dragPoint(e, i)}
      onDoubleClick={(e:any) => removePoint(e, Number(p.id))}
    />
  </g>
  
}

function writeDirectionCurve(points:Point[], boundaries:{w:number,h:number}){
  let pointsString = "";
  // if(!points) pointsString = "0,0"
  const startPoint = points[0]
  const endPoint = points[points.length-1]
  // get points exclusive to start and end
  points.slice(1, -1).map((point) => {
    // ? was playing around with the beginning and end points being in the same points array
    // if (i === 0 || i === points.length - 1) return;
    pointsString += `Q${point.cx},${point.cy} ${point.x},${point.y} `;
  })
  // M-start Q-curve-point T-end
  // clamp start and end points x value
  return `M${initPoints[0].x},${startPoint.y} ${pointsString}T${boundaries.w},${endPoint.y}`;
}
function writeEaseCurve(points:Point[], boundaries:{w:number,h:number}){
  let easeString = "";
  const startPoint = points[0]
  const endPoint = points[points.length-1]
  points.slice(1, -1).map((point) => {
    easeString += `Q${point.cx / boundaries.w},${point.cy / boundaries.h} ${point.x / boundaries.w},${point.y / boundaries.h} `;
  })

  const startPointPercent = {
    x: startPoint.x / boundaries.w,
    y: startPoint.y / boundaries.h,
  }
  const endPointPercent = {
    x: endPoint.x / boundaries.w,
    y: endPoint.y / boundaries.h,
  }
  // clamp start and end points x value
  return `M${0},${startPointPercent.y} ${easeString}T${1},${endPointPercent.y}`
}

function sortPoints(points:Point[]|CursorPoint[]){
  const sortedPoints = points.sort((a,b) => { return a.x - b.x })
  //? fix index number
  return sortedPoints.map((p,i) => ({...p, id: i}))
}

function lerp (start:number, end:number, amt:number){
  return (1-amt)*start+amt*end
}

type Props = {
  prop?:string
}

type CurveState = {
  direction:string,
  duration:number,
  customEase:string,
  graph: {
    w:number,
    h:number,
  }
  points:Point[],
}

type Point = {
  id:number,
  x:number,
  y:number,
  // curve point
  cx:number,
  cy:number,
}

type CursorPoint = {
  x:number,
  y:number,
}

type Action =
  | { type: 'RESET' }
  | { type: 'SET_POINTS'; payload: Point[]}
  | { type: 'SET_DURATION'; payload: number}
  | { type: 'SET_DIRECTION', payload: string }
  | { type: 'SET_EASE'; payload: {
    x:number,
    y:number,
  }}

// Helpful docs
// - https://css-tricks.com/svg-path-syntax-illustrated-guide/
// - https://css-tricks.com/svg-line-animation-works/
// - https://www.w3schools.com/graphics/tryit.asp?filename=trysvg_path2
// - https://gsap.com/docs/v3/Plugins/Draggable/