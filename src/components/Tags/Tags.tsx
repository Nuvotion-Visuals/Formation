import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import xor from 'lodash.xor'
import union from 'lodash.union'

import { Button, ButtonProps } from '../../internal'
import { Icon } from '../../internal'

type TagsType = {
  allTags: ButtonProps[],
  initialActiveTags: string[],
  onChange: (tags: string[]) => void,
  noPadding?: boolean
}

/**
 * The `Tags` component renders a list of tags that user can select by clicking on them. The state of selected tags reportedly
 * synced back to the parent component, enabling parent to manage the result of users' interaction with the tags.
 * 
 * The component also offers scrolling functionality for presenting tags when there's inadequate space to display all at once.
 * The arrow icons appear on the sides when the tags overflow the container, allowing the user to scroll left and right.
 *
 * @param {Object[]} allTags - An array of tag objects. Each tag object should include properties for button customization, e.g., "name", "primary", "labelColor", etc.
 * See the Button component for a full list of customizable properties.
 * @param {string[]} initialActiveTags -Initial value for active tags. Ideally, it should be an array of tag names from the allTags props.
 * @param {Function} onChange - Callback function to update the active tags in parent state. Returns the array of active tag names.
 * @param {boolean} noPadding - Set to true to remove default padding around the component. Default: none.
 *
 * @example
 * return (
 *  <Tags 
 *    allTags={[
 *      { name:'Tag1' }, 
 *      { name:'Tag2', labelColor:'blue' }
 *    ]}
 *    initialActiveTags={['Tag1']}
 *    onChange={(tags) => console.log(tags)}
 *  />
 * )
 * 
 * @component
 */
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

  const toggleTagActive = (tag : string | undefined) => {
    if (tag === undefined) return;
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
            tag.name !== undefined  
              ? <S.ButtonContainer key={`tag${index}`}>
                  <Button 
                    text={tag.name}
                    primary={activeTags.includes(tag.name)}
                    onClick={() => tag !== undefined && toggleTagActive(tag.name)}
                    secondary={!activeTags.includes(tag.name)}
                    labelColor={tag.labelColor}
                    compact
                  />
                </S.ButtonContainer>
              : <></>
          )
        }
        <S.Padding_R />
      </S.Tags>

      {
        showLeft
          ? <S.Overlay_L onClick={() => scroll('left')}>
              <Icon icon='chevron-circle-left' iconPrefix='fas' size={'lg'} />
            </S.Overlay_L>
          : null
      }

      {
        showRight
          ? <S.Overlay onClick={() => scroll('right')}>
              <Icon icon='chevron-circle-right' iconPrefix='fas' size={'lg'}  />
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
    margin-right: .5rem;
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
    background: var(--F_Gradient_To_Right);
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
    background: var(--F_Gradient_To_Left);
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