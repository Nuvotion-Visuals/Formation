import React from 'react'
import styled from 'styled-components'

/**
 * `Break` is a simple component that renders a thematic break or separator. It's useful for 
 * creating visual distinctions between different sections of content.
 *
 * @component
 *
 * @example
 * // To add a visual break in content
 * <Break />
 */
export const Break = ({  }) => <S.Break />

const S = {
  Break: styled.div`
    width: 100%;
    display: flex;
  `
}
