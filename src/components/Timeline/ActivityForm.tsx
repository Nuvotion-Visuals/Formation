import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

import { ActivityType, areaIdType } from './Timeline.stories'

import { Box, Button, DateAndTimePicker, Select, TextInput } from '../../internal'
import { DateTimeFormatter, LocalDate, LocalDateTime, LocalTime, ZonedDateTime, ZoneId } from '@js-joda/core'
import { Locale } from '@js-joda/locale_en-us'

interface Props {
  activity: ActivityType | null,
  areas: areaIdType[],
  onChange: (newValue: ActivityType) => void,
}

export const ActivityForm = ({ activity, areas, onChange }: Props) => {

  const formatTimeZoneString = (time: string | undefined) => {
    if(activity == undefined){
      return
    }
    if (time == undefined){
      const zoneId = ZoneId.of(ZoneId.systemDefault().id());
      const zonedDateTime = ZonedDateTime.now(zoneId);
      const offset = zonedDateTime.offset();

      return offset.toString();
    }
      let timeZone: string = activity.startTime

      return timeZone.slice(-6)
  }

  const formatTimeString = (time: string | undefined) => {
    if (time == undefined) {
      return '12:00 PM'
    }
    let timeObject = ZonedDateTime.parse(time)
    let formatter = DateTimeFormatter.ofPattern('hh:mm a').withLocale(Locale.US)
    let formattedString: string = timeObject.format(formatter)
    
    return formattedString
  }

  const formatDateString = (time: string | undefined) => {
    if (time == undefined) {
      let todayDateObject = ZonedDateTime.now()
      let formatter = DateTimeFormatter.ofPattern('M/d/y')
      let formattedString: string = todayDateObject.format(formatter)

      return formattedString
    }
      let dateObject = ZonedDateTime.parse(time)
      let formatter = DateTimeFormatter.ofPattern('M/d/y')
      let formattedString: string = dateObject.format(formatter)

      return formattedString
  }

  const convertTo24Hours = (timeString: string) => {
    let timeArr = timeString.split(':');
    let hours = timeArr[0];
    let minutes = timeArr[1].substring(0, 2);
    let ampm = timeArr[1].substring(2).trim();
    if (ampm === 'PM' && hours !== '12') {
      hours = (parseInt(hours) + 12).toString();
    } else if (ampm === 'AM' && hours === '12') {
      hours = '00';
    }
    return hours + ':' + minutes;
  }

  const combineSplitDateTimeString = (time: string, date: string) => {    
    let dateFormatter = DateTimeFormatter.ofPattern('M/d/yyyy');
    let dateString = LocalDate.parse(date, dateFormatter).toString()

    let newTimeString = convertTo24Hours(time)
    let newTimeZone = formatTimeZoneString(activity?.startTime)

    return `${dateString}T${newTimeString}${newTimeZone}`
  }

  const selectionList = areas.map((area) => area.area)

  const [area, set_area] = useState<string | undefined>(activity == undefined ? areas[0].area : activity.area)
  const [areaId, set_areaId] = useState<string | undefined>(activity == undefined ? areas[0].areaId : activity.areaId)

  const [title, set_title] = useState<string | undefined>(activity !== undefined ? activity?.title : '')
  const [dateTimeValue, set_dateTimeValue] = useState([{
    startTime: formatTimeString(activity?.startTime),
    endTime: formatTimeString(activity?.endTime),
    date: formatDateString(activity?.startTime)}
  ])

  useEffect(() => {
    let idMatch = areas.filter(item => item.area === area)
    set_areaId(idMatch[0].areaId)
    console.log(idMatch[0].areaId, 'idMatch')
  }, [area])

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()

    let startTime = combineSplitDateTimeString(dateTimeValue[0].startTime, dateTimeValue[0].date)
    let endTime = combineSplitDateTimeString(dateTimeValue[0].endTime, dateTimeValue[0].date)
    

    let newValue: ActivityType = {
      title: title !== undefined ? title : '',
      startTime: startTime,
      endTime: endTime,
      id: activity?.id !== undefined ? activity?.id : '',
      area: area !== undefined ? area : '',
      areaId: areaId !== undefined ? areaId : '',
      people: activity?.people !== undefined ? activity.people : [],
      overflowLane: 1
    }

    console.log(newValue, 'newValue')

    onChange(newValue)
  }
  
  return (
    <S.Container>
        <Box mb={2}>
          <TextInput 
            value={title !== undefined ? title : ''} 
            onChange={(newValue) => set_title(newValue)} 
            label={'Title'} 
          />
        </Box>
        <DateAndTimePicker
          iconPrefix='fas'
          onChange={result => { set_dateTimeValue(result)}}
          value={dateTimeValue}
        />
        <Box mt={2} mb={4}>
          <Select
            options={selectionList}
            value={area !== undefined ? area : areas[0].area}
            onChange={newValue => set_area(newValue)}
          />
      </Box>
      <Button
        text='Save'
        primary={true}
        expand={true}
        onClick={(e: React.MouseEvent) => onClick(e)}
      />
    </S.Container>
  )
}

const S = {
  Container: styled.form`
    height: calc(100% - 4rem);
    width: 100%;
    position: relative;
  `,
}
