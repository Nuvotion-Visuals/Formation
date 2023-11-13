import React from 'react'

import { StyleHTML, markdownToHTML } from '../../internal'

interface Props {
  markdownString?: string,
  htmlString?: string,
  children?: React.ReactNode
}

/**
 * `Article` is a component designed for displaying content in web applications, 
 * commonly used for rendering rich text content fetched from a CMS API. 
 * It accepts either a Markdown string, which it converts to HTML, or a raw HTML string. 
 * Additionally, it can render children components directly, allowing for flexible content composition.
 * This makes it suitable for articles, blogs, or other formatted text displays.
 *
 * @component
 * @param {string} [markdownString] - Optional Markdown string to be converted and displayed.
 * @param {string} [htmlString] - Optional raw HTML string to be displayed.
 * @param {React.ReactNode} [children] - Optional children to be rendered directly within the component.
 */
export const Article = ({ markdownString, htmlString, children }: Props) => {
  return (
    <StyleHTML>
      <div 
        dangerouslySetInnerHTML={{
          __html: htmlString
            ? htmlString
            : markdownString
              ? markdownToHTML(markdownString)
              : ''
        }}
      />
      {children}
    </StyleHTML>
  )
}
