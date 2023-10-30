import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LoadingSpinner } from '../../internal'

interface Props {
  config: any
}

export const Docking = ({
  config
}: Props) => {
  const [layoutManager, setLayoutManager] = useState({})

  const [content, set_content] = useState(<S.LoadingContainer><LoadingSpinner /></S.LoadingContainer>)

  useEffect(() => {
    (async () => {
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
  );
}

const S = {
  DockingContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  `,
  LoadingContainer: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `
}