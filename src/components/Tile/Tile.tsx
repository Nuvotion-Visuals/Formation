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
  title?: string
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
 * @param {string} [title] - The title attribute specifies extra information about the Tile. It can be shown as a tooltip text when the mouse moves over the element.
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
  footers,
  title
}: Props) => {
  return (
    <S.Tile 
      onClick={onClick ? onClick : undefined} 
      active={active}
      disabled={disabled}
      canClick={!!onClick}
      title={title}
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
      <S.Selected active={active} />
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
    position: relative;
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
      : ''
    };
     &:hover {
        span {
          box-shadow: ${props => props.active ? 'var(--F_Outline_Primary_Hover_Thick) !important' : 'none'};
        }
      }
      &:active {
        span {
          box-shadow: ${props => props.active ? 'var(--F_Outline_Primary_Variant_Thick) !important' : 'none'};
        }
      }
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
  `,
  Selected: styled.span<{
    active?: boolean
  }>`
    box-shadow: ${props => props.active ? 'var(--F_Outline_Primary_Thick)' : 'none'};
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: var(--F_Tile_Radius);
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
  `,
}