import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { isTouchCapable } from '../../internal'
import { useOnClickOutside } from '../../internal'
import { useScrollTo } from '../../internal'

import { TextInput } from '../../internal'
import { IconPrefix } from '@fortawesome/fontawesome-common-types'

const calculateTimeDifference = (startTime: string, endTime: string) => {
  const diff = (Number(new Date("01/01/2007 " + endTime)) - Number(new Date("01/01/2007 " + startTime))) / 60000

  const minutes = diff % 60
  const hours = (diff - minutes) / 60

  const difference = hours > 0 
    ? `${hours}h` + (minutes > 0 ? ` ${minutes}m` : '')
    : hours === 0
      ? `${minutes}m`
      : `${24 + hours}h` + (60 + minutes > 0 ? ` ${60 + minutes}m` : '')

  return difference
}

// rewrite as isValidTime

// const isValidDate = (value: string, format = 'mm/dd/yyyy') : boolean => {
//   let month, day, year;
//   const delimiter = /[^mdy]/?.exec(format)?.[0] || ''
//   const formatParts = format.split(delimiter)
//   const dateParts = value.split(delimiter)

//   for (let i = 0; i < dateParts.length; i++) {
//     if (/m/.test(formatParts[i])) month = dateParts[i]
//     if (/d/.test(formatParts[i])) day = dateParts[i]
//     if (/y/.test(formatParts[i])) year = dateParts[i]
//   }

//   return (
//     Number(month) > 0 &&
//     Number(month) < 13 &&
//     year &&
//     year.length === 4 &&
//     Number(day) > 0 &&
//     Number(day) <= new Date(Number(year), Number(month), 0).getDate()
//   ) || false
// }

const Times = ({ 
  value,
  onChange,
  onClose,
  comparisonStartTime
} : {
  value: string,
  onMonthChange: (arg0: string) => void,
  onChange: (arg0: string) => void,
  onClose: () => void,
  comparisonStartTime?: string
}) => {

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const scrollToRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(scrollContainerRef, () => {
    onClose()
  })

  const { set_scrollTo } = useScrollTo(scrollContainerRef, scrollToRef);

  useEffect(() => {
    set_scrollTo(true)
  }, [])

  return <S.TimesDropdown ref={scrollContainerRef}>
    {
      [
        '12:30 AM',
        '1:00 AM',
        '1:30 AM',
        '2:00 AM',
        '2:30 AM',
        '3:00 AM',
        '3:30 AM',
        '4:00 AM',
        '4:30 AM',
        '5:00 AM',
        '5:30 AM',
        '6:00 AM',
        '6:30 AM',
        '7:00 AM',
        '7:30 AM',
        '8:00 AM',
        '8:30 AM',
        '9:00 AM',
        '9:30 AM',
        '10:00 AM',
        '10:30 AM',
        '11:00 AM',
        '11:30 AM',
        '12:00 PM',
        '12:30 PM',
        '1:00 PM',
        '1:30 PM',
        '2:00 PM',
        '2:30 PM',
        '3:00 PM',
        '3:30 PM',
        '4:00 PM',
        '4:30 PM',
        '5:00 PM',
        '5:30 PM',
        '6:00 PM',
        '6:30 PM',
        '7:00 PM',
        '7:30 PM',
        '8:00 PM',
        '8:30 PM',
        '9:00 PM',
        '9:30 PM',
        '10:00 PM',
        '10:30 PM',
        '11:00 PM',
        '11:30 PM',
      ].map((item, index) =>
        
        <S.Item 
          key={index}
          onClick={() => {
            onChange(item)
            onClose()
          }}
          active={value === item}
          ref={value === item ? scrollToRef : item === '12:00 PM' ? scrollToRef : null }
        >
          {`${item}${comparisonStartTime ? ` (${calculateTimeDifference(comparisonStartTime, item)})` : ''}`}
        </S.Item>  
      )
    }
  </S.TimesDropdown>
}

interface Props {
  value: string,
  comparisonStartTime?: string,
  label?: string,
  onChange: (arg0: string) => void,
  error?: string,
  iconPrefix?: IconPrefix,
  autoFocus?: boolean
}

export const TimePicker = ({
  value,
  comparisonStartTime,
  onChange,
  label,
  error,
  iconPrefix,
  autoFocus
}: Props) => {
  const [isOpen, set_isOpen] = useState(autoFocus)
  const [displayValue, set_displayValue] = useState(value)

  const updateTime = (value: string) => {
    onChange(value) // TODO: validate time using regex
  }

  useEffect(() => {
    set_displayValue(value)
  }, [value])

  const [preventFocus, set_preventFocus] = useState(isTouchCapable())

  useEffect(() => {
    if (isOpen) {
      set_preventFocus(false)
    }
  }, [isOpen])

  return (
    <S.TimePicker 
      onClick={() => {
        set_preventFocus(isTouchCapable())
        set_isOpen(!isOpen)
      }}
    >
      <TextInput
        label={label ? label : 'Time'}
        icon={'clock'}
        iconPrefix={iconPrefix}
        value={displayValue}
        onChange={value => updateTime(value)}
        error={error}
        preventFocus={preventFocus}
        onBlur={() => set_preventFocus(isTouchCapable())}
        forceFocus={isOpen}
        autoFocus={autoFocus}
      />

      {
        isOpen
          ? <Times
              onChange={newValue => onChange(newValue)}
              value={value}
              onMonthChange={newDate => onChange(newDate)}
              onClose={() => set_isOpen(false)}
              comparisonStartTime={comparisonStartTime}
            />
        : null
      }
    </S.TimePicker>
  )
} 

const S = {
  TimePicker: styled.div`
    position: relative;
    width: 100%;
  `,
  Item: styled.div<{
    active: boolean
  }>`
    width: 100%;
    color: var(--F_Font_Color);
    padding: .5rem 1rem;
    font-size: var(--F_Font_Size);
    background: ${props => props.active ? 'var(--F_Surface_1)' : 'none'};
    cursor: pointer;
    &:hover {
      background: ${props => props.active ? 'var(--F_Surface_2)' : 'var(--F_Surface)'};
    }
  `,
  TimesDropdown: styled.div`
    position: absolute;
    z-index: 1;
    background: var(--F_Background);
    border-radius: .375rem;
    box-shadow: var(--F_Outline_Outset_Focus);
    top: calc(var(--F_Input_Height) + .75rem);
    width: calc(136px + 1rem);
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    left: 1.75rem;
    user-select: none;
  `
}