import styled from 'styled-components'
import React from 'react'

import { ActivityType } from './Timeline.stories'

interface Props {
   activity: ActivityType | null
}

export const ActivityForm = ({activity}: Props) => {
  return (
    <S.Container>
      {activity !== null
        ? activity.title
        : <></>}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    height: 100%;
    width: 100%;
  `
}
