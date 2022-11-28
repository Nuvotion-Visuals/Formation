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
  const [dataError, set_dataError] = useState<boolean>(false)
  const [isUserNotified, set_isUserNotified] = useState<boolean>(false)


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
    // takes a full ISO 8601 string and returns HH:MM am/pm string
    let a = ZonedDateTime.parse(time)
    let parsedTime = a.format(DateTimeFormatter.ofPattern('KK:mma').withLocale(Locale.ENGLISH))
    return parsedTime
  }

  const isoToInteger = (time: string): number => {
    let d = ZonedDateTime.parse(time)
    let parsedTime = parseInt(d.format(DateTimeFormatter.ofPattern('KKmm')))
    return parsedTime
  }

  const simpleToIsoTime = (time: string): string => {
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

  const handleSubmit = (e: React.FormEvent, value: AreaType[]) => {
    let isoStartTime = parsedStartTime === undefined ? '' : simpleToIsoTime(parsedStartTime)
    let isoEndTime = parsedEndTime === undefined ? '' : simpleToIsoTime(parsedEndTime)
    let startTime = isoToInteger(isoStartTime)
    let endTime = isoToInteger(isoEndTime)


    const isDataPresent = parsedStartTime !== undefined && parsedEndTime !== undefined
    const isTimespan =
      isDataPresent 
        ? parsedStartTime === parsedEndTime
          ? false
          : true
        : false
    const isEndTimeValid =
      isDataPresent 
        ? startTime < endTime
          ? true
          : false
        : false


    if (!isDataPresent || !isTimespan ) {
      set_dataError(true)
      return
    } else if (!isEndTimeValid) {
      set_dataError(true)
    }
    else if (isDataPresent && isTimespan && isEndTimeValid) {
      set_dataError(false)
      let updatedActivity: ActivityType = {
        title: title ? title : '',
        startTime: simpleToIsoTime(parsedStartTime),
        endTime: simpleToIsoTime(parsedEndTime),
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
          newArea.activities = newAreaData
          return newArea
        } 
        return area
      })
      onChange(newData)
      set_parsedStartTime('')
      set_parsedEndTime('')
      set_title('')

    }
  }

  const handleRemove = (value: AreaType[]) => {
    set_parsedStartTime('')
    set_parsedEndTime('')
    set_isUserNotified(false)
    
    let newData = value?.map((area, index) => {
      if (index === activeAreaIndex) {
        let newArea: AreaType = area
        let newAreaData = newArea?.activities.filter((activity) => {
          if (activity.id !== id) {
            return activity
          }
        })
        newArea.activities = newAreaData
        return newArea
      } 
      return area
    })

    onChange(newData)
  }

  return (
    <S.Form >
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
          {
            isUserNotified
              ? <Button text={'Delete'} background={'var(--F_Warning_Red)'} onClick={() => handleRemove(value)} onBlur={() => set_isUserNotified(false)}/>
              : <Button text={'Delete'} onClick={() => set_isUserNotified(true)} />
          }
        </Box>
        <Box p={1}>
          <Button text={'Save'} primary onClick={(e: React.FormEvent) => handleSubmit(e, value)} />
        </Box>
      </Box>
      <S.Error dataError={dataError}>
        <div>There was an error.</div>
        <ul>
          <li>- Check if all fields are filled</li>
          <li>- Make sure the end time is after the start time</li>
        </ul>
      </S.Error>
    </S.Form>
  )
}

const S = {
  Form: styled.div<{}>`
    width: 100%;
    max-width: 400px;
  `,
  Error: styled.div<{
    dataError: boolean
  }>`
    display: ${props => props.dataError ? 'block' : 'none'};
    padding: 1rem;

    div{
      padding-bottom: 1.5rem;
      font-weight: 600;
    }

    li{
      margin-bottom: 1rem;
      margin-left: 1rem;
    }
  `
}
