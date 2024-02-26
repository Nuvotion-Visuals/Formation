import React from 'react'
import { AspectRatio, AspectRatioProps, Empty, Item, ItemProps } from '../../internal'
import styled, { css, keyframes } from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
  active?: boolean
  header?: ItemProps
  contentProps: AspectRatioProps
  footers?: ItemProps[]
  blink?: boolean
  singleBlink?: boolean
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
  contentProps,
  footers,
  blink,
  singleBlink,
  ...rest
}: Props) => {
  return (
    <S.Tile 
      onClick={onClick ? onClick : undefined} 
      active={active}
      disabled={disabled}
      canClick={!!onClick}
      blink={blink}
      singleBlink={singleBlink}
      {...rest}
    >
      {
        header && <Item {...header} />
      }
      <AspectRatio {...contentProps} />
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
      <S.Selected 
        active={active} 
        blink={blink}
        singleBlink={singleBlink}
      />
    </S.Tile>
  )
}

const calculateBackgroundColor = (props: any) => {
  if (props.active) {
    return 'var(--F_Primary)';
  }
  if (props.blink) {
    return 'var(--Hover_Single)';
  }
  return 'var(--F_Surface)';
}


const S = {
  Tile: styled.div<{
    active?: boolean
    disabled?: boolean
    canClick?: boolean
    blink?: boolean
    singleBlink?: boolean
  }>`
   width: 100%;
    border-radius: var(--F_Tile_Radius);
    overflow: hidden;
    position: relative;
    background: ${props => calculateBackgroundColor(props)};
    cursor: ${props => props.disabled 
      ? 'not-allowed' 
      : props.canClick 
        ? 'pointer' 
        : 'auto'};
    animation: ${props => props.blink 
      ? css`${blink} 1s linear infinite` 
      : props.singleBlink
          ? css`${blink} 2s linear forwards` 
          : 'none'
    };
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
    active?: boolean,
    blink?: boolean,
    singleBlink?: boolean
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
    animation: ${props => 
      props.active
        ? props.blink 
          ? css`${boxShadowBlink} 1s linear infinite` 
          : props.singleBlink
            ? css`${boxShadowBlink} 2s linear forwards` 
            : 'none'
        : 'none'
    };
  `
}

const blink = keyframes`
  0% {
    background: var(--F_Surface);
  }
  50% {
    background: var(--F_Primary);
  }
  100% {
    background: var(--F_Surface);
  }
`

const boxShadowBlink = keyframes`
  0% {
    box-shadow: none;
  }
  50% {
    box-shadow: var(--F_Outline_Primary_Thick);
  }
  100% {
    box-shadow: none;
  }
`