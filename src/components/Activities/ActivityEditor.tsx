import { parse } from '@babel/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ActivityType } from 'types'

import { TextInput, TimePicker, Box } from '../../internal'

interface Props {
  value: any,
  onChange: Function,
  activity: ActivityType
}

export const ActivityEditor = ({ value, onChange, activity }: Props) => {
  const [parsedStartTime, set_parsedStartTime] = useState<number>()
  const [parsedEndTime, set_parsedEndTime] = useState()

  useEffect(() => {
    const startTime = activity?.startTime
    const time = startTime / 60
    const afternoonTime = time - 12
    
    startTime > 12
      ? set_parsedStartTime(`${afternoonTime}PM`)
      : set_parsedStartTime(time)
  }, [activity])

  return (
    <S.Form>
      <Box p={1}>
        <TextInput
          value={activity ? activity.title : ''}
          label={'Title'}
        />
      </Box>
      <Box p={1}>
        <TimePicker
          value={parsedStartTime ? (parsedStartTime).toString() : ''}
          label={'Start Time'}
          onChange={() => null}
        />
      </Box>
      <Box p={1}>
        <TimePicker
          value={activity ? (activity.endTime / 60).toString() : ''}
          label={'End Time'}
          onChange={() => null}
        />
      </Box>
    </S.Form>
  )
}

const S = {
  Form: styled.div<{}>`
    width: 100%;
    max-width: 400px;
    height: 100vh;
    position: sticky;
    top: 0;
  `
}
