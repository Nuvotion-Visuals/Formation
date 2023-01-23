import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

import { ActivityType, areaIdType } from './Timeline.stories'

import { Box, Button, DateAndTimePicker, Select, TextInput, LabelColorPicker } from '../../internal'
import { TimeZone } from '../../internal'

import { DatesAndTimes } from 'components/DateAndTimePicker/DateAndTimePicker'


import { DateTimeFormatter, LocalDate, ZonedDateTime, ZoneId } from '@js-joda/core'
import { Locale } from '@js-joda/locale_en-us'

interface Props {
  activity: ActivityType | null,
  areas: areaIdType[],
  onChange: (newValue: ActivityType) => void,
  isOpen?: boolean
}

export const ActivityForm = ({ activity, areas, onChange, isOpen }: Props) => {

  const formatIncomingDateString = (date: Date): string => {
    const offset = date.getTimezoneOffset();
    const offsetSign = offset < 0 ? '+' : '-';
    const offsetHours = `0${Math.floor(Math.abs(offset) / 60)}`.slice(-2);
    const offsetMinutes = `0${Math.abs(offset) % 60}`.slice(-2);
    const offsetStr = `${offsetSign}${offsetHours}:${offsetMinutes}`;
    const formattedDate = `${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCFullYear()}T${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}${offsetStr}`;


    console.log(formattedDate, 'formattedDate')
    return formattedDate
  }

  const formatTimeZoneString = (time: string | undefined) => {
    if(activity == undefined){
      return '-06:00'
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

  const formatUTCString = (time: string | undefined) => {
    if (time == undefined) {
      let todayDateObject = ZonedDateTime.now()
      let formatter = DateTimeFormatter.ofPattern('M/d/y')
      let formattedString: string = todayDateObject.format(formatter)

      return formattedString
    }
      // let dateObject = ZonedDateTime.parse(time)
      // let formatter = DateTimeFormatter.ofPattern('M/d/y')
    let dateStamp = Date.parse(time)
    let dateObject = new Date(dateStamp)

    let formattedString = dateObject.toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" })
    
    console.log(formattedString, 'formattedString')
    

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

    let newTimeString = convertTo24Hours(time)
    let newTimeZone = formatTimeZoneString(activity?.startTime)
    // needs to understand what kind of string it is dealing with... from js-joda or date
    if (/^\d/.test(date)) {
      // process code for when string begins with a number
      let dateFormatter = DateTimeFormatter.ofPattern('M/d/yyyy');
      let dateString = LocalDate.parse(date, dateFormatter).toString()
  
      return `${dateString}T${newTimeString}${newTimeZone}`
    } else {
      // process code for when string begins with a character
      let dateStamp = Date.parse(date);
      let dateObject = new Date(dateStamp);

      let formattedString = dateObject.toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" });

      let dateArray = formattedString.split("/");
      let month = dateArray[0].length === 1 ? `0${dateArray[0]}` : dateArray[0];

      let newDate = `${dateArray[2]}-${month}-${dateArray[1]}`

      
      
      console.log(newDate, 'newDate')

      return `${newDate}T${newTimeString}${newTimeZone}`;
    }

    
  }

  const generateUUID = () => { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  
  

  const selectionList = areas.map((area) => area.area)

  const [area, set_area] = useState<string | undefined>()
  const [areaId, set_areaId] = useState<string | undefined>()
  const [areaColor, set_areaColor] = useState<string | undefined>()
  const [title, set_title] = useState<string | undefined>()
  const [dateTimeValue, set_dateTimeValue] = useState([{
    startTime: formatTimeString(activity?.startTime),
    endTime: formatTimeString(activity?.endTime),
    date: '',
    timeZone: activity?.startTime !== undefined ? formatTimeZoneString(activity?.startTime) : '-06:00'
  }
])

  useEffect(() => {
    set_area(activity == undefined ? areas[0].area : activity.area)
    set_areaId(activity == undefined ? areas[0].areaId : activity.areaId)
    set_areaColor(color => undefined ? areas[0].areaColor : '')
    set_title(activity !== undefined ? activity?.title : '')
    set_dateTimeValue([{
      startTime: formatTimeString(activity?.startTime),
      endTime: formatTimeString(activity?.endTime),
      date: formatUTCString(activity?.startTime),
      timeZone: activity?.startTime !== undefined ? formatTimeZoneString(activity?.startTime) : '-06:00'
    }
  ])
  }, [activity])

  useEffect(() => console.log(dateTimeValue, 'dateTimeValue'), [dateTimeValue])

  useEffect(() => {
    let idMatch = areas.filter(item => item.area === area)
    set_areaId(idMatch[0]?.areaId)
    console.log(idMatch[0]?.areaId, 'idMatch')
  }, [area])

  const onClick = (e: React.MouseEvent) => {
    if(e.target instanceof HTMLButtonElement && e.target.name !== 'remove'){
      let startTime = combineSplitDateTimeString(dateTimeValue[0].startTime, dateTimeValue[0].date)
      let endTime = combineSplitDateTimeString(dateTimeValue[0].endTime, dateTimeValue[0].date)
      

      let newValue: ActivityType = {
        title: title !== undefined ? title : '',
        startTime: startTime,
        endTime: endTime,
        id: activity?.id !== undefined ? activity?.id : generateUUID(),
        area: area !== undefined ? area : '',
        areaId: areaId !== undefined ? areaId : '',
        people: activity?.people !== undefined ? activity.people : [],
        overflowLane: 1
      }

      onChange(newValue)
      
    } else if (e.target instanceof HTMLButtonElement && e.target.name == 'remove'){

      let newValue: ActivityType = {
        title: '%%REMOVE%%',
        startTime: '',
        endTime: '',
        id: activity?.id ? activity?.id : '',
        area: '',
        areaId: activity?.areaId ? activity?.areaId : '',
        people: [],
        overflowLane: 1
      }

      onChange(newValue)
    }


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
          onChange={result => {set_dateTimeValue(result)}}
          value={dateTimeValue}
          isMultiDay={false}
        />
        <Box mt={2} mb={4}>
          <Select
            options={selectionList}
            value={area !== undefined ? area : areas[0].area}
            onChange={newValue => set_area(newValue)}
            iconPrefix='fas'
          />
      </Box>
      <LabelColorPicker
        options={[
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'indigo',
          'violet',
          'pink',
          'cyan',
          'teal',
          'gray'
        ]}
        label='Label color'
        value={'gray'}
        onChange={() => null}
      />
      <Box mb={.5}>
        <Button
          text='Save'
          primary={true}
          expand={true}
          onClick={(e: React.MouseEvent) => onClick(e)}
        />
      </Box>
      <Box>
        <Button
          text='Remove'
          name={'remove'}
          primary={false}
          expand={true}
          secondary
          onClick={(e: React.MouseEvent) => onClick(e)}
        />
      </Box>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    height: calc(100% - 4rem);
    width: 100%;
    position: relative;
  `
}
