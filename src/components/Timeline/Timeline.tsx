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
  DropTarget,
  Icon,
  Item,
  Dropdown
} from '../../internal'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getImageInfo, getVideoInfo } from './getMediaInfo'
import { VideoPreview } from './VideoPreview'
import { ZoomSlider } from '../Sliders/ZoomSlider'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface ClipData {
  id: string,
  name: string,
  originalDuration: number,
  offset: number,
  in: number,
  out: number,
  previews: string[],
  dimensions: { width: number, height: number },
  element: HTMLVideoElement | HTMLImageElement,
  url: string,
  type: 'image' | 'video'
}

// -----> CLIP <------
interface ClipProps {
  width: number,
  offset: number,
  clipData: ClipData,
  onClipChange: (newClipData: ClipData, type: 'in' | 'out' | 'offset') => void,
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

export const Clip = ({
  clipData,
  width,
  offset,
  onClipChange,
  onClick,
  selected
}: ClipProps) => {
  const [isDragging, setIsDragging] = useState<'in' | 'out' | 'offset' | null>(null)
  const [initialCoordinate, setInitialCoordinate] = useState<number | null>(null)
  const [initialValue, setInitialValue] = useState<InitialValue>({ in: 0, out: 0, offset: 0 })
  const clipRef = useRef<HTMLDivElement>(null)

  const handleStart = (coordinate: number, which: 'in' | 'out' | 'offset') => {
    setIsDragging(which)
    onClick(clipData.id)
    setInitialCoordinate(coordinate)
    setInitialValue({ in: clipData.in, out: clipData.out, offset: clipData.offset })
  }

  const handleEnd = () => {
    setIsDragging(null)
  }

  const handleMove = (coordinate: number) => {
    if (isDragging && clipRef.current) {
      const actualWidth = clipRef.current.clientWidth
      const totalWidth = clipData.out - clipData.in
      const scale = actualWidth / totalWidth
  
      let delta = (coordinate - (initialCoordinate || 0)) / scale
      delta = Math.round(delta)
  
      let updatedClip = { ...clipData }
  
      switch (isDragging) {
        case 'in':
          updatedClip.in = clipData.type === 'image'
            ? initialValue.in + delta
            : Math.min(Math.max(0, initialValue.in + delta), updatedClip.out)
          updatedClip.offset = Math.max(0, initialValue.offset + delta)
          break
        case 'out':
          updatedClip.out = clipData.type === 'image'
            ? initialValue.out + delta
            : Math.max(Math.min(initialValue.out + delta, clipData.originalDuration), updatedClip.in)
          break
        case 'offset':
          updatedClip.offset = Math.max(0, initialValue.offset + delta)
          break
      }
  
      onClipChange(updatedClip, isDragging)
    }
  }

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => handleMove(e.clientX)
    const touchMoveHandler = (e: TouchEvent) => {
      e.preventDefault()
      handleMove(e.touches[0].clientX)
    }

    if (isDragging) {
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('touchend', handleEnd)
      document.addEventListener('touchmove', touchMoveHandler)
    }

    return () => {
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('touchend', handleEnd)
      document.removeEventListener('touchmove', touchMoveHandler)
    }
  }, [isDragging, initialCoordinate, initialValue, clipData])
  return (
    <Tk.Clip 
      ref={clipRef}
      style={{ width: `${width}%`, left: `${offset}%`, top: '0' }}
      isDragging={!!isDragging || !!selected}
      onClick={() => onClick(clipData.id)}
      background={clipData.type === 'image' ? clipData.url : undefined}
    >
      <Tk.DragHandle 
        onMouseDown={(e: MouseEventReact) => handleStart(e.clientX, 'in')} 
        onTouchStart={(e: React.TouchEvent) => {
          e.preventDefault()
          handleStart(e.touches[0].clientX, 'in')
        }}
      />
      <Tk.DragHandleInner 
        onMouseDown={(e: MouseEventReact) => handleStart(e.clientX, 'offset')}
        onTouchStart={(e: React.TouchEvent) => {
          e.preventDefault()
          handleStart(e.touches[0].clientX, 'offset')
        }}
      >
        {
          clipData.previews.map(preview =>
            <img src={preview} style={{height: '100%'}} draggable="false" />
          )
        }
      </Tk.DragHandleInner>
      <Tk.DragHandle 
        onMouseDown={(e: MouseEventReact) => handleStart(e.clientX, 'out')}
        onTouchStart={(e: React.TouchEvent) => {
          e.preventDefault()
          handleStart(e.touches[0].clientX, 'out')
        }}
      />
    </Tk.Clip>
  )
}


interface ClipCompProps {
  isDragging: boolean,
  background?: string
}
const Tk = {
  Clip: styled.div<ClipCompProps>`
    height: 100%;
    box-shadow: var(--F_Outline);
    box-shadow: ${props => props.isDragging ? 'inset 0 0 0 2px var(--F_Primary_Variant)' : 'inset 0 0 0 2px var(--F_Surface_2)'};
    z-index: ${props => props.isDragging ? '1' : '0'};
    background: var(--F_Surface);
    background-image: ${props => props.background ? `url(${props.background})` : 'none'};
    background-repeat: ${props => props.background ? 'repeat-x' : 'none'};
    background-size: ${props => props.background ? 'auto 100%' : 'none'};
    overflow: hidden;
    border-radius: .25rem;
    display: flex;
    align-items: center;
    position: absolute;
    cursor: grab;
    touch-action: none;
    * {
    touch-action: none;
    }
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

// -----> TRACK <------
interface TrackProps {
  scale: number,
  clipData: ClipData[],
  totalDuration: number,
  onClipChange: (newClipData: ClipData, type: 'in' | 'out' | 'offset') => void,
  onClick: (id: string) => void,
  selectedClip?: string
}

export const Track = ({ 
  scale, 
  clipData, 
  onClipChange, 
  totalDuration,
  onClick,
  selectedClip
}: TrackProps) => {
  return (
    <L.Track>
      {
        clipData.map(clip =>
          <Clip 
            width={((clip.out - clip.in) / totalDuration) * 100} 
            offset={(clip.offset / totalDuration) * 100}
            clipData={clip} 
            onClipChange={onClipChange}
            onClick={onClick}
            selected={clip.id === selectedClip}
          />
        )
      }
    </L.Track>
  )
}

const L = {
  Track: styled.div`
    width: 100%;
    height: 50px;
    margin: .5rem 0;
    background: var(--F_Surface_0);
    overflow-x: auto;
    display: flex;
    position: relative;
  `
}


interface SidebarProps {
  value: string
  onChange: (val: string) => void
}

export const Sidebar = ({ value, onChange }: SidebarProps) => {
  const tabs = [
    {
      icon: 'photo-video',
      label: 'Media'
    },
    {
      icon: 'clapperboard',
      label: 'Clip'
    },
    {
      icon: 'cog',
      label: 'Settings'
    }
  ]

  const handleTabClick = (tabLabel: string) => {
    onChange(tabLabel)
  }

  return (
    <Sb.Sidebar>
      {tabs.map((tab, index) => (
        <Sb.Tab 
          key={index}
          active={value === tab.label}
          onClick={() => handleTabClick(tab.label)}
        >
          <Sb.Center>
            <Icon
              icon={tab.icon as IconProp}
              size={'lg'}
            />
            <Sb.Label>{tab.label}</Sb.Label>
          </Sb.Center>
        </Sb.Tab>
      ))}
      <Sb.VSpacer />
    </Sb.Sidebar>
  )
}

interface TabProps {
  active: boolean
}

const Sb = {
  Sidebar: styled.div`
    width: 4rem;
    padding: .25rem;
    padding-top: 0;
    height: calc(100% - .25rem);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-right: 1px solid var(--F_Surface);
    gap: .25rem;
  `,
  Tab: styled.div<TabProps>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    background: var(--F_Surface);
    background: ${props => props.active ? 'var(--F_Surface)' : 'none'};
    border-radius: var(--F_Tile_Radius);
    cursor: pointer;
    * {
      color: var(--F_Font_Color);
    }
  `,
  Center: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: .3125rem;
    align-items: center;
    justify-content: center;
  `,  
  Label: styled.div`
    width: 100%;
    text-align: center;
    font-size: var(--F_Font_Size_Small);
  `,
  VSpacer: styled.div`
    width: 1px;
    height: 100%;
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
    margin-left: -7px;
    width: 1rem;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    cursor: ew-resize;
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

interface ClipData {
  id: string,
  name: string,
  originalDuration: number,
  offset: number,
  in: number,
  out: number,
  previews: string[],
  element: HTMLVideoElement | HTMLImageElement
}


export const Timeline = ({ }: TimelineProps) => {
  const [originalTotalDuration, setOriginalTotalDuration] = useState(20000)
  const [totalDuration, setTotalDuration] = useState(originalTotalDuration)
  const [scale, setScale] = useState(50)

  const [selectedClip, setSelectedClip] = useState('')

  useEffect(() => {
    setTotalDuration(originalTotalDuration * (scale / 50))
  }, [scale, originalTotalDuration])

  const [clipData, setClipData] = useState<ClipData[]>([])

  const [tab, setTab] = useState<'Media' | 'Clip' | 'Settings'>('Media')

  const [history, setHistory] = useState([clipData])
  const [pointer, setPointer] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debounceUpdateHistory = (newData: ClipData[]) => {
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
        setClipData(history[newPointer])
        return newPointer
      })
    }
  }

  const redo = () => {
    if (pointer < history.length - 1) {
      setPointer(prev => {
        const newPointer = prev + 1
        setClipData(history[newPointer])
        return newPointer
      })
    }
  }

  const [maxOutValue, setMaxOutValue] = useState(0)

  useEffect(() => {
    if (pointer === history.length - 1 || pointer === -1) {
      debounceUpdateHistory(clipData)
    }
    if (clipData.length) {
      setMaxOutValue(clipData.reduce((max, clip) => {
        const clipDuration = clip.out - clip.in // Actual "rendered" duration of the clip
        return Math.max(max, clip.offset + clipDuration)
      }, 0))
    }
  }, [clipData])

  const [playheadPosition, setPlayheadPosition] = useState<number>(0)
  const [playheadTime, setPlayheadTime] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [loop, setLoop] = useState(false)
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
      const currentPlayheadTime = (playheadPosition / 100) * totalDuration
      if (Math.abs(maxOutValue - currentPlayheadTime) <= 100) {
        lastFrameTime.current = Date.now()
      } else {
        lastFrameTime.current = Date.now() - currentPlayheadTime
      }
    }
  }

  const videoStarted = useRef(false)
  const clipPlaying = useRef('')
  const lastActiveVideoElement = useRef<HTMLVideoElement | null>(null)

  const startDrawing = (element: HTMLVideoElement, startTime: number, endTime: number) => {
    lastActiveVideoElement.current = element

    videoStarted.current = true
    clipPlaying.current = element.id
    element.currentTime = startTime / 1000
    element.play()
  
    const onFrame = async (now: DOMHighResTimeStamp, metadata: any) => {
      if (element.currentTime >= endTime / 1000) {
        videoStarted.current = false
      }
    
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          
          const videoWidth = element.videoWidth
          const videoHeight = element.videoHeight
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
    
          ctx.drawImage(element, offsetX, offsetY, drawWidth, drawHeight)
        }
      }
    
      if (videoStarted.current) {
        element.requestVideoFrameCallback(onFrame)
      }
    }

    element.requestVideoFrameCallback(onFrame)
  }

  const drawImage = async (imageElement: HTMLImageElement) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  
        const imageWidth = imageElement.width
        const imageHeight = imageElement.height
        const imageAspectRatio = imageWidth / imageHeight
  
        const canvasWidth = canvasRef.current.width
        const canvasHeight = canvasRef.current.height
        const canvasAspectRatio = canvasWidth / canvasHeight
  
        let drawWidth, drawHeight, offsetX, offsetY
  
        if (canvasAspectRatio > imageAspectRatio) {
          drawHeight = canvasHeight
          drawWidth = canvasHeight * imageAspectRatio
          offsetX = (canvasWidth - drawWidth) / 2
          offsetY = 0
        }
        else {
          drawWidth = canvasWidth
          drawHeight = canvasWidth / imageAspectRatio
          offsetX = 0
          offsetY = (canvasHeight - drawHeight) / 2
        }
  
        ctx.drawImage(imageElement, offsetX, offsetY, drawWidth, drawHeight)
      }
    }
  }

  const movePlayhead = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - lastFrameTime.current
    const elapsedPercentage = (elapsed / totalDuration) * 100
  
    // Determine the active clip based on playhead position
    const activeClip = clipData.find(clip => {
      const clipDuration = clip.out - clip.in
      const clipStart = clip.offset
      const clipEnd = clip.offset + clipDuration
  
      const clipStartPercentage = (clipStart / totalDuration) * 100
      const clipEndPercentage = (clipEnd / totalDuration) * 100
  
      return elapsedPercentage >= clipStartPercentage && elapsedPercentage <= clipEndPercentage
    })
  
    if (activeClip) {
      // Calculate the time to playback of the active clip
      if (activeClip.type == 'image') {
        // @ts-ignore
        drawImage(activeClip.element)
        lastActiveVideoElement.current?.pause()
      }
      else {
        if (!videoStarted.current) {
          startDrawing(activeClip.element as HTMLVideoElement, activeClip.in, activeClip.out)
        }
        if (clipPlaying.current !== activeClip.id) {
          lastActiveVideoElement.current?.pause()
          startDrawing(activeClip.element as HTMLVideoElement, activeClip.in, activeClip.out)
        }
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
      if (loop) {
        lastFrameTime.current = currentTime
      }
      else {
        setIsPlaying(false)
        if (animationFrameId.current !== null) {
          cancelAnimationFrame(animationFrameId.current)
        }
        return
      }
    }
  
    if (elapsedPercentage >= 0 && elapsedPercentage <= 100) {
      setPlayheadPosition(elapsedPercentage)
      setPlayheadTime(elapsed)
    } 
    else if (elapsedPercentage > 100) {
      setPlayheadPosition(100)
      setPlayheadTime(totalDuration)
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
    const nextOffsets = clipData.map(clip => (clip.offset / totalDuration) * 100).filter(offset => offset > playheadPosition)
    if (nextOffsets.length === 0) return
  
    const closestNextOffset = Math.min(...nextOffsets)
    setPlayheadPosition(closestNextOffset)
    videoStarted.current = false

  
    const newTime = (closestNextOffset / 100) * totalDuration
    setPlayheadTime(newTime)
  
    lastFrameTime.current = Date.now() - newTime
  }
  
  const skipBack = async () => {
    const prevOffsets = clipData.map(clip => (clip.offset / totalDuration) * 100).filter(offset => offset < playheadPosition)
    
    let closestPrevOffset = 0
    if (prevOffsets.length > 0) {
      closestPrevOffset = Math.max(...prevOffsets)
    }
    
    setPlayheadPosition(closestPrevOffset)
    
    const newTime = (closestPrevOffset / 100) * totalDuration
    setPlayheadTime(newTime)
    videoStarted.current = false
    
    lastFrameTime.current = Date.now() - newTime
  }

  const [snap, setSnap] = useState(true)
  const [snapRange, setSnapRange] = useState(250)
  const toggleSnap = () => setSnap(!snap)

  const [ripple, setRipple] = useState(false)
  const toggleRipple = () => setRipple(!ripple)

  const handleUpload = async (files: File[]) => {
    if (files) {
      setLoading(true)
      let accumulatedMaxOutValue = 0
      let newClipData = [...clipData]
  
      for (const file of files) {
        const mimeType = file.type
        const id = generateUUID()
  
        // Use the locally calculated accumulatedMaxOutValue
        accumulatedMaxOutValue = newClipData.reduce((max, clip) => {
          const clipDuration = clip.out - clip.in
          return Math.max(max, clip.offset + clipDuration)
        }, 0)
  
        const offset = accumulatedMaxOutValue
  
        if (mimeType.startsWith('video')) {
          const {
            fileName,
            duration,
            element,
            dimensions,
            url
          } = await getVideoInfo(file)
  
          const durationMs = duration * 1000
          element.id = id
          document.body.appendChild(element)
          element.style.display = 'none'
  
          newClipData.push({
            id,
            type: 'video',
            name: fileName,
            originalDuration: durationMs,
            in: 0,
            dimensions,
            out: durationMs,
            offset,
            previews: [],
            element,
            url
          })
  
          // Run this part asynchronously
          generateVideoThumbnails(
            file,
            90,
            [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            true
          ).then(thumbnails => {
            const sortedThumbnails = thumbnails.sort((a, b) => a.timestamp - b.timestamp)
            const sortedUrls = sortedThumbnails.map(thumb => thumb.image) as string[]
  
            setClipData(prev => {
              return prev.map(clip => {
                if (clip.id === id) {
                  return {
                    ...clip,
                    previews: sortedUrls
                  }
                }
                return clip
              })
            })
          })
        }
        else if (mimeType.startsWith('image')) {
          const {
            fileName,
            element,
            url,
            dimensions
          } = await getImageInfo(file)
  
          element.id = id
          document.body.appendChild(element)
          element.style.display = 'none'
  
          newClipData.push({
            id,
            type: 'image',
            name: fileName,
            originalDuration: 1000,
            in: 0,
            out: 1000,
            offset,
            dimensions,
            previews: [url],
            element,
            url
          })
        }
      }
  
      // Update state with newClipData after loop finishes
      setClipData(newClipData)
      setLoading(false)
    }
  }

   const [loading, setLoading] = useState(false)

   const canvasRef = useRef<HTMLCanvasElement>(null)

   useEffect(() => {
    if (!isPlaying) {
      clipData.forEach((clip) => {
        if (clip.type === 'video') {
          (clip.element as HTMLVideoElement).pause()
        }
      })
    }
   }, [isPlaying])

   const [projectName, setProjectName] = useState('')
   const [mediaZoom, setMediaZoom] = useState(6)
   const [mediaMode, setMediaMode] = useState<'grid' | 'list'>('grid')
   const [mediaSearch, setMediaSearch] = useState('')

   const renderMenu = () => {
    switch (tab) {
      case 'Clip':
        return 
      case 'Media': {
        const minimal = clipData.length > 0
        return <>
          <FileDrop onFileDrop={files => handleUpload(files)}>
            <Box px={.5} width='calc(100% - 1rem)'>
              <FileUpload
                onFileChange={async (files) => {
                  handleUpload(files)
                }}                
                accept='video/mp4,video/webm,image/png,image/jpeg,image/bmp,image/avif,image/webp'
                icon='photo-video'
                dragMessage='Drag and drop media'
                browseMessage='Add media'
                iconPrefix='fas'
                multiple
                minimal={minimal}
                buttonProps={
                  minimal
                    ? {
                        expand: true,
                        text: 'Add media',
                        icon: 'photo-video',
                        iconPrefix: 'fas'
                      }
                    : undefined
                }
              />
            </Box>
            <Box px={.5} width='calc(100% - 1rem)' hide={!minimal}>
              <TextInput
                compact
                icon='search'
                value={mediaSearch}
                onChange={val => setMediaSearch(val)}
                hideOutline
                canClear={mediaSearch !== ''}
              />
              <Box minWidth={9}>
              <ZoomSlider
                min={3}
                max={20}
                value={mediaZoom}
                onChange={val => setMediaZoom(val)}
              />
              </Box>
              
              <Button
                minimal
                icon='grip'
                iconPrefix='fas'
                off={mediaMode !== 'grid'}
                onClick={() => setMediaMode('grid')}
              />
               <Button
                minimal
                icon='list'
                iconPrefix='fas'
                off={mediaMode !== 'list'}
                onClick={() => setMediaMode('list')}
              />
            </Box>
            <Box px={.5} width='calc(100% - 1rem)'>
              {
                mediaMode === 'grid'
                  ?  <Grid maxWidth={mediaMode === 'grid' ? mediaZoom : 100} gap={.25}>
                      {
                        clipData.filter(clip => clip.name.toLowerCase().includes(mediaSearch)).map(clip =>
                          <DragOrigin data={{origin: 'media', clip}}>
                            <VideoPreview
                              text={`${clip.name.slice(0, 10)}...`}
                              imageUrl={clip.previews[0]}
                              videoUrl={clip.url}
                              onClick={() => {}}
                              active={false}
                            />
                          </DragOrigin>
                        )
                      }
                    </Grid>
                  : <Gap>
                   {
                      clipData.filter(clip => clip.name.toLowerCase().includes(mediaSearch)).map(clip =>
                        <DragOrigin data={{origin: 'media', clip}}>
                          <Item
                            text={clip.name}
                            subtitle={`${clip.type} - ${clip.dimensions.width}x${clip.dimensions.height}`}
                            src={clip.previews[0]}
                            children={<Dropdown
                              icon='ellipsis-v'
                              iconPrefix='fas'
                              compact
                              minimal
                              items={[
                                {
                                  icon: 'trash-alt',
                                  iconPrefix: 'fas',
                                  text: 'Remove',
                                }
                              ]}
                            />}
                            breakText
                          />
                        </DragOrigin>
                      )
                    }
                  </Gap>
                }
            </Box>
          </FileDrop>
        </>
        }
      case 'Settings':
        return <>

        </>
    }
   }

   const [isPlayheadDragging, setIsPlayheadDragging] = useState(false)
   const [initialPlayheadCoordinate, setInitialPlayheadCoordinate] = useState<number | null>(null)
   const [initialPlayheadPosition, setInitialPlayheadPosition] = useState(0)
   const playheadContainerRef = useRef<HTMLDivElement>(null)
   
   const calculateNewPositions = (coordinate: number, isStart: boolean = false) => {
    if (playheadContainerRef.current) {
      const actualWidth = playheadContainerRef.current.clientWidth
      const scale = 100 / actualWidth
      
      let delta = (coordinate - (initialPlayheadCoordinate || 0)) * scale
      let newPosition = initialPlayheadPosition + delta
      newPosition = Math.min(Math.max(0, newPosition), 100)
      
      // If this is the start of the drag, update the initial coordinate and position
      if (isStart) {
        setInitialPlayheadCoordinate(coordinate)
        setInitialPlayheadPosition(newPosition)
      }
  
      setPlayheadPosition(newPosition)
      const newTime = (totalDuration * newPosition) / 100
      setPlayheadTime(newTime)
    }
  }
  
  const handlePlayheadStart = (coordinate: number) => {
    setIsPlayheadDragging(true)
    calculateNewPositions(coordinate, true)
  }
  
  const handleTimeRulerStart = (coordinate: number) => {
    setIsPlayheadDragging(true)
    calculateNewPositions(coordinate, true)
  }
  
  const handleDragEnd = () => {
    setIsPlayheadDragging(false)
  }
  
  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => calculateNewPositions(e.clientX)
    const touchMoveHandler = (e: TouchEvent) => {
      e.preventDefault()
      calculateNewPositions(e.touches[0].clientX)
    }
  
    if (isPlayheadDragging) {
      document.addEventListener('mouseup', handleDragEnd)
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('touchend', handleDragEnd)
      document.addEventListener('touchmove', touchMoveHandler)
    }
  
    return () => {
      document.removeEventListener('mouseup', handleDragEnd)
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('touchend', handleDragEnd)
      document.removeEventListener('touchmove', touchMoveHandler)
    }
  }, [isPlayheadDragging, initialPlayheadCoordinate, initialPlayheadPosition, playheadContainerRef.current, totalDuration])
  
  return (<T.Timeline>
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
        <Sidebar
          value={tab}
          onChange={val => setTab(val as any)}
        />
        <T.Left>
          {
            renderMenu()
          }
        </T.Left>
        <T.Center>
          <AspectRatio ratio={16/9}>
            <T.Canvas ref={canvasRef} width={1920} height={1080} />
          </AspectRatio>
        </T.Center>
      </T.Top>
      <T.Controls>
        <T.Bottom>
          <Gap>
            <Box>
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
                icon='scissors'
                text='Split'
                iconPrefix='fas'
                minimal
                compact
                onClick={redo}
              />
            </Box>

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
            <Button
              icon={'repeat'}
              iconPrefix='fas'
              minimal
              compact
              off={!loop}
              onClick={() => setLoop(!loop)}
            />

            <T.CurrentTime>{ formatTime(playheadTime) }</T.CurrentTime> ∕ <T.TotalTime>{ formatTime(maxOutValue) }</T.TotalTime>
          
            <Spacer />

            <Gap autoWidth gap={.25}>
              <Box mr={.5}>
                <Gap autoWidth>
                  <Button
                    icon='arrows-left-right-to-line'
                    iconPrefix='fas'
                    minimal
                    compact
                    onClick={toggleRipple}
                    off={!ripple}
                  />
                  <Button
                    icon='magnet'
                    iconPrefix='fas'
                    minimal
                    compact
                    onClick={toggleSnap}
                    off={!snap}
                  />
                </Gap>
              </Box>
            
              <Box width={9}>
                <ZoomSlider
                  value={scale}
                  onChange={val => setScale(val)}
                  min={1}
                  max={100}
                />
              </Box>
              <Button
                text='Fit'
                compact
                minimal
                onClick={() => setTotalDuration(maxOutValue)}
              />
            </Gap>
          </Gap>
        </T.Bottom>
        <T.TimelineContent ref={playheadContainerRef}>
          <FileDrop onFileDrop={handleUpload}>
          <T.PlayheadPosition
            position={playheadPosition}
            onMouseDown={(e: MouseEventReact) => handlePlayheadStart(e.clientX)}
            onTouchStart={(e: React.TouchEvent) => {
              e.preventDefault()
              handlePlayheadStart(e.touches[0].clientX)
            }}
          >
            <Playhead />
          </T.PlayheadPosition>
          <TimeRuler
            totalDuration={totalDuration}
            onMouseDown={(e: React.MouseEvent) => handleTimeRulerStart(e.clientX)}
            onTouchStart={(e: React.TouchEvent) => {
              e.preventDefault()
              handleTimeRulerStart(e.touches[0].clientX)
            }}
          />

            <T.Tracks>
              <DropTarget 
                acceptedOrigins={['media']} 
                onDrop={data => {
                  console.log(data)
                  const originalElement = document.getElementById(data.clip.id)
                  console.log(originalElement)
                  if (originalElement) {
                    const id = generateUUID()
                    const cloned = originalElement.cloneNode() as HTMLElement
                    cloned.id = id
                    document.body.appendChild(cloned)
                    setClipData(prev => {
                      return [
                        ...prev,
                        {
                          ...data.clip,
                          id,
                          offset: maxOutValue,
                          element: cloned
                        }
                      ]
                    })
                  }
                }}
              >
                <Track 
                  clipData={clipData} 
                  totalDuration={totalDuration}
                  scale={scale} 
                  onClipChange={async (newClipData, dragType) => {
                    if (snap) {
                      let closestClipStart: ClipData | null = null
                      let closestClipEnd: ClipData | null = null
                      let minDistanceStart = Infinity
                      let minDistanceEnd = Infinity
                    
                      const newStart = newClipData.offset
                      const newEnd = newClipData.offset + (newClipData.out - newClipData.in)
                    
                      for (const clip of clipData) {
                        if (clip.id === newClipData.id) continue
                    
                        const clipStart = clip.offset
                        const clipEnd = clip.offset + (clip.out - clip.in)
                    
                        const distanceToClosestStart = Math.abs(newStart - clipEnd)
                        const distanceToClosestEnd = Math.abs(newEnd - clipStart)
                    
                        if (distanceToClosestStart < snapRange && distanceToClosestStart < minDistanceStart) {
                          closestClipStart = clip
                          minDistanceStart = distanceToClosestStart
                        }
                    
                        if (distanceToClosestEnd < snapRange && distanceToClosestEnd < minDistanceEnd) {
                          closestClipEnd = clip
                          minDistanceEnd = distanceToClosestEnd
                        }
                      }
                    
                      // Check if playhead time is closer
                      const distanceToPlayheadStart = Math.abs(newStart - playheadTime)
                      const distanceToPlayheadEnd = Math.abs(newEnd - playheadTime)
                    
                      if (distanceToPlayheadStart < snapRange && distanceToPlayheadStart < minDistanceStart) {
                        closestClipStart = null // Playhead is closer, so reset closestClipStart
                        minDistanceStart = distanceToPlayheadStart
                      }
                    
                      if (distanceToPlayheadEnd < snapRange && distanceToPlayheadEnd < minDistanceEnd) {
                        closestClipEnd = null // Playhead is closer, so reset closestClipEnd
                        minDistanceEnd = distanceToPlayheadEnd
                      }
                    
                      // Apply snapping
                      if (dragType === 'in' && minDistanceStart !== Infinity) {
                        const snappedStart = closestClipStart
                          ? closestClipStart.offset + (closestClipStart.out - closestClipStart.in)
                          : playheadTime
                        const delta = snappedStart - newClipData.offset
                        const newIn = newClipData.in + delta
                        const newOut = newClipData.out
                    
                        if (newClipData.type !== 'video' || newOut - newIn <= newClipData.originalDuration) {
                          newClipData.in = newIn
                          newClipData.offset = snappedStart
                        }
                      }
                    
                      if (dragType === 'out' && minDistanceEnd !== Infinity) {
                        const snappedEnd = closestClipEnd
                          ? closestClipEnd.offset
                          : playheadTime
                        const newOut = newClipData.in + (snappedEnd - newClipData.offset)
                    
                        if (newClipData.type !== 'video' || newOut <= newClipData.originalDuration) {
                          newClipData.out = newOut
                        }
                      }
                    
                      if (dragType === 'offset') {
                        if (minDistanceStart !== Infinity) {
                          const snappedStart = closestClipStart
                            ? closestClipStart.offset + (closestClipStart.out - closestClipStart.in)
                            : playheadTime
                          newClipData.offset = snappedStart
                        }
                    
                        if (minDistanceEnd !== Infinity) {
                          const snappedEnd = closestClipEnd
                            ? closestClipEnd.offset
                            : playheadTime
                          newClipData.offset = snappedEnd - (newClipData.out - newClipData.in)
                        }
                      }
                    }
                    
                    const targetClipIndex = clipData.findIndex(clip => clip.id === newClipData.id)

                    let updatedClipData = [...clipData]
                    updatedClipData[targetClipIndex] = newClipData
                  
                    if (ripple) {
                      let delta = 0
                      if (dragType === 'offset') {
                        delta = newClipData.offset - clipData[targetClipIndex].offset
                        for (let i = targetClipIndex + 1; i < updatedClipData.length; i++) {
                          updatedClipData[i] = {
                            ...updatedClipData[i],
                            offset: updatedClipData[i].offset + delta
                          }
                        }
                      } else if (dragType === 'out') {
                        delta = newClipData.out - clipData[targetClipIndex].out
                        for (let i = targetClipIndex + 1; i < updatedClipData.length; i++) {
                          updatedClipData[i] = {
                            ...updatedClipData[i],
                            offset: updatedClipData[i].offset + delta
                          }
                        }
                      }
                    }
                  
                    setClipData(updatedClipData)
                  }}
                  
                  selectedClip={selectedClip}
                  onClick={(newSelectedClip) => setSelectedClip(newSelectedClip)}
                />
              </DropTarget>
            </T.Tracks>
          </FileDrop>
      </T.TimelineContent> 
    </T.Controls>
  </T.Timeline>)
}

interface TPlayheadProps {
  position: number
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void
}


const T = {
  Timeline: styled.div`
    width: 100%;  
    height: 100%;
    overflow: hidden;
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
    width: 25rem;
    min-width: 25rem;
    overflow-x: hidden;
    height: 100%;
    border-right:  1px solid var(--F_Surface);
  `,
  Center: styled.div`
    width: calc(calc(100% - calc(25rem - 4.5rem)) - 2px);
    height: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: black;
  `,
  Controls: styled.div`
    width: 100%;
    height: 6.5rem;
    background: var(--F_Background);
  `,
  Canvas: styled.canvas`
    width: 100%;
    height: 100%;
    max-height: 100%;
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
    line-height: 0;
  `,
  TotalTime: styled.div`
    width: 55px;
    text-align: center;
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color_Disabled);
    line-height: 0;
  `,
  TimelineContent: styled.div`
    width: 100%;
    position: relative;
  `,
  PlayheadPosition: styled.div<TPlayheadProps>`
    height: 100%;
    position: absolute;
    left: ${props => `${props.position}%`};
    top: 0;
    z-index: 2;
  `,
  Tracks: styled.div`
    width: 100%;  
    display: flex;
    flex-wrap: wrap;
    gap: .125rem;
  `
}

// -----> TIME RULER <------
interface TimeRulerProps {
  totalDuration: number
  onMouseDown: (e: React.MouseEvent) => void
  onTouchStart: (e: React.TouchEvent) => void
}

const millisecondsToTime = (milliseconds: number) => {
  const totalSeconds = milliseconds / 1000
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
  const seconds = Math.floor(totalSeconds - (hours * 3600) - (minutes * 60))

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export const TimeRuler: React.FC<TimeRulerProps> = ({ totalDuration, ...props }) => {
  return (
    <Tr.TimeRuler {...props}>
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
