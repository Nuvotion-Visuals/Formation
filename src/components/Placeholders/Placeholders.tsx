import React from 'react'
import styled from 'styled-components'

interface Props {
  message?: string
}

/**
 * This component is designed to act as a placeholder or loading state in a user interface.
 * It visually indicates that content is in the process of loading, with an optional message displayed at the top.
 *
 * The component displays up to 12 placeholder items, each consisting of a circle and a line. 
 * The circle and line emulate an icon and text respectively, creating a skeleton version of the content that is loading.
 *
 * @component
 * @param {string} [message] - Optional message that is displayed at the top of the placeholder items.
 *
 * @example
 * // Placeholder without any message
 * <Placeholders />
 *
 * @example
 * // Placeholder with a message
 * <Placeholders message="Items are loading..." />
 */
export const Placeholders = ({ message }: Props) => {
  return (
    <S_Placeholders>
      {
        message
          ? 
            <S_Message>
              { message }
            </S_Message>
          : null
      }
        
      <S_Absolute />

      {
        new Array(12).fill(0).map(() => 
        <S_Placeholder>
          <S_PlaceholderLeft />
          <S_PlaceholderRight />
        </S_Placeholder>
        )
      }
    </S_Placeholders>
  )
}

const S_Placeholders = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: calc(100% - 2.5rem);
  padding: 1.25rem;
  gap: .75rem;
  overflow: hidden;
  height: 160px; 
`

const S_Absolute = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 1px;
  z-index: 0;
  height: 100%;
  width: 100%;
  background: var(--F_Gradient_To_Background);
  display: flex;
  align-items: center;
  justify-content: center;
`

const S_Placeholder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: .5rem;
`

const S_PlaceholderLeft = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 100%;
  background: var(--F_Surface_2);
`

const S_PlaceholderRight = styled.div`
  height: 1rem;
  width: calc(100% - 3rem);
  border-radius: 1rem;
  background: var(--F_Surface_2);
`

const S_Message = styled.div`
  color: var(--F_Font_Color_Disabled);
  font-size: var(--F_Font_Size_Label);
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: .25rem;
`