import { AspectRatio, Box, Icon, Item } from "../../internal"
import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"

export const VideoPreview = React.memo(({ 
  onClick,
  text,
  videoUrl,
  imageUrl,
  active,
  minimal,
  disabled
}: { 
  videoUrl: string, 
  imageUrl: string, 
  text: string,
  onClick: () => void,
  active: boolean,
  minimal?: boolean,
  disabled?: boolean
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const handleMouseOver = () => {
      if (videoRef.current) {
        if (!videoLoaded) {
          videoRef.current.src = videoUrl
          setVideoLoaded(true)
        }
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
    }

    const handleMouseOut = () => {
      if (videoRef.current) {
        videoRef.current.pause()
        try {
        videoRef.current.currentTime = videoRef.current.duration * 0.25
          
        }
        catch(e){}
      }
    }

    if (videoRef.current) {
      videoRef.current.addEventListener('mouseover', handleMouseOver)
      videoRef.current.addEventListener('mouseout', handleMouseOut)
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('mouseover', handleMouseOver)
        videoRef.current.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [videoLoaded, videoUrl])

  return (
    <S.Tile onClick={disabled ? () => {} : onClick} active={active} disabled={disabled}>
      { !minimal && <Item text={text} /> }
      <AspectRatio
        ratio={16/9}
        backgroundColor='var(--F_Surface_0)'
        backgroundSrc={imageUrl}
      >
        <video 
          ref={videoRef}
          width='100%'
        />
      </AspectRatio>
      <S.Selected active={active} />
      {
        disabled && <S.Disabled>
          <Box mt={1}>
            <Icon
              icon='check-circle'
              iconPrefix='fal'
              size='2x'
            />
          </Box>
        </S.Disabled>
      }
      
    </S.Tile>
  )
})
const S = {
  Tile: styled.div<{
    active: boolean,
    disabled?: boolean
  }>`
    width: 100%;
    border-radius: var(--F_Tile_Radius);
    overflow: hidden;
    ${props => !props.disabled
      ? css`
        cursor: pointer;
        * {
          cursor: pointer;
        }
      `
      : ''
    }
    
    background: ${props => props.active ? 'var(--F_Primary)' : 'var(--F_Surface)'};
    position: relative;

    &:hover {
      background: ${props => props.active ? 'var(--F_Primary)' : 'var(--F_Surface_1)'};
    }
  `,
  Selected: styled.div<{
    active: boolean
  }>`
    box-shadow: ${props => props.active ? 'var(--F_Outline_Primary)' : 'none'};
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: var(--Tile_Radius);
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1;
  `,
  Disabled: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: var(--Tile_Radius);
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1;
    background: var(--F_Surface);
    opacity: .8;
    display: flex;
    align-items: center;
    justify-content: center;
    * {
      color: var(--F_Font_Color_Success);
    }
  `,
}