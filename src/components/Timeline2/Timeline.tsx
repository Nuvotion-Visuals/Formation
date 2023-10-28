import { 
  Box, 
  Button, 
  FileUpload, 
  Gap, 
  NumberSlider, 
  generateThumbnail, 
  generateVideoThumbnails, 
  generateUUID, 
  AspectRatio, 
  FileDrop, 
  Spacer, 
  TextInput, 
  Grid, 
  DragOrigin,
  DropTarget
} from '../../internal'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getVideoInfo } from './getVideoInfo'
import { VideoPreview } from './VideoPreview'

interface TrackData {
  id: string,
  name: string,
  originalDuration: number,
  offset: number,
  in: number,
  out: number,
  previews: string[],
  videoElement: HTMLVideoElement,
  videoUrl: string
}

// -----> TRACK <------
interface TrackProps {
  width: number,
  offset: number,
  trackData: TrackData,
  onTrackChange: (newTrackData: TrackData) => void,
  onClick: (id: string) => void,
  selected?: boolean
}

interface MouseEventReact extends React.MouseEvent {
  clientX: number,
}

interface InitialValue {
  in: number,
  out: number,
  offset: number
}

export const Track = ({
  trackData,
  width,
  offset,
  onTrackChange,
  onClick,
  selected
}: TrackProps) => {
  const [isDragging, setIsDragging] = useState<'in' | 'out' | 'offset' | null>(null)
  const [initialMouseX, setInitialMouseX] = useState<number | null>(null)
  const [initialValue, setInitialValue] = useState<InitialValue>({ in: 0, out: 0, offset: 0 })
  const trackRef = useRef<HTMLDivElement>(null)

  const onMouseDown = (event: MouseEventReact, which: 'in' | 'out' | 'offset') => {
    setIsDragging(which)
    onClick(trackData.id)
    setInitialMouseX(event.clientX)
    setInitialValue({ in: trackData.in, out: trackData.out, offset: trackData.offset })
  }

  const onMouseUp = () => {
    setIsDragging(null)
  }

  const onMouseMove = (event: MouseEventReact) => {
    if (isDragging && trackRef.current) {
      const actualWidth = trackRef.current.clientWidth
      const totalWidth = trackData.out - trackData.in
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

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('mousemove', onMouseMove as any)
    }

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove as any)
    }
  }, [isDragging, initialMouseX, initialValue, trackData])

  return (
    <Tk.Track 
      ref={trackRef}
      style={{ width: `${width}%`, left: `${offset}%`, top: '0' }}
      isDragging={!!isDragging || !!selected}
      onClick={() => onClick(trackData.id)}
    >
      <Tk.DragHandle onMouseDown={(e: MouseEventReact) => onMouseDown(e, 'in')} />
      <Tk.DragHandleInner onMouseDown={(e: MouseEventReact) => onMouseDown(e, 'offset')}>
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
    height: 100%;
    box-shadow: var(--F_Outline);
    box-shadow: ${props => props.isDragging ? 'inset 0 0 0 2px var(--F_Primary_Variant)' : 'inset 0 0 0 2px var(--F_Surface_2)'};
    z-index: ${props => props.isDragging ? '1' : '0'};
    background: var(--F_Surface);
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
    }
    &:last-child {
      right: 0;
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

// -----> LAYER <------
interface LayerProps {
  scale: number,
  trackData: TrackData[],
  totalDuration: number,
  onTrackChange: (newTrackData: TrackData) => void,
  onClick: (id: string) => void,
  selectedTrack?: string
}

export const Layer = ({ 
  scale, 
  trackData, 
  onTrackChange, 
  totalDuration,
  onClick,
  selectedTrack
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
            onClick={onClick}
            selected={track.id === selectedTrack}
          />
        )
      }
    </L.Layer>
  )
}

const L = {
  Layer: styled.div`
    width: 100%;
    height: 50px;
    margin: .5rem 0;
    background: var(--F_Surface_0);
    overflow-x: auto;
    display: flex;
    position: relative;
  `
}


interface PlayheadProps {
  
}

export const Playhead = React.memo(({ }: PlayheadProps) => {
  return (<Ph.PlayheadContainer>
    <Ph.PlayheadTop />
    <Ph.Line />
  </Ph.PlayheadContainer>)
})

const Ph = {
  PlayheadContainer: styled.div`
    margin-left: -1px;
    width: 3px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
  `,
  PlayheadTop: styled.div`
    width: 3px;
    height: 3px;
    border-left: .5rem solid transparent;
    border-right: .5rem solid transparent;
    
    border-top: 10px solid var(--F_Primary_Variant);
  `,
  Line: styled.div`
    position: absolute;
    top: 0;
    width: 3px;
    height: 100%;
    background: var(--F_Primary_Variant);
  `
}

// -----> TIMELINE <------
interface TimelineProps {
  
}

interface TrackData {
  id: string,
  name: string,
  originalDuration: number,
  offset: number,
  in: number,
  out: number,
  previews: string[],
  videoElement: HTMLVideoElement
}


export const Timeline = ({ }: TimelineProps) => {
  const [originalTotalDuration, setOriginalTotalDuration] = useState(20000)
  const [totalDuration, setTotalDuration] = useState(originalTotalDuration)
  const [scale, setScale] = useState(50)

  const [selectedTrack, setSelectedTrack] = useState('')

  useEffect(() => {
    setTotalDuration(originalTotalDuration * (scale / 50))
  }, [scale, originalTotalDuration])

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

  const [maxOutValue, setMaxOutValue] = useState(0)

  useEffect(() => {
    if (pointer === history.length - 1 || pointer === -1) {
      debounceUpdateHistory(trackData)
    }
    if (trackData.length) {
      setMaxOutValue(trackData.reduce((max, track) => {
        const trackDuration = track.out - track.in // Actual "rendered" duration of the track
        return Math.max(max, track.offset + trackDuration)
      }, 0))
    }
    console.log(trackData)
  }, [trackData])

  const [playheadPosition, setPlayheadPosition] = useState<number>(0)
  const [playheadTime, setPlayheadTime] = useState<string>('00:00:00')
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
    videoStarted.current = false
    if (!isPlaying) {
      lastFrameTime.current = Date.now() - (playheadPosition / 100) * totalDuration
    }
  }

  const videoStarted = useRef(false)
  const trackPlaying = useRef('')
  const lastActiveVideoElement = useRef<HTMLVideoElement | null>(null)

  const startDrawing = (videoElement: HTMLVideoElement, startTime: number, endTime: number) => {
    lastActiveVideoElement.current = videoElement

    videoStarted.current = true
    trackPlaying.current = videoElement.id
    videoElement.currentTime = startTime / 1000
    videoElement.play()
  
    const onFrame = async (now: DOMHighResTimeStamp, metadata: any) => {
      if (videoElement.currentTime >= endTime / 1000) {
        videoStarted.current = false
      }
    
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          
          const videoWidth = videoElement.videoWidth
          const videoHeight = videoElement.videoHeight
          const videoAspectRatio = videoWidth / videoHeight
    
          const canvasWidth = canvasRef.current.width
          const canvasHeight = canvasRef.current.height
          const canvasAspectRatio = canvasWidth / canvasHeight
    
          let drawWidth, drawHeight, offsetX, offsetY
    
          if (canvasAspectRatio > videoAspectRatio) {
            drawHeight = canvasHeight
            drawWidth = canvasHeight * videoAspectRatio
            offsetX = (canvasWidth - drawWidth) / 2
            offsetY = 0
          }
          else {
            drawWidth = canvasWidth
            drawHeight = canvasWidth / videoAspectRatio
            offsetX = 0
            offsetY = (canvasHeight - drawHeight) / 2
          }
    
          ctx.drawImage(videoElement, offsetX, offsetY, drawWidth, drawHeight)
        }
      }
    
      if (videoStarted.current) {
        videoElement.requestVideoFrameCallback(onFrame)
      }
    }

    videoElement.requestVideoFrameCallback(onFrame)
  }

  const movePlayhead = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - lastFrameTime.current
    const elapsedPercentage = (elapsed / totalDuration) * 100
  
    // Determine the active track based on playhead position
    const activeTrack = trackData.find(track => {
      const trackDuration = track.out - track.in
      const trackStart = track.offset
      const trackEnd = track.offset + trackDuration
  
      const trackStartPercentage = (trackStart / totalDuration) * 100
      const trackEndPercentage = (trackEnd / totalDuration) * 100
  
      return elapsedPercentage >= trackStartPercentage && elapsedPercentage <= trackEndPercentage
    })
  
    if (activeTrack) {
      // Calculate the time to playback of the active track
      if (!videoStarted.current) {
        startDrawing(activeTrack.videoElement, activeTrack.in, activeTrack.out)
      }
      if (trackPlaying.current !== activeTrack.id) {
        lastActiveVideoElement.current?.pause()
        startDrawing(activeTrack.videoElement, activeTrack.in, activeTrack.out)
      }
    }
    else {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          ctx.fillStyle = 'black'
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      }
    }
    
    if (elapsed >= maxOutValue) {
      setIsPlaying(false)
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
    } 
    else {
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

  const skipForward = async () => {
    const nextOffsets = trackData.map(track => (track.offset / totalDuration) * 100).filter(offset => offset > playheadPosition)
    if (nextOffsets.length === 0) return
  
    const closestNextOffset = Math.min(...nextOffsets)
    setPlayheadPosition(closestNextOffset)
    videoStarted.current = false

  
    const newTime = (closestNextOffset / 100) * totalDuration
    setPlayheadTime(formatTime(newTime))
  
    lastFrameTime.current = Date.now() - newTime
  }
  
  const skipBack = async () => {
    const prevOffsets = trackData.map(track => (track.offset / totalDuration) * 100).filter(offset => offset < playheadPosition)
    if (prevOffsets.length === 0) return
  
    const closestPrevOffset = Math.max(...prevOffsets)
    setPlayheadPosition(closestPrevOffset)
  
    const newTime = (closestPrevOffset / 100) * totalDuration
    setPlayheadTime(formatTime(newTime))
    videoStarted.current = false
  
    lastFrameTime.current = Date.now() - newTime
  }

  const [snap, setSnap] = useState(false)
  const toggleSnap = () => setSnap(!snap)

  const handleUpload = async (files: File[]) => {
    if (files) {
      files.forEach(async (file) => {
        setLoading(true)
        const {
          fileName,
          dimensions,
          fileSize,
          duration,
          videoElement,
          videoUrl
        } = await getVideoInfo(file)

        const durationMs = duration * 1000
        const id = generateUUID()
        videoElement.id = id
        document.body.appendChild(videoElement)
        videoElement.style.display = 'none'

        // @ts-ignore
        setTrackData(prev => {
          return [
            ...prev,
            {
              id,
              name: fileName,
              originalDuration: durationMs,
              in: 0, 
              out: durationMs,
              offset: maxOutValue,
              previews: [],
              videoElement,
              videoUrl
            }
          ]
        })

        setLoading(false)

        const thumbnails = await generateVideoThumbnails(
          file,
          90,
          [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          true
        )
        const sortedThumbnails = thumbnails.sort((a, b) => a.timestamp - b.timestamp)
        const sortedUrls = sortedThumbnails.map(thumb => thumb.image)
    
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
      })
    }
  }

   const [loading, setLoading] = useState(false)

   const canvasRef = useRef<HTMLCanvasElement>(null)

   useEffect(() => {
    if (!isPlaying) {
      trackData.forEach((track) => {
        track.videoElement.pause()
      })
    }
   }, [isPlaying])

   const [projectName, setProjectName] = useState('')

  return (<T.Timeline>
     {
        trackData.length > 0 || loading
          ? <>
              <T.Taskbar>    
                <Spacer />
                <Gap autoWidth>
                  <Box width={10}>
                    <TextInput
                      value={projectName}
                      onChange={val => setProjectName(val)}
                      compact
                      placeholder='Untitled project'
                      secondaryIcon='edit'
                    />
                  </Box>
                  <Button
                    compact
                    text='Export Project'
                    icon='arrow-up-from-bracket'
                    iconPrefix='fas'
                  />
                </Gap>
              </T.Taskbar>
              <T.Top>
                <T.Left>
                  <FileDrop onFileDrop={files => handleUpload(files)}>

                  <Box px={.5} width='calc(100% - 1rem)'>
                    <FileUpload
                      onFileChange={async (files) => {
                        handleUpload(files)
                      }}                
                      accept='video/mp4'
                      icon='photo-video'
                      dragMessage='Drag and drop media'
                      browseMessage='Add media'
                      iconPrefix='fas'
                      multiple
                    />
                  </Box>
               
                    <Box px={.5} mt={.5} width='calc(100% - 1rem)'>
                      <Grid maxWidth={6} gap={.25}>
                        {
                          trackData.map(track =>
                            <DragOrigin data={{origin: 'media', track}}>
                              <VideoPreview
                                text={`${track.name.slice(0, 10)}...`}
                                imageUrl={track.previews[0]}
                                videoUrl={track.videoUrl}
                                onClick={() => {}}
                                active={false}
                              />
                            </DragOrigin>
                          )
                        }
                      </Grid>
                    </Box>
                  </FileDrop>
                </T.Left>
                <T.Canvas ref={canvasRef} width={1920} height={1080} />
              </T.Top>
              <T.Controls>
              <T.Bottom>
                <Gap>
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
                  <Spacer />

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
                    circle
                    onClick={handlePlayPause}
                  />
                  <Button
                    icon={'fast-forward'}
                    iconPrefix='fas'
                    minimal
                    compact
                    onClick={skipForward}
                  />

                  <T.CurrentTime>{ playheadTime }</T.CurrentTime> ∕ <T.TotalTime>{ formatTime(maxOutValue) }</T.TotalTime>
                 
                  <Spacer />
                  
                  <Button
                    icon='magnet'
                    iconPrefix='fas'
                    minimal
                    compact
                    onClick={toggleSnap}
                  />
                  <Box width={8}>
                    <NumberSlider
                      value={scale}
                      onChange={val => setScale(val)}
                      precise
                      min={1}
                      max={100}
                      hideNumberInput
                    />
                  </Box>
                </Gap>
              </T.Bottom>
              <T.TimelineContent>
                <FileDrop onFileDrop={handleUpload}>
                  <T.PlayheadPositon  position={playheadPosition}>
                    <Playhead />
                  </T.PlayheadPositon>
                  <TimeRuler totalDuration={totalDuration} />
                  <T.Layers>
                    <DropTarget 
                      acceptedOrigins={['media']} 
                      onDrop={data => {

                        const originalElement = document.getElementById(data.track.id)
                        if (originalElement) {
                          const id = generateUUID()
                          const cloned = originalElement.cloneNode() as HTMLElement
                          cloned.id = id
                          document.body.appendChild(cloned)
                          setTrackData(prev => {
                            return [
                              ...prev,
                              {
                                ...data.track,
                                id,
                                in: 0, 
                                offset: maxOutValue,
                                videoElement: cloned
                              }
                            ]
                          })
                        }
                      }}
                    >
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
                        selectedTrack={selectedTrack}
                        onClick={(newSelectedTrack) => setSelectedTrack(newSelectedTrack)}
                      />
                    </DropTarget>
                  </T.Layers>
                </FileDrop>
            </T.TimelineContent> 
            </T.Controls>
            </>
          : <FileUpload
              onFileChange={async (files) => {
                handleUpload(files)
              }}                
              accept='video/mp4'
              icon='photo-video'
              dragMessage='Drag and drop media'
              browseMessage='Add media'
              iconPrefix='fas'
              multiple
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
    height: 100%;
    user-select: none;
  `,
  Taskbar: styled.div`
    width: calc(100% - 1rem);
    padding: 0 .5rem;
    display: flex;
    align-items: center;
    height: var(--F_Input_Height);
  `,
  Top: styled.div`
    display: flex;
    width: 100%;
    height: calc(calc(calc(100% - 8rem) - var(--F_Input_Height)) - 1px);
    background: var(--F_Background);
  `,
  Left: styled.div`
    width: 30rem;
    height: 100%;
    border-right:  1px solid var(--F_Surface);
  `,
  Controls: styled.div`
    width: 100%;
    height: 6.5rem;
    background: var(--F_Background);
  `,
  Canvas: styled.canvas`
    width: 100%;
    max-height: 100%;
    background: black;
  `,
  Bottom: styled.div`
    width: calc(100% - 2rem);
    padding: .25rem 1rem;
    height: var(--F_Input_Height);
    border-top: 1px solid var(--F_Surface);
    display: flex;
    align-items: center;
  `,
  CurrentTime: styled.div`
    width: 56px;
    text-align: center;
    font-size: var(--F_Font_Size_Label);
    font-weight: 600;
    margin-left: .5rem;
  `,
  TotalTime: styled.div`
    width: 55px;
    text-align: center;
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color_Disabled);
  `,
  TimelineContent: styled.div`
    width: 100%;
    position: relative;
  `,
  PlayheadPositon: styled.div<TPlayheadProps>`
    height: 100%;
    position: absolute;
    left: ${props => `${props.position}%`};
    top: 0;
    z-index: 2;
  `,
  Layers: styled.div`
    width: 100%;  
    display: flex;
    flex-wrap: wrap;
    gap: .125rem;
  `
}

// -----> TIME RULER <------
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
    background-image: repeating-linear-gradient(
      to right,
      var(--F_Surface_0),
      var(--F_Surface_0) 1px,
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
    width: 2px;
    height: var(--F_Input_Height);
    background-color: var(--F_Surface_1);
  `,
  TimeLabel: styled.div`
    position: absolute;
    bottom: 0;
    padding-left: .25rem;
    color: var(--F_Font_Color_Label);
    font-size: var(--F_Font_Size_Label);
  `
}
