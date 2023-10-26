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

interface TrackProps {
  width: number,
  offset: number,
  trackData: TrackData,
  onTrackChange: (newTrackData: TrackData) => void
}

interface MouseEventReact extends React.MouseEvent {
  clientX: number,
}

interface InitialValue {
  in: number,
  out: number,
  offset: number
}

export const Track = ({ trackData, width, offset, onTrackChange }: TrackProps) => {
  const [isDragging, setIsDragging] = useState<'in' | 'out' | 'offset' | null>(null)
  const [initialMouseX, setInitialMouseX] = useState<number | null>(null)
  const [initialValue, setInitialValue] = useState<InitialValue>({ in: 0, out: 0, offset: 0 })
  const trackRef = useRef<HTMLDivElement>(null)

  const onMouseDown = (event: MouseEventReact, which: 'in' | 'out' | 'offset') => {
    setIsDragging(which)
    setInitialMouseX(event.clientX)
    setInitialValue({ in: trackData.in, out: trackData.out, offset: trackData.offset })
  }

  const onMouseUp = () => {
    setIsDragging(null)
  }

  const onMouseMove = (event: MouseEventReact) => {
    if (isDragging) {
      const delta = event.clientX - (initialMouseX || 0)
      let updatedTrack = { ...trackData }

      switch (isDragging) {
        case 'in': {
          updatedTrack.in = Math.min(
            Math.max(0, initialValue.in + delta),
            updatedTrack.out
          )
          updatedTrack.offset = initialValue.offset + delta
          break
        }
        case 'out': {
          updatedTrack.out = Math.max(
            Math.min(initialValue.out + delta, trackData.originalFrames),
            updatedTrack.in
          )
          break
        }
        case 'offset': {
          updatedTrack.offset = initialValue.offset + delta
          break
        }
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
      style={{ width: `${width}%`, left: `${offset}%`, top: '0' }}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Tk.DragHandle onMouseDown={(e: MouseEventReact) => onMouseDown(e, 'in')} />
      <Tk.DragHandleInner onMouseDown={(e: MouseEventReact) => onMouseDown(e, 'offset')}>
        <Box ml={.75}>
          { trackData.name }-
          { trackData.in }-
          { trackData.out }=
          {width}
        </Box>
      </Tk.DragHandleInner>
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
    position: absolute;
  `,
  DragHandle: styled.div`
    width: 24px;
    height: 100%;

    cursor: ew-resize;
    position: absolute;
    top: 0;
    &:first-child {
      left: 0;
      border-right: 1px dashed var(--F_Surface_2);
    }
    &:last-child {
      right: 0;
      border-left: 1px dashed var(--F_Surface_2);
    }
  `,
  DragHandleInner: styled.div`
    width: calc(100% - 48px);
    margin-left: 24px;
    height: 100%;
    display: flex;
    align-items: center;
  `
}


interface LayerProps {
  scale: number,
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
          <Track 
            width={((track.out - track.in) / totalFrames) * 100} 
            offset={(track.offset / totalFrames) * 100}
            trackData={track} 
            onTrackChange={onTrackChange}
          />
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
    position: relative;
  `
}


interface TimelineProps {
  
}

export const Timeline = ({ }: TimelineProps) => {
  const [frameRate, setFrameRate] = useState(30)
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
