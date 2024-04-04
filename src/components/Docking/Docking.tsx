import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { insertCSS } from '../../internal'
import { dockingStyles } from './styles'

interface Props {
  config: any,
  onLayoutReady: (layoutManager: any) => void
}

/**
 * `Docking` is a component that enables dynamic and responsive arrangement of panels within an application interface.
 * It allows users to organize their workspace with resizable and movable panels. The `config` object defines the initial state
 * and structure of these panels, dictating how they should be displayed and interacted with upon initialization.
 *
 * @component
 * @param {object} config - The configuration object defining the initial state and layout of the panels.
 *
 * @example
 * // Docking component with a configuration for panel layout
 * const panelConfig = {
 *   content: [{
 *     type: 'row',
 *     content:[{
 *       type: 'component',
 *       componentName: 'exampleComponent',
 *       title: 'Panel Title',
 *       isClosable: true,
 *       componentState: { label: 'Panel Content' }
 *     }]
 *   }]
 * };
 *
 * <Docking config={panelConfig} />
 */
export const Docking = ({
  config,
  onLayoutReady
}: Props) => {
  const [layoutManager, setLayoutManager] = useState<any>({})

  useEffect(() => {
    if (layoutManager?.root?.contentItems) {
      onLayoutReady(layoutManager)
    }
  }, [layoutManager])

  const [content, set_content] = useState(<></>)

  useEffect(() => {
    (async () => {
      insertCSS(dockingStyles)

      const { GoldenLayoutComponent } = require('./src')
      set_content(
        <GoldenLayoutComponent
          config={config}
          autoresize={true}
          debounceResize={100}
          onLayoutReady={setLayoutManager}
        />
      )
    })()
  }, [])

  return (
    <S.DockingContainer>
      {
        content
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