import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import '@js-joda/timezone'
import { AreaType } from 'types'
import { Lane } from './Lane'

interface Props {
  value: AreaType[],
  
}


export const Timeline = ({value}: Props) => {

  

  return (
    <S.TimelineContainer>
          {/* <TimeReference /> COMING SOON!!!! */}
      {
        value?.map((item) => {
          return (
              <Lane 
                value={item.activities}
                onChange={(newValue) => set_value(newValue)} 
                onIntervalClick={(interval) => onIntervalClick(interval)}
                onItemClick={(e: MouseEvent) => onItemClick(e)}
            />
          )
        })
      }
    </S.TimelineContainer>
  )
}

const S = {
  TimelineContainer: styled.div<{}>`
    display: flex;
    flex-direction: row;
  `,
}
