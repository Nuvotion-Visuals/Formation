import { Box, NumberSlider } from '../../internal'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

interface TrackData {
  id: string,
  name: string,
  originalFrames: number,
  rate: number,
  offset: number,
  in: number,
  out: number
}

interface Props {
  width: number,
  trackData: TrackData,
  onTrackChange: (newTrackData: TrackData) => void
}

interface MouseEventReact extends React.MouseEvent {
  clientX: number,
}

interface InitialValue {
  in: number,
  out: number
}

export const Track = ({ trackData, width, onTrackChange }: Props) => {
  const [isDragging, setIsDragging] = useState<'in' | 'out' | null>(null)
  const [initialMouseX, setInitialMouseX] = useState<number | null>(null)
  const [initialValue, setInitialValue] = useState<InitialValue>({ in: 0, out: 0 })
  const trackRef = useRef<HTMLDivElement>(null)

  const onMouseDown = (event: MouseEventReact, which: 'in' | 'out') => {
    setIsDragging(which)
    setInitialMouseX(event.clientX)
    setInitialValue({ in: trackData.in, out: trackData.out })
  }

  const onMouseUp = () => {
    setIsDragging(null)
  }

  const onMouseMove = (event: MouseEventReact) => {
    if (isDragging) {
      const delta = event.clientX - (initialMouseX || 0)
      
      let updatedTrack = { ...trackData }

      if (isDragging === 'in') {
        updatedTrack.in = Math.min(
          Math.max(0, initialValue.in + delta),
          updatedTrack.out
        )
      } else {
        updatedTrack.out = Math.max(
          Math.min(initialValue.out + delta, trackData.originalFrames),
          updatedTrack.in
        )
      }
      onTrackChange(updatedTrack)
    }
  }

  const onMouseLeave = () => {
    setIsDragging(null)
  }

  return (
    <Tk.Track 
      ref={trackRef}
      style={{ width: `${width}%` }}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Tk.DragHandle onMouseDown={(e: MouseEventReact) => onMouseDown(e, 'in')} />
      <Box ml={.75}>
        { trackData.name }-
        { trackData.in }-
        { trackData.out }=
        {width}
      </Box>
      <Tk.DragHandle onMouseDown={(e: MouseEventReact) => onMouseDown(e, 'out')} />
    </Tk.Track>
  )
}


const Tk = {
  Track: styled.div`
    height: 100%;
    box-shadow: var(--F_Outline);
    display: flex;
    align-items: center;
    position: relative;
  `,
  DragHandle: styled.div`
    width: 24px;
    height: 100%;
    box-shadow: var(--F_Outline);

    cursor: ew-resize;
    position: absolute;
    top: 0;
    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }
  `
}


interface LayerProps {
  scale: number,
  projectRate: number,
  trackData: TrackData[],
  totalFrames: number,
  onTrackChange: (newTrackData: TrackData) => void
}

export const Layer = ({ 
  scale, 
  trackData, 
  onTrackChange, 
  totalFrames 
}: LayerProps) => {

  return (
    <L.Layer>
      {
        trackData.map(track =>
          <Track width={((track.out - track.in) / totalFrames) * 100} trackData={track} onTrackChange={onTrackChange}/>
        )
      }
    </L.Layer>
  )
}

const L = {
  Layer: styled.div`
    width: 100%;
    height: var(--F_Input_Height);
    background: var(--F_Surface);
    overflow-x: auto;
    display: flex;
  `
}


interface TimelineProps {
  
}

export const Timeline = ({ }: TimelineProps) => {
  const projectRate = 30
  const [totalFrames, setTotalFrames] = useState(1000)

  const [scale, setScale] = useState(50)

  const [trackData, setTrackData] = useState([
    {
      id: '1',
      name: 'Clip 1.mp4',
      originalFrames: 500,
      rate: 30,
      in: 0,
      out: 500,
      offset: 0
    },
    {
      id: '2',
      name: 'Clip 2.mp4',
      originalFrames: 300,
      rate: 30,
      in: 0,
      out: 300,
      offset: 500
    }
  ])

  return (<T.Timeline>
    <T.Top>
      <Box width={8}>
        <NumberSlider
          value={scale}
          onChange={val => setScale(val)}
          precise
          min={1}
          max={100}
        />
      </Box>
    </T.Top>
    <TimeRuler />
    <T.Layers>
      <Layer 
        trackData={trackData} 
        totalFrames={totalFrames}
        scale={scale} 
        projectRate={projectRate}
        onTrackChange={newTrackData => {
          const targetTrackIndex = trackData.findIndex(track => track.id === newTrackData.id)
          setTrackData(trackData.map(((track, index) => 
            index === targetTrackIndex
              ? newTrackData
              : track
          )))
        }}
      />
    </T.Layers>
  </T.Timeline>)
}

const T = {
  Timeline: styled.div`
    width: 100%;  
    user-select: none;
  `,
  Top: styled.div`
    width: 100%;
    height: var(--F_Input_Height_Compact);
    padding: .5rem 0;
  `,
  Layers: styled.div`
    width: 100%;  
  `
}

























interface TimeRulerProps {
  
}
export const TimeRuler = ({  }: TimeRulerProps) => {
  return (
    <Tr.TimeRuler>

    </Tr.TimeRuler>
  )
}

const Tr = {
    TimeRuler: styled.div`
    width: 100%;
    height: calc(var(--F_Input_Height) / 2);
    background: var(--F_Surface_0);
    background-image: repeating-linear-gradient(
      to right,
      var(--F_Surface),
      var(--F_Surface) 1px,
      transparent 1px,
      transparent 10px
    );
  `
}
