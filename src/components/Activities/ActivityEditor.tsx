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
  const [parsedStartTime, set_parsedStartTime] = useState<string>()
  const [parsedEndTime, set_parsedEndTime] = useState<string>()

  useEffect(() => {
    const startTime = activity?.startTime

    const startHour: number = startTime % 60 > 0
      ? Number((startTime / 60 - 1).toFixed())
      : startTime / 60
    const startAfternoonHour: number = startHour - 12

    const startMinute = startTime % 60 > 0
      ? startTime % 60
      : '00'
    
    startTime > 720
      ? set_parsedStartTime(`${startAfternoonHour}:${startMinute}PM`)
      : set_parsedStartTime(`${startHour}:${startMinute}AM`)
    
      const endTime = activity?.endTime

      const endHour: number = endTime % 60 > 0
        ? Number((endTime / 60 - 1).toFixed())
        : endTime / 60
      const endAfternoonHour: number = endHour - 12
  
      const endMinute = endTime % 60 > 0
        ? endTime % 60
        : '00'
      
      endTime > 720
        ? set_parsedEndTime(`${endAfternoonHour}:${endMinute}PM`)
        : set_parsedEndTime(`${endHour}:${endMinute}AM`)
    
    
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
          value={parsedEndTime ? (parsedEndTime).toString() : ''}
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
