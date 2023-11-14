import React from 'react'
import { AspectRatio, AspectRatioProps, Empty, Item, ItemProps } from '../../internal'
import styled, { css } from 'styled-components'

interface Props {
  onClick?: (e: React.MouseEvent) => void,
  disabled?: boolean,
  header: ItemProps,
  content: AspectRatioProps,
  footers: ItemProps[],
}

export const Tile = ({
  onClick,
  disabled,
  header,
  content,
  footers
}: Props) => {
  return (
    <S.Tile 
      onClick={onClick ? onClick : undefined} 
      disabled={disabled}
      canClick={!!onClick}
    >
      <Item {...header} />
      <AspectRatio {...content} />
      {
        footers?.map(footer =>
          <Item { ...footer } />
        )
      }
    </S.Tile>
  )
}

const S = {
  Tile: styled.div<{
    disabled?: boolean,
    canClick?: boolean
  }>`
    border-radius: var(--F_Tile_Radius);
    overflow: hidden;
    background: var(--F_Surface);
    cursor: ${props => props.disabled 
      ? 'not-allowed' 
      : props.canClick
        ? 'pointer'
        : 'auto'
    };
    ${props => props.canClick && css`
      cursor: pointer;
      &:hover {
        background: var(--F_Surface_1);
      }
      &:active {
        background: var(--F_Surface_2);
      }
    `}
  `
}