import { cloneDeep } from 'lodash'

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

const cleanComponentIds = (content: any): any => {
  if (Array.isArray(content)) {
    return content.map(item => cleanComponentIds(item))
  }
  else if (content.type === 'component') {
    const underscoreIndex = content.component.indexOf('_')
    if (underscoreIndex !== -1) {
      return {
        ...content,
        component: content.component.substring(0, underscoreIndex)
      }
    }
    else {
      return content
    }
  }
  else if (['stack', 'row', 'column'].includes(content.type)) {
    return {
      ...content,
      content: cleanComponentIds(content.content)
    }
  }
  else {
    return content
  }
}

export const getCurrentLayout = (layoutManager: any, ) => {
  if (layoutManager?.root) {
    const newState = layoutManager.toConfig()
    return cleanComponentIds(newState.content)
  }
}

export const togglePanel = (currentContent: any, panelName: string) => {
  let newContent = cloneDeep(currentContent)
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

export const getPanelTitles = (content: any[]): string[] => {
  const panelTitles: string[] = []

  const extractPanelTitles = (items: any[]) => {
    items.forEach(item => {
      if (item.title) {
        panelTitles.push(item.title)
      }
      if (item.content && Array.isArray(item.content)) {
        extractPanelTitles(item.content)
      }
    })
  }

  extractPanelTitles(content)
  return panelTitles
}

type LayoutItem = {
  type: string
  title?: string
  content?: LayoutItem[]
  activeItemIndex?: number
}

export const getVisiblePanels = (layout: LayoutItem[]): string[] => {
  const titles: string[] = []

  const traverse = (items: LayoutItem[]) => {
    items.forEach(item => {
      if (item.type === 'stack' && item.activeItemIndex !== undefined && item.content) {
        const activeItem = item.content[item.activeItemIndex]
        if (activeItem && 'title' in activeItem && activeItem.title) {
          titles.push(activeItem.title)
        }
      }
      if (item.content) {
        traverse(item.content)
      }
    })
  }

  traverse(layout)
  return titles
}