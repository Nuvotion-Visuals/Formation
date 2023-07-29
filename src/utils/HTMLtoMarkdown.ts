import TurndownService from 'turndown'

const turndownService = new TurndownService()

export const HTMLtoMarkdown = (html: string) => 
  turndownService.turndown(html)
