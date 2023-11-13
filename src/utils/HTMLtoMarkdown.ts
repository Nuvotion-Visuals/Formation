import TurndownService from 'turndown'

const turndownService = new TurndownService()

/**
 * @function HTMLtoMarkdown
 * 
 * This function converts HTML content to Markdown format.
 * It uses TurndownService, an HTML to Markdown converter, for this task.
 * 
 * @param {string} html - The HTML content to be converted.
 * 
 * @returns {string} The converted content in Markdown format.
 * 
 * @throws Will throw an error if TurndownService fails to convert the HTML.
 * 
 * @example
 * HTMLtoMarkdown("<p>Hello, World!</p>") // Output: "Hello, World!"
 */
export const HTMLtoMarkdown = (html: string) => 
  turndownService.turndown(html)
