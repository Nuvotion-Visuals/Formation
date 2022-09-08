import React, { useState } from 'react'
import styled from 'styled-components'

import { GoldenLayoutComponent } from '@annotationhub/react-golden-layout'

interface Props {
  config: any
}

export const Docking = ({
  config
}: Props) => {
  const [layoutManager, setLayoutManager] = useState({});

  return (
    <S.DockingContainer>
      <GoldenLayoutComponent
        // (Required) Golden Layout Config. (See http://golden-layout.com/docs/Config.html)
        config={config}
        autoresize={true}
        debounceResize={100}
        onLayoutReady={setLayoutManager}
      />
    </S.DockingContainer>
  );
}

const S = {
  DockingContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
  `
}