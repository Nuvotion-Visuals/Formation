import { IconPrefix } from '@fortawesome/fontawesome-common-types'
import { Button, Icon, NumberSlider } from '../../internal'
import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import styled, { keyframes } from 'styled-components'

type CustomVideoPlayerProps = {
  src: string
  autoplay?: boolean
  loop?: boolean,
  name?: string,
  iconPrefix?: IconPrefix
}

export interface CustomVideoPlayerRef {
  play: () => Promise<void>
  pause: () => Promise<void>
}

/**
 * A Video Player that supports a variety of controls including play, pause, mute, volume control, time slider, repeat one, expand to full screen, and downloading the video.
 *
 * @param {string} src - The source URL of the video.
 * @param {boolean} autoplay - Flag to autoplay the video once it's loaded.
 * @param {boolean} loop - Flag to loop the video when it ends.
 * @param {string} name - The name for the downloaded video file.
 * @param {IconPrefix} iconPrefix - The prefix for the icons used in the video player controls.
 *
 * @function
 * @inner
 * @returns {CustomVideoPlayerRef}
 *
 * Implementing components should use a React ref to interact with this component. The exposed `play` and `pause` methods control video playback programatically.
 *
 * The `getVideoDimensions` method returns an object with the dimensions of the video, while the `onMetadataLoaded` method adds a callback function which is called when the video's metadata is loaded.
 *
 */
export const VideoPlayer = React.memo(forwardRef<CustomVideoPlayerRef, CustomVideoPlayerProps>(
  ({ src, autoplay, loop, name, iconPrefix }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [showIcon, setShowIcon] = useState(false)
    const [isRepeatOne, setIsRepeatOne] = useState(loop)

    useEffect(() => {
      if (autoplay && videoRef.current) {
        videoRef.current.load()
        videoRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.error('Autoplay failed:', error)
        })
      }
    }, [src, autoplay])

    const disabled = !src

    useImperativeHandle(ref, () => ({
      async play() {
        if (videoRef.current) {
          await videoRef.current.play()
          setIsPlaying(true)
        }
      },
      async pause() {
        if (videoRef.current) {
          await videoRef.current.pause()
          setIsPlaying(false)
        }
      },
      getVideoDimensions() {
        if (videoRef.current) {
          return {
            videoWidth: videoRef.current.videoWidth,
            videoHeight: videoRef.current.videoHeight
          }
        }
        return { videoWidth: 0, videoHeight: 0 }
      },
      onMetadataLoaded(callback: any) {
        if (videoRef.current) {
          videoRef.current.addEventListener('loadedmetadata', callback)
        }
      }
    }))

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.volume = volume
      }
    }, [volume])

    const [animationKey, setAnimationKey] = useState(0)

    const togglePlayPause = async () => {
      
      if (videoRef.current) {
        if (isPlaying) {
          await videoRef.current.pause()
        } else {
          await videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    }

    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted
        setIsMuted(!isMuted)
      }
    }

    const handleDurationChange = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration)
      }
    }

    const handleVolumeChange = (value: number) => {
      setVolume(value)
    }

    const handleTimeChange = (value: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = value
      }
      setCurrentTime(value)
    }

    let animationFrameId: number | null = null

    const updateCurrentTime = () => {
      if (videoRef.current && isPlaying) {
        setCurrentTime(videoRef.current.currentTime)
        animationFrameId = requestAnimationFrame(updateCurrentTime)
      }
    }

    useEffect(() => {
      if (isPlaying) {
        // Start requestAnimationFrame loop
        animationFrameId = requestAnimationFrame(updateCurrentTime)
      } else if (animationFrameId !== null) {
        // Cancel requestAnimationFrame loop
        cancelAnimationFrame(animationFrameId)
      }
      return () => {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId)
        }
      }
    }, [isPlaying])

    const handleOnEnded = () => {
      if (isRepeatOne && videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
      } else {
        setIsPlaying(false)
        setCurrentTime(0)
      }
    }

    const handleDownload = async () => {
      try {
        const response = await fetch(src)
        if (response.status !== 200) {
          console.error('Failed to download video file')
          return
        }
        const blob = await response.blob()
    
        const extension = blob.type.split('/')[1]
    
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
    
        link.href = blobUrl
        link.download = `${name ? name : 'video-file'}.${extension}`
        link.click()
    
        URL.revokeObjectURL(blobUrl)
      }
      catch (error) {
        console.error('An error occurred while downloading:', error)
      }
    }

    const iconRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const iconEl = iconRef.current
      const handleAnimationEnd = () => {
        setShowIcon(false)  // This will hide the icon when the animation ends
      }
      if (iconEl) {
        iconEl.addEventListener('animationend', handleAnimationEnd)
      }
      return () => {
        if (iconEl) {
          iconEl.removeEventListener('animationend', handleAnimationEnd)
        }
      }
    }, [])


    const toggleFullScreen = () => {
      const video = videoRef.current
      if (video) {
        if (!document.fullscreenElement) {
          video.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      }
    }

    const toggleRepeatOne = () => {
      setIsRepeatOne(!isRepeatOne)
    }

    return (
      <S.VideoPlayer disabled={disabled}>
        <S.Video
          ref={videoRef}
          src={src}
          loop={isRepeatOne} 
          onEnded={handleOnEnded}
          onDurationChange={handleDurationChange}
          onClick={() => {
            togglePlayPause()
            setAnimationKey(prevKey => prevKey + 1)
            setShowIcon(true)
          }}
        />
        {
          showIcon && <S.PlayPauseIcon ref={iconRef} key={animationKey}>
          <Icon
            icon={isPlaying ? 'play' : 'pause'}
            iconPrefix={iconPrefix ? iconPrefix : 'fas'}
            size={'2x'}
          />
        </S.PlayPauseIcon>
        }
        
        <S.Controls>
          <Button
            icon={isPlaying ? 'pause' : 'play'}
            iconPrefix={iconPrefix ? iconPrefix : 'fas'}
            onClick={togglePlayPause}
            minimal
          />

          <S.Time>
            <span>
              {new Date(currentTime * 1000).toISOString().substr(14, 5)}
            </span>
            <span> / </span>
            <span>
              {new Date(duration * 1000).toISOString().substr(14, 5)}
            </span>
          </S.Time>

          <NumberSlider
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleTimeChange}
            hideNumberInput
            step={.01}
            precise
          />

          <Button
            icon={isMuted ? 'volume-mute' : 'volume-high'}
            iconPrefix={iconPrefix ? iconPrefix : 'fas'}
            onClick={toggleMute}
            minimal
          />

          <S.Volume>
            <NumberSlider
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              hideNumberInput
              precise
            />
          </S.Volume>

          <Button
            icon='download'
            iconPrefix={iconPrefix ? iconPrefix : 'fas'}
            minimal
            onClick={handleDownload}
          />

          <S.Emphasize emphasize={!!isRepeatOne}>
            <Button
              icon={'repeat'}
              iconPrefix={iconPrefix ? iconPrefix : 'fas'}
              onClick={toggleRepeatOne}
              minimal
            />
          </S.Emphasize>

          <Button
            icon='expand'
            iconPrefix={iconPrefix ? iconPrefix : 'fas'}
            onClick={toggleFullScreen}
            minimal
          />
        </S.Controls>
      </S.VideoPlayer>
    )
  }
))

const iconAnimation = keyframes`
  0% {
    font-size: 0px;
    opacity: 0;
    display: block;
  }
  50% {
    font-size: 48px;
    opacity: 1;
    display: block;
  }
  100% {
    font-size: 96px;
    opacity: 0;
    display: none;
  }
`

const S = {
  VideoPlayer: styled.div<{ disabled?: boolean }>`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    position: relative;
    cursor: ${props => props.disabled ? 'not-allowed' : 'auto'};
    * {
      color: ${props => props.disabled ? 'var(--F_Font_Color_Disabled)' : 'var(--F_Font_Color)'};
    }
  `,
  PlayPauseIcon: styled.div`
    position: absolute;
    top: calc(50% - calc(var(--F_Input_Height) / 2));
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${iconAnimation} .5s linear normal forwards;
  `,
  Controls: styled.div`
    width: 100%;
    height: var(--F_Input_Height);
    display: flex;
    align-items: center;
  `,
  Time: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    font-size: var(--F_Font_Size_Label);
    gap: .25rem;
    margin-right: .5rem;
  `,
  Volume: styled.div`
    width: 6rem;
  `,
  Video: styled.video`
    width: 100%;

  `,
  Emphasize: styled.div<{ emphasize: boolean }>`
    opacity: ${props => props.emphasize ? '1' : '.3'};
  `
}
