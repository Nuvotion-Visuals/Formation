import { parse } from '@babel/core'
import { values } from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ActivityType, AreaType } from 'types'

import { TextInput, TimePicker, Box, Button } from '../../internal'

interface Props {
  value: any,
  onChange: Function,
  activity: ActivityType
}

export const ActivityEditor = ({ value, onChange, activity }: Props) => {
  const [parsedStartTime, set_parsedStartTime] = useState<string>()
  const [parsedEndTime, set_parsedEndTime] = useState<string>()
  const [title, set_title] = useState<string>()

  // parse startTime and endTime <string> for use with the TimePicker component
  useEffect(() => {
    const startTime = activity?.startTime
    const endTime = activity?.endTime

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
    
    set_title(activity?.title)
  }, [activity])

  // parse startTime and endTime for use with Acitivity data structure
  useEffect(() => {

  }, [title, parsedStartTime, parsedEndTime])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let currentData: AreaType[] = value
    let updatedActivity: ActivityType = {
      title: title ? title : '',
      startTime: parsedStartTime ? parsedStartTime : 0,
      endTime: parsedEndTime ? parsedEndTime : 0,
      id: '10',
      people: [
      ],
    }
    
    onChange()
    console.log(title, parsedStartTime, parsedEndTime)
  }

 
  return (
    <S.Form onSubmit={(e) => handleSubmit(e)}>
      <Box p={1}>
        <TextInput
          value={title ? title : ''}
          label={'Title'}
          onChange={(value) => set_title(value)}
        />
      </Box>
      <Box p={1}> 
        <TimePicker
          value={parsedStartTime ? (parsedStartTime) : ''}
          label={'Start Time'}
          onChange={(value) => set_parsedStartTime(value)}
        />
      </Box>
      <Box p={1}>
        <TimePicker
          value={parsedEndTime ? (parsedEndTime) : ''}
          label={'End Time'}
          onChange={(value) => set_parsedEndTime(value)}
        />
      </Box>
      <Box p={1}>
        <Box p={1}>
          <Button text={'Clear'} />
        </Box>
        <Box p={1}>
          <Button text={'Save'} primary submit/>
        </Box>
      </Box>
    </S.Form>
  )
}

const S = {
  Form: styled.form<{}>`
    width: 100%;
    max-width: 400px;
    height: 100vh;
    position: sticky;
    top: 0;
  `
}
