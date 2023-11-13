import { IconPrefix } from '@fortawesome/fontawesome-common-types'
import { Button, NumberSlider } from '../../internal'

import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from 'react'
import styled from 'styled-components'

type CustomAudioPlayerProps = {
  src: string,
  name?: string,
  iconPrefix?: IconPrefix
}

export interface CustomAudioPlayerRef {
  play: () => Promise<void>
  pause: () => Promise<void>
}

/**
 * `AudioPlayer` is a custom, stylable audio player component with play, pause, volume control,
 * and track progress capabilities. It can be controlled programmatically via exposed ref methods
 * and it also provides an option to download the audio file.
 *
 * @component
 * @param {string} src - The source URL of the audio file to be played.
 * @param {string} [name] - An optional name for the audio file, used for the download functionality.
 * @param {IconPrefix} [iconPrefix] - Optional prefix for the FontAwesome icons used in the player.
 * 
 * @example
 * // An instance of AudioPlayer with a sample audio file
 * <AudioPlayer src="path/to/audio.mp3" name="Sample Audio" iconPrefix="fas" />
 *
 * @forwardRef
 * @typedef {Object} CustomAudioPlayerRef - Exposes the control methods `play`, `pause`, and `addEventListener`.
 */
export const AudioPlayer = React.memo(forwardRef<CustomAudioPlayerRef, CustomAudioPlayerProps>(
  ({ src, name, iconPrefix }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const disabled = !src

    const [onProgressCallback, setOnProgressCallback] = useState<((percentage: number) => void) | null>(null)

    // Expose methods to parent components
    useImperativeHandle(ref, () => ({
      async play() {
        if (audioRef.current) {
          await audioRef.current.play()
          setIsPlaying(true)
        }
      },
      async pause() {
        if (audioRef.current) {
          await audioRef.current.pause()
          setIsPlaying(false)
        }
      },
      addEventListener(eventType: string, callback: Function) {
        if (audioRef.current) {
          audioRef.current.addEventListener(eventType, e => callback(e))
        }
      },
      onProgressPercentage(callback: (percentage: number) => void) {
        setOnProgressCallback(() => callback)
      },
      audioElement: audioRef.current,
    }))

    useEffect(() => {
      if (onProgressCallback !== null) {
        const percentage = (currentTime / duration) * 100
        onProgressCallback(percentage)
      }
    }, [currentTime, onProgressCallback, duration])

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume
      }
    }, [volume])

    const togglePlayPause = async () => {
      if (audioRef.current) {
        if (isPlaying) {
          await audioRef.current.pause()
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
          }
        } else {
          await audioRef.current.play()
          animationFrameId = requestAnimationFrame(updateCurrentTime)
        }
        setIsPlaying(!isPlaying)
      }
    }

    const toggleMute = () => {
      if (audioRef.current) {
        audioRef.current.muted = !isMuted
        setIsMuted(!isMuted)
      }
    }

    const handleDurationChange = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration)
      }
    }

    const handleVolumeChange = (value: number) => {
      setVolume(value)
    }

    const handleTimeChange = (value: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = value
      }
      setCurrentTime(value)
    }

    const handleOnEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleDownload = async () => {
      try {
        const response = await fetch(src)
        if (response.status !== 200) {
          console.error('Failed to download audio file')
          return
        }
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        const extension = blob.type.split('/')[1]

        link.href = blobUrl
        link.download = `${name ? name : 'audio-file'}.${extension}` 
        link.click()
    
        URL.revokeObjectURL(blobUrl) // Release the blob URL
      }
      catch (error) {
        console.error('An error occurred while downloading:', error)
      }
    }

    let animationFrameId: number | null = null

    const updateCurrentTime = () => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime)
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
    
    useEffect(() => {
      setIsPlaying(false)
    }, [src])

    return (
      <S.AudioPlayer disabled={disabled}>
        <audio
          ref={audioRef}
          src={src}
          onEnded={handleOnEnded}
          onDurationChange={handleDurationChange}
          hidden
        />
        <Button
          icon={isPlaying ? 'pause' : 'play'}
          iconPrefix={iconPrefix ? iconPrefix : 'fas'}
          onClick={togglePlayPause}
          minimal
        />

        <S.Time>
          <span>
            { new Date(currentTime * 1000).toISOString().substr(14, 5) }
          </span>
          <span> / </span>
          <span>
            { new Date(duration * 1000).toISOString().substr(14, 5) }
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
      </S.AudioPlayer>
    )
  }
))

const S = {
  AudioPlayer: styled.div<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    height: var(--F_Input_Height);
    cursor: ${props => props.disabled ? 'not-allowed' : 'auto'};
    * {
      color: ${props => props.disabled ? 'var(--F_Font_Color_Disabled)' : 'var(--F_Font_Color)'};
    }
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
  `
}