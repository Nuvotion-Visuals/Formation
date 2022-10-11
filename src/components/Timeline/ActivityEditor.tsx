import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DateTimeFormatter, ZonedDateTime, LocalTime, Duration } from '@js-joda/core'
import '@js-joda/timezone'
import { Locale } from '@js-joda/locale_en-us'
import { ActivityType, AreaType } from 'types'

import { TextInput, TimePicker, Box, Button } from '../../internal'

interface Props {
  value: any,
  onChange: Function,
  activity: ActivityType,
  activeAreaIndex: number
}

export const ActivityEditor = ({ value, onChange, activity, activeAreaIndex }: Props) => {
  const [parsedStartTime, set_parsedStartTime] = useState<string>()
  const [parsedEndTime, set_parsedEndTime] = useState<string>()
  const [title, set_title] = useState<string>()
  const [id, set_id] = useState<string>('')

  useEffect(() => console.log(id, 'ID'), [id])

  useEffect(() => {
    const startTime = activity?.startTime
    const endTime = activity?.endTime
    if (startTime !== undefined && endTime !== undefined){
      set_parsedStartTime(isoToSimpleTime(startTime))
      set_parsedEndTime(isoToSimpleTime(endTime))
    }
    set_id(activity?.id)
    set_title(activity?.title)
  }, [activity])

  const isoToSimpleTime = (time: string): string => {
    // takes a full ISO 8601 string and returns HH:MM am/pm strin
    let a = ZonedDateTime.parse(time)
    let parsedStartTime = a.format(DateTimeFormatter.ofPattern('KK:mma').withLocale(Locale.ENGLISH))
    return parsedStartTime
  }

  const parseLocalTime = (time: string) => {
    if (time.includes('A')) {
      let newMorningTime = time.slice(0, -2)

      if (parseInt(time) < 10) {
        return `0${newMorningTime}`
      } else {
        return newMorningTime
      }

    } else {
      let newEveningTime = time.slice(0, -2).trim()

      if (newEveningTime.charAt(0) === '0') {
        let parsedEveningTime = LocalTime.parse(`${newEveningTime}`)
        let newTime = parsedEveningTime.plus(Duration.ofHours(12)).toString()

        return newTime

      } else if (newEveningTime.charAt(1) === ':') {

        let parsedEveningTime = LocalTime.parse(`0${newEveningTime}`)
        let newTime = parsedEveningTime.plus(Duration.ofHours(12)).toString()

        return newTime
      }
        let parsedEveningTime = LocalTime.parse(newEveningTime)
        let newTime = parsedEveningTime.plus(Duration.ofHours(12)).toString()
      
      return newTime
    }
    
  }

  const simpleToIsoTime = (time: string, value: any): string => {
    // repopulate prefix and postfix data for string parsing
    const { startTime } = value[activeAreaIndex]?.activities[0]
    const b = ZonedDateTime.parse(startTime)
    const datePrefix = b.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))
    const offSet = b.format(DateTimeFormatter.ofPattern('x:00'))
    const timeZone = b.format(DateTimeFormatter.ofPattern('VV'))

    // takes HH:MM am/pm and returns Zoned Date Time string
    if (time === undefined && value === undefined) {
      return ''
    } else {
      let newTime: string = parseLocalTime(time)

      // recover full ISO data, then destructure datePrefix, offSet and timeZone
      const parsedTime: string = ZonedDateTime.parse(`${datePrefix}T${newTime.trim()}:00.000${offSet}[${timeZone}]`, DateTimeFormatter.ISO_ZONED_DATE_TIME).toString()

      return parsedTime
    }
  }

  const handleSubmit = (e: React.FormEvent, value: AreaType[]) => {
    e.preventDefault()

    if (parsedStartTime !== undefined && parsedEndTime !== undefined) {
      let updatedActivity: ActivityType = {
        title: title ? title : '',
        startTime: simpleToIsoTime(parsedStartTime, value),
        endTime: simpleToIsoTime(parsedEndTime, value),
        id: id,
        people: [
        ],
      }

      let newData = value.map((area, index) => {
        if (index === activeAreaIndex) {
          let newArea: AreaType = area
          let newAreaData = area?.activities.map((activity) => {
            if (activity.id === id) {
              return updatedActivity
            }
            return activity
          })
          // need to return old AND new data
          newArea.activities = newAreaData
          return newArea
        } 
        return area
      })

      console.log(newData, 'new data')
 
      // onChange(newData)
    }
  }

 
  return (
    <S.Form onSubmit={(e) => handleSubmit(e, value)}>
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
