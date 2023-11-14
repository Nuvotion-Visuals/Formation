import styled, { css } from 'styled-components'

import { AspectRatio, Button, Grid, LoadingSpinner } from '../../internal'
import React from 'react'

interface Props {
  loading?: boolean,
  noResultsMessage: string,
  children?: React.ReactNode,
  maxWidth: number,
  backgroundColor?: string,
  disableRounded?: boolean,
  tiles?: number
}

/**
 * `TileGridPlaceholder` is a placeholder or a loading indicator within Tile-based Grid layouts. 
 * The component is useful in situations such as displaying custom messages, showing a loading state, 
 * or presenting an option to clear current selections or search results.
 *
 * @param {boolean} [props.loading=false] - If `true`, the component displays a loading spinner.
 * @param {string} [props.noResultsMessage=''] - Message to display in the placeholder state.
 * @param {React.ReactNode} [props.children] - Additional React components or elements to be rendered, typically used for providing interaction options like a 'Clear' button.
 * @param {number} props.maxWidth - Maximum width for the tile grid.
 * @param {number} [props.tiles=16] - Number of placeholder tiles to display.
 * @param {string} [props.backgroundColor] - Optional background color for the component.
 * @param {boolean} [props.disableRounded=false] - If `true`, disables rounded corners on tiles.
 */
export const TileGridPlaceholder = React.memo(({ 
  loading, 
  noResultsMessage, 
  children,
  maxWidth,
  backgroundColor,
  disableRounded,
  tiles = 16
}: Props) => {

  const height = maxWidth * 1.5

  return (
    <S.Clear height={height}>
      {
        loading
          ? <S.Message><LoadingSpinner /></S.Message>
          : <S.Message>
              <S.MessageText>{ noResultsMessage }</S.MessageText>
              {
                children
              }
            </S.Message>
      }
      <S.Absolute height={height}>
        <Grid maxWidth={maxWidth} gap={.125}>
          {
            Array(tiles).fill(0).map((_, index) =>
              <S.TilePlaceholder disableRounded={disableRounded}>
                <AspectRatio ratio={4/3}>
                </AspectRatio>
              </S.TilePlaceholder>
            )
          }
        </Grid>
      </S.Absolute>

      <S.Fade backgroundColor={backgroundColor} height={height}/>
    </S.Clear>
  )
})

const S = {
  Clear: styled.div<{ height: number }>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    position: relative;
    height: ${props => props.height + 'rem'};
    overflow: hidden;
  `,

  Message: styled.div`
    position: absolute;
    top: 2rem;
    z-index: 1;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `,

  MessageText: styled.div`
    width: 100%;
    text-align: center;
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color_Label);
    padding-bottom: 1rem;
  `,

  Absolute: styled.div<{ height: number }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${props => props.height + 'px'};
  `,

  Fade: styled.div<{ backgroundColor?: string, height: number }>`
    position: absolute;
    bottom: 0;
    background: linear-gradient(0deg, var(--F_Background) 0%, rgba(0,0,0,0) 100%);
    background: ${props => css`linear-gradient(0deg, ${props.backgroundColor ? props.backgroundColor : 'var(--F_Background)'} 0%, rgba(0,0,0,0) 100%)`};
    width: 100%;
    height: ${props => props.height + 'rem'};
  `,

  TilePlaceholder: styled.div<{
    disableRounded?: boolean
  }>`
    width: 100%;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: ${props => props.disableRounded ? 'none' : 'var(--F_Tile_Radius)'};
    display: inline-block;
    align-items: center;
    background: var(--F_Surface_0);
    transition: 0s;
    position: relative;
    cursor: pointer;
    pointer-events: none;
  `,
};
