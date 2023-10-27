import { Box, Button, FileUpload, Gap, NumberSlider, generateThumbnail, generateVideoThumbnails } from '../../internal'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getVideoInfo } from './getVideoInfo'

interface TrackData {
  id: string,
  name: string,
  originalDuration: number,
  offset: number,
  in: number,
  out: number,
  previews: string[]
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
    if (isDragging && trackRef.current) {
      const actualWidth = trackRef.current.clientWidth
      const totalWidth = trackData.out - trackData.in // Removed the offset from the total width
      const scale = actualWidth / totalWidth
  
      let delta = (event.clientX - (initialMouseX || 0)) / scale
      delta = Math.round(delta)
  
      let updatedTrack = { ...trackData }
  
      switch (isDragging) {
        case 'in': {
          updatedTrack.in = Math.min(
            Math.max(0, initialValue.in + delta),
            updatedTrack.out
          )
          updatedTrack.offset = Math.max(0, initialValue.offset + delta)
          break
        }
        case 'out': {
          updatedTrack.out = Math.max(
            Math.min(initialValue.out + delta, trackData.originalDuration),
            updatedTrack.in
          )
          break
        }
        case 'offset': {
          updatedTrack.offset = Math.max(0, initialValue.offset + delta)
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
      isDragging={!!isDragging}
    >
      <Tk.DragHandle onMouseDown={(e: MouseEventReact) => onMouseDown(e, 'in')} />
      <Tk.DragHandleInner onMouseDown={(e: MouseEventReact) => onMouseDown(e, 'offset')}>
        {/* <Box ml={-.5}>
          { trackData.name }
        </Box> */}
        {
          trackData.previews.map(preview =>
            <img src={preview} style={{height: '100%'}} draggable="false" />
          )
        }
      </Tk.DragHandleInner>
      <Tk.DragHandle onMouseDown={(e: MouseEventReact) => onMouseDown(e, 'out')} />
    </Tk.Track>
  )
}

interface TrackCompProps {
  isDragging: boolean
}
const Tk = {
  Track: styled.div<TrackCompProps>`
    height: calc(100% - .25rem);
    box-shadow: var(--F_Outline);
    box-shadow: ${props => props.isDragging ? 'inset 0 0 0 2px var(--F_Primary_Variant)' : 'inset 0 0 0 2px var(--F_Surface_2)'};
    z-index: ${props => props.isDragging ? '1' : '0'};
    background: var(--F_Surface);
    padding: .125rem 0;
    overflow: hidden;
    border-radius: .25rem;
    display: flex;
    align-items: center;
    position: absolute;
    cursor: grab;
  `,
  DragHandle: styled.div`
    width: 24px;
    height: 100%;

    cursor: ew-resize;
    position: absolute;
    z-index: 1;
    top: 0;
    &:first-child {
      left: 0;
      /* border-right: 2px dashed var(--F_Surface_2); */
    }
    &:last-child {
      right: 0;
      /* border-left: 2px dashed var(--F_Surface_2); */
    }
  `,
  DragHandleInner: styled.div`
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    margin: 2px;
    display: flex;
    align-items: center;
    overflow: hidden;
    left: 0;
    user-select: none;

  `
}


interface LayerProps {
  scale: number,
  trackData: TrackData[],
  totalDuration: number,
  onTrackChange: (newTrackData: TrackData) => void
}

export const Layer = ({ 
  scale, 
  trackData, 
  onTrackChange, 
  totalDuration
}: LayerProps) => {

  return (
    <L.Layer>
      {
        trackData.map(track =>
          <Track 
            width={((track.out - track.in) / totalDuration) * 100} 
            offset={(track.offset / totalDuration) * 100}
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
    background: var(--F_Surface_0);
    overflow-x: auto;
    display: flex;
    position: relative;
  `
}


interface TimelineProps {
  
}

export const Timeline = ({ }: TimelineProps) => {
  // const [frameRate, setFrameRate] = useState(30)
  const [totalDuration, setTotalDuration] = useState(20000)

  const [scale, setScale] = useState(50)

  const [trackData, setTrackData] = useState<TrackData[]>([])

  const [history, setHistory] = useState([trackData])
  const [pointer, setPointer] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debounceUpdateHistory = (newData: TrackData[]) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setHistory(prev => {
        const newHistory = prev.slice(0, pointer + 1)
        newHistory.push(newData)
        return newHistory
      })
      setPointer(prev => prev + 1)
    }, 300)
  }

  const undo = () => {
    if (pointer > 0) {
      setPointer(prev => {
        const newPointer = prev - 1
        setTrackData(history[newPointer])
        return newPointer
      })
    }
  }

  const redo = () => {
    if (pointer < history.length - 1) {
      setPointer(prev => {
        const newPointer = prev + 1
        setTrackData(history[newPointer])
        return newPointer
      })
    }
  }

  useEffect(() => {
    if (pointer === history.length - 1 || pointer === -1) {
      debounceUpdateHistory(trackData)
    }
  }, [trackData])

  const [playheadPosition, setPlayheadPosition] = useState<number>(0)
  const [playheadTime, setPlayheadTime] = useState<string>('00:00:000')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const animationFrameId = useRef<number | null>(null)
  const lastFrameTime = useRef<number>(Date.now())
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // Update the last frame time based on the current playhead position
      lastFrameTime.current = Date.now() - (playheadPosition / 100) * totalDuration
    }
  }

  const movePlayhead = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - lastFrameTime.current
    const elapsedPercentage = (elapsed / totalDuration) * 100
    const maxOutValue = trackData.reduce((max, track) => {
      return Math.max(max, track.offset + track.out)
    }, 0)
    const maxOutValuePercentage = (maxOutValue / totalDuration) * 100
  
    if (elapsedPercentage >= maxOutValuePercentage) {
      // Pause if it reaches or exceeds maxOutValue
      setIsPlaying(false)
      setPlayheadPosition(maxOutValuePercentage)
      setPlayheadTime(formatTime(maxOutValue))
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current)
      }
      return
    }
  
    if (elapsedPercentage >= 0 && elapsedPercentage <= 100) {
      setPlayheadPosition(elapsedPercentage)
      setPlayheadTime(formatTime(elapsed))
    } 
    else if (elapsedPercentage > 100) {
      // Stop the animation if it goes beyond the total duration
      setPlayheadPosition(100)
      setPlayheadTime(formatTime(totalDuration))
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  
    animationFrameId.current = requestAnimationFrame(movePlayhead)
  }
  

  useEffect(() => {
    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(movePlayhead)
    } else {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isPlaying])

  const skipForward = () => {
    // Convert track offsets to percentage of totalDuration for comparison
    const nextOffsets = trackData.map(track => (track.offset / totalDuration) * 100).filter(offset => offset > playheadPosition)
    if (nextOffsets.length === 0) return
  
    const closestNextOffset = Math.min(...nextOffsets)
    setPlayheadPosition(closestNextOffset)
  
    // Update lastFrameTime with the new position
    lastFrameTime.current = Date.now() - (closestNextOffset / 100) * totalDuration
  }
  
  const skipBack = () => {
    // Convert track offsets to percentage of totalDuration for comparison
    const prevOffsets = trackData.map(track => (track.offset / totalDuration) * 100).filter(offset => offset < playheadPosition)
    if (prevOffsets.length === 0) return
  
    const closestPrevOffset = Math.max(...prevOffsets)
    setPlayheadPosition(closestPrevOffset)
  
    // Update lastFrameTime with the new position
    lastFrameTime.current = Date.now() - (closestPrevOffset / 100) * totalDuration
  }
  
  

  const [snap, setSnap] = useState(false)
  const toggleSnap = () => setSnap(!snap)

  const handleUpload = async (files: File[]) => {
    if (files?.[0]) {
      const file = files?.[0]
      if (file) {
        setLoading(true)
        const {
          fileName,
          dimensions,
          fileSize,
          duration
        } = await getVideoInfo(file)

        const durationMs = duration * 1000
        const id = fileName
    
        // Add new track data
        setTrackData(prev => {
          const maxOutValue = prev.reduce((max, track) => {
            return Math.max(max, track.offset + track.out)
          }, 0)
        
          return [
            ...prev,
            {
              id,
              name: fileName,
              // originalFrames: frameCount,
              originalDuration: durationMs,
              in: 0, 
              out: durationMs,
              offset: maxOutValue,
              previews: []
            }
          ]
        })
    
        setLoading(false)

        // Generate thumbnails
        const thumbnails = await generateVideoThumbnails(
          file,
          90,
          [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
          true
        )
        const sortedThumbnails = thumbnails.sort((a, b) => a.timestamp - b.timestamp)
        const sortedUrls = sortedThumbnails.map(thumb => thumb.image)
    
        // Update the 'previews' field in the trackData with the sortedUrls
        // @ts-ignore
        setTrackData(prev => {
          return prev.map(track => {
            if (track.id === id) {
              return {
                ...track,
                previews: sortedUrls
              }
            }
            return track
          })
        })

      }
    }
  }

   const [loading, setLoading] = useState(false)

  return (<T.Timeline>
     {
        trackData.length > 0 || loading
          ? <>
              <T.Top>
                <Gap>
                  <Box width={8}>
                    <NumberSlider
                      value={scale}
                      onChange={val => setScale(val)}
                      precise
                      min={1}
                      max={100}
                    />
                  </Box>
                  <Button
                    icon='undo'
                    iconPrefix='fas'
                    minimal
                    compact
                    onClick={undo}
                  />
                  <Button
                    icon='redo'
                    iconPrefix='fas'
                    minimal
                    compact
                    onClick={redo}
                  />
                  <Button
                    icon='magnet'
                    iconPrefix='fas'
                    minimal
                    compact
                    onClick={toggleSnap}
                  />
                  <Button
                    icon={'fast-backward'}
                    iconPrefix='fas'
                    minimal
                    compact
                    onClick={skipBack}
                  />
                  <Button
                    icon={isPlaying ? 'pause' : 'play'}
                    iconPrefix='fas'
                    minimal
                    compact
                    onClick={handlePlayPause}
                  />
                  <Button
                    icon={'fast-forward'}
                    iconPrefix='fas'
                    minimal
                    compact
                    onClick={skipForward}
                  />
                  {
                    playheadTime
                  }
                 
                </Gap>
              </T.Top>
              <T.TimelineContent>
                <T.Playhead position={playheadPosition} />
                <TimeRuler totalDuration={totalDuration} />
                <T.Layers>
                  <Layer 
                    trackData={trackData} 
                    totalDuration={totalDuration}
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
            </T.TimelineContent> 
            <FileUpload
                    onFileChange={async (files) => {
                      handleUpload(files)
                    }}                
                    accept='video/mp4'
                    minimal
                    buttonProps={{
                      icon: 'plus',
                      iconPrefix: 'fas',
                      text:'Add media'
                    }}
                  />
            </>
          : <FileUpload
              onFileChange={async (files) => {
                handleUpload(files)
              }}                
              accept='video/mp4'
              icon='clapperboard'
              dragMessage='Drag and drop a video'
              browseMessage='Choose a video'
              iconPrefix='fas'
            />
      }
    
  </T.Timeline>)
}

interface TPlayheadProps {
  position: number
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
  TimelineContent: styled.div`
    width: 100%;
    position: relative;
  `,
  Playhead: styled.div<TPlayheadProps>`
    width: 3px;
    height: 100%;
    background: var(--F_Primary);
    position: absolute;
    left: ${props => `${props.position}%`};
    top: 0;
    z-index: 2;
  `,
  Layers: styled.div`
    width: 100%;  
    background: var(--F_Surface_0);
    display: flex;
    flex-wrap: wrap;
    gap: .125rem;
    padding: .25rem 0;
  `
}

interface TimeRulerProps {
  totalDuration: number
}

const millisecondsToTime = (milliseconds: number) => {
  const totalSeconds = milliseconds / 1000
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
  const seconds = Math.floor(totalSeconds - (hours * 3600) - (minutes * 60))

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export const TimeRuler: React.FC<TimeRulerProps> = ({ totalDuration }) => {
  return (
    <Tr.TimeRuler>
      {Array.from({ length: 7 }, (_, i) => i * 15).map(percentage => {
        const duration = Math.floor((percentage / 100) * totalDuration)
        const time = millisecondsToTime(duration)
        return (
          <Tr.TimeMark key={time} style={{ left: `${percentage}%` }}>
            <Tr.Line />
            <Tr.TimeLabel>{time}</Tr.TimeLabel>
          </Tr.TimeMark>
        )
      })}
    </Tr.TimeRuler>
  )
}

const Tr = {
  TimeRuler: styled.div`
    position: relative;
    width: 100%;
    height: calc(var(--F_Input_Height) / 2);
    background: var(--F_Surface_0);
    background-image: repeating-linear-gradient(
      to right,
      var(--F_Surface),
      var(--F_Surface) 1px,
      transparent 1px,
      transparent calc(100% / 200)
    );
  `,
  TimeMark: styled.div`
    position: absolute;
    bottom: 0;
    height: 100%;
  `,
  Line: styled.div`
    position: absolute;
    width: 1px;
    height: var(--F_Input_Height);
    background-color: var(--F_Font_Color_Label);
  `,
  TimeLabel: styled.div`
    position: absolute;
    bottom: .125rem;
    padding-left: .25rem;
    color: var(--F_Font_Color_Label);
  `
}
