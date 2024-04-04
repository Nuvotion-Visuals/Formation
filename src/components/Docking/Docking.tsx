import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { insertCSS } from '../../internal'
import { dockingStyles } from './styles'
import isEqual from 'rc-util/lib/isEqual'

interface Props {
  config: any,
  onLayoutReady: (layoutManager: any) => void,
  onChange: (newContent: any) => void
}

/**
 * The `Docking` component enables the creation of a dynamic, customizable layout within an application. It allows users to
 * rearrange panels as needed, making it suitable for environments where flexibility and adaptability are key, such as in
 * dashboard applications or customizable editors. The component initializes with a configuration (`config`), and provides
 * hooks (`onLayoutReady`, `onChange`) to manage and respond to layout changes. This component is ideal for creating a
 * user-defined workspace that can adapt to various content types and workflows.
 *
 * @component
 * @param {object} config - Defines the initial layout of panels, including their arrangement and behavior.
 * @param {function} onLayoutReady - Called when the layout is fully initialized, with the layout manager passed as an argument.
 * @param {function} onChange - Invoked when the layout changes, with the new layout state as an argument.
 *
 * @example
 * const panelConfig = {
 *   content: [{
 *     type: 'row',
 *     content: [{
 *       type: 'component',
 *       componentName: 'exampleComponent',
 *       title: 'Panel Title',
 *       isClosable: true,
 *       componentState: { label: 'Panel Content' }
 *     }]
 *   }]
 * };
 *
 * <Docking
 *   config={panelConfig}
 *   onLayoutReady={(layoutManager) => console.log('Layout Ready', layoutManager)}
 *   onChange={(newContent) => console.log('Layout Changed', newContent)}
 * />
 */
export const Docking = ({
  config,
  onLayoutReady,
  onChange
}: Props) => {
  const [layoutManager, setLayoutManager] = useState<any>({})
  const [DynamicComponent, setDynamicComponent] = useState<React.FC<any> | null>(null)
  const prevStateRef = useRef()

  useEffect(() => {
    if (layoutManager?.root?.contentItems) {
      onLayoutReady(layoutManager)
    }
  }, [layoutManager, onLayoutReady])

  useEffect(() => {
    if (layoutManager?.root) {
      const handleStateChange = () => {
        const newState = layoutManager.toConfig()
        if (newState?.content && !isEqual(prevStateRef.current, newState.content)) {
          onChange(newState.content)
          prevStateRef.current = newState.content
        }
      }

      layoutManager.root.on('stateChanged', handleStateChange)
      return () => layoutManager.root.off('stateChanged', handleStateChange)
    }
  }, [layoutManager, onChange])

  useEffect(() => {
    (async () => {
      const componentModule = require('./src')
      setDynamicComponent(() => componentModule.GoldenLayoutComponent)
    })()
  }, [config])

  useEffect(() => {
    insertCSS(dockingStyles)
  }, [])

  return (
    <S.DockingContainer>
      {
        DynamicComponent && 
          <DynamicComponent
            config={config}
            autoresize={true}
            debounceResize={100}
            onLayoutReady={setLayoutManager}
          />
      }
    </S.DockingContainer>
  )
}

const S = {
  DockingContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  `
}