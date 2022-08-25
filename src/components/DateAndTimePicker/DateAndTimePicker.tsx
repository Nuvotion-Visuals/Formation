import React from 'react'
import styled from 'styled-components'

import { Button } from '../../internal'
import { Box } from '../../internal'
import { Spacer } from '../../internal'
import { Gap } from '../../internal'
import { LineBreak } from '../../internal'
import { getSuperscriptOrdinal, getOrdinal } from '../../utils'

import { DatePicker } from '../../internal'
import { TimePicker } from '../../internal'


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
  value: DatesAndTimes
}

export const DateAndTimePicker = ({ 
  value,
  onChange 
}: Props) => {
  const addDate = () => {
    const lastState = value
    const length = lastState.length
    const { date, startTime, endTime} = lastState[length - 1]

    var ndate = new Date(date)

    // Add a day
    ndate.setDate(ndate.getDate() + 1)


    // Add a day

    onChange([
      ...value,
      {
        date: ndate.toDateString(),
        startTime,
        endTime
      }
    ])
  }

  const removeDate = (index: number) => {
    onChange(value.filter((x, i) => i !== index))
  }

  const setValue = (index: number, field: 'date' | 'startTime' | 'endTime', fieldValue: string) => {
    onChange(
      value.map((day, i) =>
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

  const calculateTimeDifference = (timeStart: string, timeEnd: string) => {
    const diff = (Number(new Date("01/01/2007 " + timeEnd)) - Number(new Date("01/01/2007 " + timeStart))) / 60000

    const minutes = diff % 60
    const hours = (diff - minutes) / 60

    const difference = hours > 0 
      ? `${hours}h` + (minutes > 0 ? ` ${minutes}m` : '')
      : hours === 0
        ? `${minutes}m`
        : `${24 + hours}h` + (60 + minutes > 0 ? ` ${60 + minutes}m` : '')

    return difference
  }

  return (
    <>
      {
        value.map((item, index) => (
          <>
            <S.DateAndTime key={index}>
              <Gap  gap={.75}>
                <Gap disableWrap={true}>
                  <DatePicker
                    label={value.length > 1 ? `${index + 1}${getSuperscriptOrdinal(index + 1)} Day` : 'Date'}
                    value={new Date(item?.date ? item.date : new Date())}
                    onChange={newDate => setValue(index, 'date', newDate.toString())}
                  />
                
                  {
                    value.length > 1
                    ? <Button
                        onClick={(e : MouseEvent) => {
                          e?.preventDefault()
                          removeDate(index)
                        }}
                        icon='trash-alt'
                        iconPrefix='far'
                        secondary={true}
                      /> 
                    : null
                  }
                </Gap>

                <Gap disableWrap={true}>
                  <TimePicker
                    value={item.startTime}
                    label='Start time'
                    onChange={newStartTime => setValue(index, 'startTime', newStartTime)}
                  />
                  <TimePicker
                    value={item.endTime}
                    label='End time'
                    onChange={newEndTime => setValue(index, 'endTime', newEndTime)}
                  />
                  {
                    value.length > 1 || (item.startTime && item.endTime)
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
                  }
                </Gap>
              </Gap>
            </S.DateAndTime>
            
            {
              index == value.length - 1
                ? <Spacer/>
                : <Box mb={1} mt={1}>
                    <LineBreak />
                  </Box>
            }
          </>
        ))
      }
      <Box pt={.5}>
      </Box>

      <Button
        onClick={(e : MouseEvent) => {
          e?.preventDefault()
          addDate()
        }}
        text={`Add a ${getOrdinal(value.length + 1)} day`}
        icon={'plus'}
        iconPrefix={'fas'}
        expand={true}
      />
    </>
  )
}

const S = {
  DateAndTime: styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: .5rem;

    // temporary - replace with real components
    input[type="time"] {
      width: 100%;
      height: var(--F_Input_Height);
      padding: 0 .75rem;
      border: none;
      box-shadow: var(--F_Outline);
      border-radius: 8px;
      background: var(--F_Background_Alternating);
      color: var(--F_Font_Color);
    }
  
  `,
  Duration: styled.div`
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color_Label);
    text-align: center;
    display: flex;
    flex-shrink: 0;
  `
}