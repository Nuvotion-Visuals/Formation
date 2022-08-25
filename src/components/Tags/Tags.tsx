import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import xor from 'lodash.xor'
import union from 'lodash.union'

import { Button } from '../../internal'
import { Icon } from '../../internal'

type TagsType = {
  allTags: string[],
  initialActiveTags: string[],
  onChange: (tags: string[]) => void,
  noPadding?: boolean
}

export const Tags = ({ 
  allTags, 
  initialActiveTags, 
  onChange, 
  noPadding 
}: TagsType) => {

  const [activeTags, set_activeTags] = useState(initialActiveTags)

  useEffect(() => {
    onChange(activeTags)
  }, [activeTags])

  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  const scroll = (direction : string) => {
    const tagContainer = ref?.current;
    if (tagContainer) {
      const tagScroll = tagContainer.scrollLeft
      const newScrollX = direction === 'right' ? tagScroll + 300 : tagScroll - 300
      tagContainer.scrollTo({
        top: 0,
        left: newScrollX,
        behavior: 'smooth'
      })
    }
  }

  const onScroll = () => {
    const tagContainer = ref.current
    if (tagContainer) {
      const tagScroll = tagContainer.scrollLeft
      tagScroll === 0
        ? setShowLeft(false)
        : showLeft
            ? null
            : setShowLeft(true)
    }
  }

  const toggleTagActive = (tag : string) => {
    set_activeTags(activeTags.includes(tag) 
        ? xor(activeTags, [tag]) 
        : union(activeTags, [tag])
      )  
  }

  return (
    <S.Container ref={containerRef} >
      <S.Tags ref={ref} onScroll={onScroll} noPadding={noPadding}>
        {
          allTags.map((tag, index) => 
            <S.ButtonContainer key={`tag${index}`}>
              <Button 
                text={tag} 
                primary={activeTags.includes(tag)}
                onClick={() => toggleTagActive(tag)} 
                secondary={!activeTags.includes(tag)}
              />
            </S.ButtonContainer>
          )
        }
        <S.Padding_R />
      </S.Tags>

      {
        showLeft
          ? <S.Overlay_L onClick={() => scroll('left')}>
              <Icon icon='chevron-circle-left' iconPrefix='fas' size={'2x'} />
            </S.Overlay_L>
          : null
      }

      {
        showRight
          ? <S.Overlay onClick={() => scroll('right')}>
              <Icon icon='chevron-circle-right' iconPrefix='fas' size={'2x'}  />
            </S.Overlay>
          : null
      }
    </S.Container>
  )
}

interface TagProps {
  noPadding?: boolean
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  `,
  Tags: styled.div<TagProps>`
    width: 100%;
    display: flex;
    position: relative;
    left: 0;
    top: 0;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
    margin-right: 8px;
    flex: 0 0 auto;
  `,
  Overlay: styled.div`
    position: absolute;
    z-index: 1;
    right: 0px;
    top: 0;
    height: 100%;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: linear-gradient(to right, rgba(18,18,18,0) 0%, rgba(18,18,18,.8) 20%, rgba(18,18,18,1) 100%); */
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.8) 20%, rgba(255,255,255,1) 100%);
    color: var(--F_Font_Color_Label);
    &:hover {
      color: var(--F_Font_Color);
    }
    cursor: pointer;
  `,
  Overlay_L: styled.div`
    position: absolute;
    z-index: 1;
    left: 0px;
    top: 0;
    height: 100%;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to left, rgba(18,18,18,0) 0%, rgba(18,18,18,.8) 20%, rgba(18,18,18,1) 100%);
    color: var(--F_Font_Color_Label);
    &:hover {
      color: var(--F_Font_Color);
    }
    cursor: pointer;
  `,
  Padding_R: styled.div`
    padding: 0 2rem;
  `
}

export default Tags