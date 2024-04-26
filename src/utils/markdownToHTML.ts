import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

const renderer = new marked.Renderer()

// Override the way 'list' is handled by 'marked'
renderer.list = (body, ordered) => {
  const type = ordered ? 'ol' : 'ul'
  return `<${type}>${body}</${type}>`
}

// Override listitem rendering
renderer.listitem = (text) => {
  // Directly return the list item without paragraph tags or additional spaces
  return `<li>${text}</li>`
}

// Set options with the custom renderer
marked.setOptions({
  renderer,
  gfm: true,
  breaks: false,
  smartLists: true,
  xhtml: true
})

/**
 * @function markdownToHTML
 * 
 * This function converts markdown to sanitized HTML string. It uses the library 'marked' for markdown to HTML conversion 
 * and 'DOMPurify' to sanitize the HTML string generated. This approach helps in rendering user supplied content
 * (e.g., comments, posts in a forum, etc.) where markdown is used safely.
 *
 * @param {string} markdown - The markdown string to be converted to HTML.
 * 
 * @returns {string} The sanitized HTML string obtained from the markdown.
 * 
 * @example
 * const markdownString = "# Hello World"
 * const htmlString = markdownToHTML(markdownString) // Returns '<h1>Hello World</h1>'
 */
export const markdownToHTML = (markdown: string) => {
  // Convert markdown to HTML using marked library with the custom renderer
  const html = marked(markdown)
  // Sanitize the HTML using DOMPurify
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
  })
}
