import React from 'react'
import styled from 'styled-components'

interface FitProps {
  children: React.ReactNode,
  disableRadius?: boolean,
  gap?: number | string
}

/**
 * `Fit` is a layout component that spaces its children equally to fill the container. 
 * It is ideal for scenarios where you need to display a row of elements such as icons, buttons, or cards, 
 * ensuring they are aligned and spaced consistently. The component provides an option to disable rounded corners on children elements.
 *
 * @param {React.ReactNode} children - The elements to be displayed in a row.
 * @param {boolean} [disableRadius] - If true, disables the border-radius on child elements, making them have sharp corners.
 *
 * @example
 * // To display a row of three buttons evenly spaced and with rounded corners
 * <Fit>
 *   <button>Button 1</button>
 *   <button>Button 2</button>
 *   <button>Button 3</button>
 * </Fit>
 *
 * @example
 * // To display a row of images without rounded corners
 * <Fit disableRadius>
 *   <img src="image1.jpg" alt="Image 1"/>
 *   <img src="image2.jpg" alt="Image 2"/>
 *   <img src="image3.jpg" alt="Image 3"/>
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