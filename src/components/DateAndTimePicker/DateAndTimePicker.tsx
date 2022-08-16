import React from 'react'
import styled from 'styled-components'

import { Button } from '../Button/Button'
import { Box } from '../Box/Box'
import { Spacer } from '../Spacer/Spacer'
import { Gap } from '../Gap/Gap'
import { LineBreak } from '../LineBreak/LineBreak'
import { getSuperscriptOrdinal } from '../../utils'

import { DatePicker } from '../DatePicker/DatePicker'
import { TimePicker } from '../TimePicker/TimePicker'

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
    onChange([
      ...value,
      {
        date: '',
        startTime: '',
        endTime: ''
      }
    ])
  }

  const removeDate = (index: number) => {
    onChange(value.filter((x, i) => i !== index))
  }

  const setValue = (index: number, field: string, fieldValue: string) => {
    onChange(
      value.map((day, i) =>
        index === i
          ? {
              ...day,
              [field]: fieldValue
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
      ? `${hours} hr${hours > 1 ? 's' : ''}` + (minutes > 0 ? ` ${minutes} min${minutes > 1 ? 's' : ''}` : '')
      : hours === 0
        ? `${minutes} min${minutes > 0 ? 's' : ''}`
        : `${24 + hours} hr${24 + hours > 1 ? 's' : ''}` + (60 + minutes > 0 ? ` ${60 + minutes} min${60 + minutes > 1 ? 's' : ''}` : '')

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
      <Box mt={.5}>
        <Button
          onClick={(e : MouseEvent) => {
            e?.preventDefault()
            addDate()
          }}
          text="Add a day"
          icon={"plus"}
          expand={true}
        />
      </Box>
      
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
      height: var(--Input_Height);
      padding: 0 .75rem;
      border: none;
      box-shadow: var(--Outline);
      border-radius: 8px;
      background: var(--Background_Alternating);
      color: var(--Font_Color);
    }
  
  `,
  Duration: styled.div`
    font-size: var(--Font_Size);
    color: var(--Font_Color_Label);
    text-align: center;
  `
}