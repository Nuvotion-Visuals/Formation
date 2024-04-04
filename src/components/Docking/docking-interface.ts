export const setActivePanelByTitle = (layoutManager: any, title: string) => {
  const findContentItem = (items: any): any | null => {
    for (const item of items) {
      if (item.config && item.config.title === title) {
        return item
      }
      if (item.contentItems && item.contentItems.length) {
        const found = findContentItem(item.contentItems)
        if (found) {
          return found
        }
      }
    }
    return null
  }
  const contentItem = findContentItem(layoutManager.root.contentItems)
  if (contentItem && contentItem.parent.isStack) {
    contentItem.parent.setActiveContentItem(contentItem)
  }
}

export const getCurrentLayout = (layoutManager: any, ) => {
  if (layoutManager?.root) {
    const newState = layoutManager.toConfig()
    return newState.content
  }
}

export const getTitles = (content: any[]): string[] => {
  const titles: string[] = []

  const extractTitles = (items: any[]) => {
    items.forEach(item => {
      if (item.title) {
        titles.push(item.title)
      }
      if (item.content && Array.isArray(item.content)) {
        extractTitles(item.content)
      }
    })
  }

  extractTitles(content)
  return titles
}