import React from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode,
  noPadding?: boolean
}

/**
 * This component provides a preset layout for pages. It offers an option for the pages to include padding or not via 'noPadding' prop.
 * It ensures that its content is spaced appropriately, centered and wrapped correctly for all screen sizes.
 *
 * @component
 * @param {React.ReactNode} children - Elements or components to be displayed in the page.
 * @param {boolean} [noPadding=false] - Determines whether padding is removed from the page layout.
 *
 * @example
 * // Example usage of the Page component.
 * <Page>
 *   <h1>Some content here</h1>
 * </Page>
 *
 * @example
 * // Example usage of the Page component with no padding.
 * <Page noPadding>
 *   <h1>Some content here</h1>
 * </Page>
 */
export const Page = ({ children, noPadding }: Props) => {
  return (
    <S.Page>
      {
        noPadding
          ? <S.Inner>
              {
                children
              }
            </S.Inner>
          : <S.Content>
              <S.Inner>
                {
                  children
                }
              </S.Inner>
            </S.Content>
      }
    </S.Page>
  )
}

const S = {
  Page: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,
  Content: styled.div`
    max-width: calc(100% - 1.5rem);
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  Inner: styled.div`
    max-width: var(--F_Page_Width);
    width: 100%;
  `
}
