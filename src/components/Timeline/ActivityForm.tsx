import styled from 'styled-components'
import React, { useState } from 'react'

import { ActivityType } from './Timeline.stories'

import { Box, DateAndTimePicker, Select, TextInput } from '../../internal'

interface Props {
  activity: ActivityType | null,
  areas: string[]
}

export const ActivityForm = ({ activity, areas }: Props) => {

  const [area, set_area] = useState<string>('')
  
  let dateTimePickerValue = [{
    startTime: '',
    endTime: '',
    date: ''}
  ]
  
  return (
    <S.Container>
      <>
          <Box mb={2}>
            <TextInput value={activity !== null ? activity.title : ''} />
          </Box>
          <DateAndTimePicker
            onChange={() => null}
            value={dateTimePickerValue}
          />
          <Box mt={2}>
            <Select
              options={areas}
              value={activity !== null ? activity.area : areas[0]}
              onChange={() => null}
            />
          </Box>
          </>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    height: 100%;
    width: 100%;
  `,
  Form: styled.div`
    
  `
}
