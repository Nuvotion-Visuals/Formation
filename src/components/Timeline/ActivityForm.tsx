import styled from 'styled-components'
import React, { useState } from 'react'

import { ActivityType } from './Timeline.stories'

import { Box, Button, DateAndTimePicker, Select, TextInput } from '../../internal'
import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core'
import { Locale } from '@js-joda/locale_en-us'

interface Props {
  activity: ActivityType | null,
  areas: string[],
}

export const ActivityForm = ({ activity, areas }: Props) => {

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

  const [area, set_area] = useState<string>()
  const [title, set_title] = useState<string | undefined>(activity !== undefined ? activity?.title : '')
  const [dateTimeValue, set_dateTimeValue] = useState([{
    startTime: formatTimeString(activity?.startTime),
    endTime: formatTimeString(activity?.endTime),
    date: formatDateString(activity?.startTime)}
  ])
  
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
        <Box mt={2}>
          <Select
            options={areas}
            value={area !== undefined ? area : areas[0]}
            onChange={newValue => set_area(newValue)}
          />
        </Box>
        <S.ButtonContainer>
          <Button 
            text='Save'
            primary={true}
            expand={true}
          />
        </S.ButtonContainer>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    height: 100%;
    width: 100%;
    position: relative;
  `,
  ButtonContainer: styled.div`
    height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
  `
}
