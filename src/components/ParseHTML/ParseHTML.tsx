import React from 'react'

import { marked } from 'marked'
import ReactHtmlParser from 'react-html-parser'
import DOMPurify from 'isomorphic-dompurify'
import showdown from 'showdown'
const converter = new showdown.Converter()

interface Props {
  html?: string,
  markdown?: string
}

/**
 * This component is designed to parse and sanitize any provided HTML or Markdown strings and display the parsed content correctly on the page.
 * 
 * It uses several libraries to perform these actions:
 * - 'marked' to parse the markdown string into HTML.
 * - 'showdown' to convert the markdown to HTML.
 * - 'DOM Purify' to sanitize the final HTML to prevent any malicious code from running.
 * - 'React HTML Parser' to convert the HTML string into React components so they can be rendered on the page.
 * 
 * @component
 * @param {string} [html] - HTML string to be sanitized and displayed.
 * @param {string} [markdown] - Markdown string to be converted to HTML, sanitized and displayed.
 *
 * @example
 * // Display provided HTML string
 * <ParseHTML html="<h1>This is some HTML</h1>" />
 *
 * @example
 * // Display provided markdown string
 * <ParseHTML markdown="# This is some markdown" />
 */
export const ParseHTML = React.memo(({
  markdown,
  html
}: Props) => {
  const articleContent = DOMPurify.sanitize(
    marked(markdown
      ? converter.makeHtml(markdown)
      : html
        ? html
        : ''
    ), 
    { 
      ADD_TAGS: ['iframe'], 
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] 
    }
  )

  return (<>
    {
      ReactHtmlParser(articleContent)
    }
  </>)
})
