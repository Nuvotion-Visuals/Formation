import React, { useState } from 'react'
import styled from 'styled-components'

import { Button, TimeZone } from '../../internal'
import { Box } from '../../internal'
import { Spacer } from '../../internal'
import { Gap } from '../../internal'
import { LineBreak } from '../../internal'
import { getSuperscriptOrdinal, getOrdinal, capitalizeFirstLetter, getTimezone } from '../../utils'

import { DatePicker } from '../../internal'
import { TimePicker } from '../../internal'
import { IconPrefix } from '@fortawesome/fontawesome-common-types'


const addMinutes = (time: string, minutes: number) : string => {
  const date = new Date("1/1/2013 " + time)
  date.setMinutes(date.getMinutes() + minutes)
  return new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}


interface DateAndTime {
  date: string,
  startTime: string,
  endTime: string
}

export type DatesAndTimes = DateAndTime[]

interface Props {
  onChange: (arg0: DatesAndTimes) => void,
  value: DatesAndTimes,
  iconPrefix?: IconPrefix
}

export const DateAndTimePicker = ({ 
  value,
  onChange,
  iconPrefix
}: Props) => {
  const addDate = () => {
    const lastState = value
    const length = lastState.length
    const { date, startTime, endTime} = lastState[length - 1]

    var ndate = new Date(date)

    if (date) {

      // Add a day
      ndate.setDate(ndate.getDate() + 1)
  
      // Add a day
      
    }
    onChange([
      ...value,
      {
        date: date ? ndate.toDateString() : '',
        startTime,
        endTime
      }
    ])
  }

  const removeDate = (index: number) => {
    onChange(value?.filter((x, i) => i !== index))
  }

  const setValue = (index: number, field: 'date' | 'startTime' | 'endTime', fieldValue: string) => {
    onChange(
      value?.map((day, i) =>
        index === i
          ? {
              ...day,
              [field]: fieldValue,
              endTime: 
                field === 'startTime' 
                  ? addMinutes(fieldValue, 30) // if a startTime is being set, also set the endTime
                  : field === 'endTime'
                    ? fieldValue // endTime is the field being updated, so should be replaced
                    : day.endTime // do not change
            }
          : day
      )
    )
  }

  

  const [editTimeZone, set_editTimeZone] = useState(false)
  const [timeZone, set_timeZone] = useState<string | undefined>('')
  
  return (
    <Box width='100%' wrap={true}>
      {
        value?.map((item, index) => (
          <>
            <S.DateAndTime key={index}>
              <Gap  gap={.75}>
                <Gap disableWrap={true}>
                  <DatePicker
                    label={value?.length > 1 ? `${capitalizeFirstLetter(getOrdinal(index + 1))} day` : 'Date'}
                    value={item.date ? new Date(item.date) : null}
                    onChange={newDate => setValue(index, 'date', newDate.toString())}
                    iconPrefix={iconPrefix}
                  />
                
                  {
                    value?.length > 1
                    ? <Button
                        onClick={(e : MouseEvent) => {
                          e?.preventDefault()
                          removeDate(index)
                        }}
                        icon='times'
                        iconPrefix='fas'
                        secondary={true}
                        hero={true}
                        circle={true}
                      /> 
                    : null
                  }
                </Gap>

                <Gap disableWrap={true}>
        
                  <TimePicker
                    value={item.startTime}
                    label='Start time'
                    onChange={newStartTime => setValue(index, 'startTime', newStartTime)}
                    iconPrefix={iconPrefix}
                  />
                  <TimePicker
                    value={item.endTime}
                    label='End time'
                    onChange={newEndTime => setValue(index, 'endTime', newEndTime)}
                    iconPrefix={iconPrefix}
                    comparisonStartTime={item.startTime}
                  />
                  {/* {
                    value?.length > 1 || (item.startTime && item.endTime)
                      ? <Box width={'8.125rem'} >
                        {
                          item.startTime && item.endTime
                            ? <S.Duration>
                                {
                                  calculateTimeDifference(item.startTime, item.endTime)
                                }
                              </S.Duration>
                            : null
                        }
                      </Box>
                      : null
                  } */}
                </Gap>
              </Gap>
            </S.DateAndTime>
            
            {
              index == value?.length - 1
                ? <Spacer/>
                : <Box my={.375} width='100%'>
                  </Box>
            }
          </>
        ))
      }

      

      <Box pt={.5} width='100%'>
        <S.TextButton onClick={addDate}>
          {`Add a ${getOrdinal(value?.length + 1)} day`}
        </S.TextButton>
        <Spacer />
        
        <Box hide={editTimeZone}>
          <S.TextButton onClick={() => set_editTimeZone(true)}>
            {`${timeZone}`}
          </S.TextButton>
        </Box>
        
      </Box>

      <Box pt={.75} width='100%' hide={!editTimeZone}>
        <TimeZone
          value={timeZone}
          onChange={newValue => set_timeZone(newValue)}
        />
      </Box>
      
    </Box>
  )
}

const S = {
  DateAndTime: styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  `,
  Duration: styled.div`
    font-size: var(--F_Font_Size_Large);
    color: var(--F_Font_Color_Label);
    text-align: center;
    display: flex;
    flex-shrink: 0;
  `,
  TextButton: styled.button<{
    onClick: () => void
  }>`
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    text-decoration: underline;
    font-size: var(--F_Font_Size);
    cursor: pointer;
    color: var(--F_Font_Color_Label);
  `
}