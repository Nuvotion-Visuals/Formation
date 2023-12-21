import React from 'react'
import styled from 'styled-components'

interface FitProps {
  children: React.ReactNode,
  disableRadius?: boolean,
  gap?: number | string
}

/**
 * `Fit` is a layout component designed for evenly spacing and aligning children elements in a row. 
 * This component is particularly useful when you need a consistent layout for elements like buttons, 
 * icons, or cards. It offers flexibility in spacing and an option to control the border radius of child elements.
 *
 * @param {React.ReactNode} children - The elements to be displayed in a row.
 * @param {boolean} [disableRadius=false] - When set to true, it disables the border-radius on child elements, giving them sharp corners.
 * @param {number|string} [gap=0] - The space between each child element. Accepts a number (interpreted as rem) or a CSS size string.
 *
 * @example
 * // To display a row of buttons with a specific gap and rounded corners
 * <Fit gap={1.5}>
 *   <button>Button 1</button>
 *   <button>Button 2</button>
 *   <button>Button 3</button>
 * </Fit>
 *
 * @example
 * // To display a row of icons with no gap and without rounded corners
 * <Fit disableRadius gap="0px">
 *   <Icon name="icon1" />
 *   <Icon name="icon2" />
 *   <Icon name="icon3" />
 * </Fit>
 */
export const Fit: React.FC<FitProps> = ({ children, disableRadius, gap }) => {
  const gapValue = typeof gap === 'number' ? `${gap}rem` : gap

  return (
    <S.Fit disableRadius={disableRadius} gap={gapValue}>
      {
        React.Children.map(children, child => (
          <>{child}</>
        ))
      }
    </S.Fit>
  )
}

const S = {
  Fit: styled.div<{
    disableRadius?: boolean,
    gap?: string
  }>`
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: space-between;
    gap: ${props => props.gap || '0'};
    * {
      border-radius: ${props => props.disableRadius ? '0 !important' : 'auto'};
    }
    > * {
      flex: 1;
      text-align: center;
    }
  `
}