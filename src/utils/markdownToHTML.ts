import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import showdown from 'showdown'
const converter = new showdown.Converter()
/**
 * Converts markdown to html and sanitize it 
 * 
 * @param {string} markdown 
 * @returns {string} html
 * 
 * @example
 * // returns html
 * markdownToHTML("# Hello World")
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