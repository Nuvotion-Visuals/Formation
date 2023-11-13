import React from 'react'
import styled from 'styled-components'

interface Props {
  href?: string,
  newTab?: boolean,
  linkComponent?: React.ReactNode,
  children?: React.ReactNode
}

/**
 * `Link` is a versatile component that can be used to create hyperlinks. It can render with default `<a>` tag behavior or utilize a custom link component, such as one provided by a library like Next.js. The component can be configured to open links in a new tab.
 *
 * @component
 * @param {string} [href] - The URL that the link points to.
 * @param {boolean} [newTab=false] - If true, clicking the link will open the URL in a new tab.
 * @param {React.ReactNode} [linkComponent] - An optional custom link component to be used instead of the native `<a>` tag.
 * @param {React.ReactNode} [children] - The content to be rendered within the link.
 *
 * @example
 * // Standard link opening in the same tab
 * <Link href="https://example.com">
 *   Click here
 * </Link>
 *
 * @example
 * // Custom link component from Next.js, wrapping children
 * <Linker CustomLink={NextLink}>
 *   <Link href="/home" newTab>
 *     Go to Home
 *   </Link>
 * </Linker>
 *
 * This component is often used in conjunction with the `Linker` HOC to specify a custom link component, allowing for integration with routing libraries like Next.js.
 */

export const Link = React.memo(({
  href,
  newTab,
  linkComponent,
  children
}: Props) => {

  const LinkComponent = linkComponent

  return (<>
    {
      linkComponent
          // @ts-ignore
        ? <LinkComponent />
        : <S.Link 
            href={href} 
            target={newTab ? '_blank' : '_self'}
          >
            {
              children
            }
          </S.Link>
    }
  </>)
})

const S = {
  Link: React.memo(styled.a`
    text-decoration: none;
  `)
}