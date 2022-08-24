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
