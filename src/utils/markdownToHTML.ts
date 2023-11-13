import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import showdown from 'showdown'
const converter = new showdown.Converter()
/**
 * @function markdownToHTML
 * 
 * This function converts markdown to sanitized HTML string. It uses libraries 'marked' for markdown to HTML conversion 
 * and 'DOMPurify' to sanitize the HTML string generated.
 * This approach helps in rendering user supplied content (e.g., comments, posts in a forum, etc.) where markdown is 
 * used safely.
 *
 * @param {string} markdown - The markdown string to be converted to HTML.
 * 
 * @returns {string} The sanitized HTML string obtained from the markdown.
 * 
 * @example
 * const markdownString = "#Hello World"
 * const htmlString = markdownToHTML(markdownString); // Returns '<h1 id="HelloWorld">Hello World</h1>'
 */
export const markdownToHTML = (markdown: string ) => {
    //convert markdown to html using showdown library
    const html = converter.makeHtml(markdown)
    //sanitize the html using DOMPurify
    return DOMPurify.sanitize(marked(html), {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
    });
}