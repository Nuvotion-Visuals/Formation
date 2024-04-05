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

export const togglePanel = (currentContent: any, panelName: string) => {
  let newContent = [...currentContent]
  const panelExists = (items: any[]): boolean => items.some(item => {
    if (item.title === panelName) {
      return true
    }
    if (item.content && Array.isArray(item.content)) {
      return panelExists(item.content)
    }
    return false
  })

  const removePanel = (items: any[]): any[] => items.reduce((acc, item) => {
    if (item.title === panelName) {
      return acc
    }
    if (item.content && Array.isArray(item.content)) {
      const filteredContent = removePanel(item.content)
      if (item.type === 'stack' && filteredContent.length === 0) {
        return acc
      }
      item = { ...item, content: filteredContent }
    }
    acc.push(item)
    return acc
  }, [])

  const findFinalStack = (content: any[]): any => {
    let finalStack = null
    for (const item of content) {
      if (item.type === 'stack') {
        finalStack = item
      } 
      else if (item.content && Array.isArray(item.content)) {
        const nestedStack = findFinalStack(item.content)
        if (nestedStack) {
          finalStack = nestedStack
        }
      }
    }
    return finalStack
  }

  const addPanel = (): any[] => {
    const finalStack = findFinalStack(newContent)
    if (finalStack) {
      finalStack.content.push({
        component: 'placeholder', 
        title: panelName,
        type: 'component',
        componentName: 'lm-react-component',
        isClosable: true,
        reorderEnabled: true,
        height: 100,
        width: 100
      })
    } 
    return newContent
  }
  if (panelExists(newContent)) {
    newContent = removePanel(newContent)
  } 
  else {
    newContent = addPanel()
  }
  return newContent
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

