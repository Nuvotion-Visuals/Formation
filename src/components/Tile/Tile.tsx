import React from 'react'
import { AspectRatio, AspectRatioProps, Empty, Item, ItemProps } from '../../internal'
import styled, { css } from 'styled-components'

interface Props {
  onClick?: (e: React.MouseEvent) => void,
  disabled?: boolean,
  active?: boolean,
  header: ItemProps,
  content: AspectRatioProps,
  footers?: ItemProps[],
}

/**
 * `Tile` is a flexible component designed to display content in a structured tile format, 
 * typically used in dashboards or as part of a grid layout. It is composed of three main sections: 
 * a header, a content area with a customizable aspect ratio, and a footer section that can hold 
 * multiple items. This component is interactive, allowing for an optional click handler, 
 * and can be visually disabled.
 * 
 * The header and footer areas use the `Item` component, which can be customized via `ItemProps`. 
 * The content area utilizes the `AspectRatio` component to ensure that the content maintains 
 * a specific aspect ratio.
 * 
 * @param {function} [onClick] - Optional click event handler for the tile.
 * @param {boolean} [active] - If true, the tile is visually highlighted in the theme's primary color.
 * @param {boolean} [disabled] - If true, the tile is visually and functionally disabled.
 * @param {ItemProps} header - Properties for configuring the header `Item` component.
 * @param {AspectRatioProps} content - Properties for configuring the content area with a specific aspect ratio.
 * @param {ItemProps[]} [footers] - Array of properties for configuring each footer `Item` component.
 *
 * @example
 * // To create a tile with a header, an image content with a 16:9 aspect ratio, and two footer items
 * <Tile 
 *   onClick={() => console.log('Tile clicked')} 
 *   header={{ title: 'Header Title' }}
 *   content={{ ratio: 16/9, backgroundSrc: 'path/to/image.jpg' }}
 *   footers={[
 *     { title: 'Footer Item 1' },
 *     { title: 'Footer Item 2' }
 *   ]}
 * />
 */

export const Tile = ({
  onClick,
  active,
  disabled,
  header,
  content,
  footers
}: Props) => {
  return (
    <S.Tile 
      onClick={onClick ? onClick : undefined} 
      active={active}
      disabled={disabled}
      canClick={!!onClick}
    >
      <Item {...header} />
      <AspectRatio {...content} />
      {
        footers &&
          <S.Footers>
            {
              footers.map(footer =>
                <S.FooterWrapper>
                  <Item { ...footer } />
                </S.FooterWrapper>
              )
            }
          </S.Footers>
      }
    </S.Tile>
  )
}

const S = {
  Tile: styled.div<{
    active?: boolean,
    disabled?: boolean,
    canClick?: boolean
  }>`
   width: 100%;
  border-radius: var(--F_Tile_Radius);
  overflow: hidden;
  background: ${props => props.active ? 'var(--F_Primary)' : 'var(--F_Surface)'};
  cursor: ${props => props.disabled 
    ? 'not-allowed' 
    : props.canClick 
      ? 'pointer' 
      : 'auto'};

  ${props => props.canClick 
    ? `
        &:hover {
          background: ${props.active ? 'var(--F_Primary_Hover)' : 'var(--F_Surface_1)'};
        }
        &:active {
          background: ${props.active ? 'var(--F_Primary_Variant)' : 'var(--F_Surface_2)'};
        }
        * {
          cursor: pointer;
        }
      ` 
    : ''};
  `,
  FooterWrapper: styled.div`
    width: 100%;
    background: var(--F_Surface);
  `,
  Footers: styled.div`
    width: 100%;
    background: var(--F_Surface_2);
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
  `
}