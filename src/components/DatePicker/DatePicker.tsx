import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'

import { isTouchCapable } from '../../internal'
import { useOnClickOutside } from '../../internal'

import { TextInput } from '../../internal'
import { Icon } from '../../internal'
import { Button } from '../../internal'
import { Box } from '../../internal'
import { Spacer } from '../../internal'
import { LineBreak } from '../../internal'
import { IconPrefix } from '@fortawesome/fontawesome-common-types'


const cloneDate = (date : Date) => new Date(date?.valueOf())

const isValidDate = (value: string, format = 'mm/dd/yyyy') : boolean => {
  let month, day, year;
  const delimiter = /[^mdy]/?.exec(format)?.[0] || ''
  const formatParts = format.split(delimiter)
  const dateParts = value.split(delimiter)

  for (let i = 0; i < dateParts.length; i++) {
    if (/m/.test(formatParts[i])) month = dateParts[i]
    if (/d/.test(formatParts[i])) day = dateParts[i]
    if (/y/.test(formatParts[i])) year = dateParts[i]
  }

  return (
    Number(month) > 0 &&
    Number(month) < 13 &&
    year &&
    year.length === 4 &&
    Number(day) > 0 &&
    Number(day) <= new Date(Number(year), Number(month), 0).getDate()
  ) || false
}

const getFirstDayofWeek = (date : Date) : Date => {
  const temp = cloneDate(date)
  temp.setDate(temp.getDate() - temp.getDay())
  
  return temp
}

const getAllDaysInAWeek = (date : Date) : Date[] => {
  const weekStartDate = getFirstDayofWeek(date)
  const days = [weekStartDate]

  for (let i = 1; i <= 6; i++) {
    const next = cloneDate(weekStartDate)

    next.setDate(next.getDate() + i)
    days.push(next)
  }

  return days
}

const WeekHeader = ({}) => <S.DayHeaderWrapper>
  {
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) =>
      <S.DayHeader key={day + index}>
        { day }
      </S.DayHeader>
    )
  }
</S.DayHeaderWrapper>

const buildWeeks = (date : Date) : Date[] => {
  const displayValue = cloneDate(date)

  displayValue.setDate(1)

  const month = displayValue.getMonth()
  const weekStartDate = getFirstDayofWeek(displayValue)
  const currentDate = cloneDate(weekStartDate)
  const weeks = [cloneDate(currentDate)]

  currentDate.setDate(currentDate.getDate() + 7)

  while (currentDate.getMonth() === month) {
    weeks.push(cloneDate(currentDate))
    currentDate.setDate(currentDate.getDate() + 7)
  }

  return weeks
}

const isWeekend = (date : Date) => {
  const weekday = date.getDay()
  return weekday === 0 || weekday === 6
}

/**
 * `Day` represents an individual day cell in the calendar.
 *
 * @component
 * @param {Date} day - The date object for this day.
 * @param {number} month - The current month being displayed.
 * @param {Date} selected - The currently selected date.
 * @param {function} onChange - Callback invoked with the new date when the day is clicked.
 *
 * @example
 * // Individual day cell usage within the Weeks component, not directly used.
 */
const Day = ({ 
  day, 
  month, 
  selected, 
  onChange 
} : {
  day: Date,
  month: number,
  selected: Date,
  onChange: (arg0: any) => void
}) => {

  return (
    <S.Day
      onMouseUp={onChange.bind(null, day)}
      selected={(day || new Date).getTime() === (selected || new Date()).getTime()}
      disabled={day.getMonth() !== month}
    >
      {
        day.getDate()
      }
    </S.Day>
  )
}

/**
 * `Week` renders a row of days, representing a week.
 *
 * @component
 * @param {Date} weekStart - The start date of the week to be rendered.
 * @param {Date} selected - The currently selected date.
 * @param {number} month - The current month being displayed.
 * @param {function} onChange - Callback invoked when a day is selected within the week.
 *
 * @example
 * // Week row usage within the Weeks component, not directly used.
 */
const Week = ({ 
  weekStart, 
  selected, 
  month, 
  onChange 
} : {
  weekStart: Date,
  selected: Date,
  month: number,
  onChange: (arg0: any) => void
}) => 
  <>
    {
      getAllDaysInAWeek((weekStart || new Date())).map((day, i) =>
        <Day
          key={i}
          month={month}
          day={new Date(day)}
          selected={(selected || new Date)}
          onChange={onChange}
        />
      )
    }
  </>

/**
 * `Weeks` builds and renders all the week rows for the current month.
 *
 * @component
 * @param {Date} date - The reference date to build the month's weeks from.
 * @param {number} month - The current month being displayed.
 * @param {Date} selected - The currently selected date.
 * @param {function} onChange - Callback invoked when a day is selected.
 *
 * @example
 * // Weeks usage within the Calendar component, not directly used.
 */
const Weeks = ({ 
  date, 
  month, 
  selected, 
  onChange 
} : {
  date: Date,
  month: number,
  selected: Date,
  onChange: (arg0: any) => void
}) => 
  <S.Weeks>
    {
      buildWeeks(date).map((day, i) =>
        <Week
          key={i}
          month={month}
          weekStart={day}
          selected={selected}
          onChange={onChange}
        />
      )
    }
  </S.Weeks>

/**
 * `Calendar` is a full calendar view allowing users to pick a date. It includes navigation to change months
 * and highlights the selected date.
 *
 * @component
 * @param {Date} value - The currently selected date.
 * @param {function} onMonthChange - Callback invoked when the month is changed.
 * @param {function} onChange - Callback invoked when a date is selected.
 * @param {function} onClose - Callback invoked when the calendar should be closed.
 *
 * @example
 * // Calendar usage within the DatePicker component, not directly used.
 */
const Calendar = ({ 
  value,
  onMonthChange, 
  onChange,
  onClose
} : {
  value: Date,
  onMonthChange: (arg0: Date) => void,
  onChange: (arg0: Date) => void,
  onClose: () => void
}) => {

  const setDate = (newDate: Date) => {
    onMonthChange(newDate)
    onChange(newDate)
  }

  const nextMonth = () => {
    const clone = new Date(value)

    clone.setMonth(value.getMonth() + 1)
    setDate(clone)
  }

  const previousMonth = () => {
    const clone = new Date(value)

    clone.setMonth((value || new Date()).getMonth() - 1)
    setDate(clone)
  }

  const year = (value || new Date()).getFullYear()
  const month = (value || new Date()).toLocaleString('en-us', { month: 'long' })

  return (<>
    <S.MonthHeaderWrapper>
      <S.TitleWrapper>
        <span className='month-title'>{ month }&nbsp;</span>
        <span className='year-title '>{ year }</span>
      </S.TitleWrapper>

      <Spacer />

      <S.Arrow 
        onClick={previousMonth}
        title='Previous month'
      >
        <Icon icon='arrow-left' iconPrefix='fas' size='sm'/>
      </S.Arrow>

      <S.Arrow 
        onClick={nextMonth}
        title='Next month'
      >
        <Icon icon='arrow-right' iconPrefix='fas' size='sm'/>
      </S.Arrow>

    </S.MonthHeaderWrapper>

    <LineBreak />

    <S.DateHeaderWrapper>
      <WeekHeader />
    </S.DateHeaderWrapper>

    <LineBreak />

    <Weeks
      date={(value || new Date)}
      onChange={onChange}
      selected={(value || new Date)}
      month={(value || new Date).getMonth()}
    />
    <Box mt={.375} >
      <Button
        text='Done'
        expand={true}
        onClick={onClose}
      />
    </Box>
  </>)
}

interface Props {
  value: Date | null,
  label?: string,
  onChange: (arg0: Date) => void,
  error?: string,
  iconPrefix?: IconPrefix
}

/**
 * `DatePicker` is a component that allows users to select a date. It provides an input field to type a date 
 * and a calendar view for a more visual date selection. The component ensures the selected date is valid and provides feedback.
 *
 * @component
 * @param {Date|null} value - The currently selected date.
 * @param {string} [label] - The label for the date picker input.
 * @param {function} onChange - Callback invoked when a date is selected or input value changes.
 * @param {string} [error] - Error message to display when the input date is invalid.
 * @param {IconPrefix} [iconPrefix] - FontAwesome icon prefix used for the calendar icon.
 *
 * @example
 * // DatePicker with label and change handling
 * <DatePicker
 *   value={new Date()}
 *   label="Select Date"
 *   onChange={newDate => console.log(newDate)}
 * />
 */
export const DatePicker = ({
  value,
  onChange,
  label,
  error,
  iconPrefix
}: Props) => {
  const [isOpen, set_isOpen] = useState(false)
  const [displayValue, set_displayValue] = useState('')

  const updateDate = (value: string) => {
    if (value) {
      set_displayValue(new Date(value).toLocaleDateString())

      if (isValidDate(value)) {
        onChange(new Date(value))
      }
    }
  }

  useEffect(() => {
    if (value) {
      set_displayValue(value.toLocaleDateString())

    }
  }, [value])

  const ref = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(ref, () => {
    set_isOpen(false)
  })

  const [preventFocus, set_preventFocus] = useState(isTouchCapable())

  useEffect(() => {
    if (isOpen) {
      set_preventFocus(false)
    }
  }, [isOpen])

  return (
    <S.DatePicker
      onClick={() => {
        set_preventFocus(isTouchCapable())
      }}
    >
      <TextInput
        label={label ? label : 'Date'}
        icon={'calendar-alt'}
        iconPrefix={iconPrefix}
        value={displayValue}
        onChange={value => updateDate(value)}
        error={error}
        preventFocus={preventFocus}
        onBlur={() => set_preventFocus(isTouchCapable())}
        onClick={() => set_isOpen(!isOpen)}
        forceFocus={isOpen}
        hero
      />

      {
        isOpen
          ? <S.DatePickerCalendar ref={ref}>
              <Calendar
                onChange={newValue => onChange(newValue)}
                value={(value || new Date())}
                onMonthChange={newDate => onChange(newDate)}
                onClose={() => set_isOpen(false)}
              />
            </S.DatePickerCalendar>
        : null
      }
    </S.DatePicker>
  )
} 

const S = {
  DatePicker: styled.div`
    position: relative;
    width: 100%;
  `,
  DatePickerCalendar: styled.div`
    position: absolute;
    z-index: 1;
    background: var(--F_Background);
    border-radius: .375rem;
    padding: .75rem;
    box-shadow: var(--F_Outline_Outset_Focus);
    top: calc(var(--F_Input_Height) + .75rem);
    /* width: 196px; */
    width: 14rem;
    left: 1.75rem;
    user-select: none;
  `,
  DateHeaderWrapper: styled.div`
    display: flex;
    align-items: center;
  `,
  MonthHeaderWrapper: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    font-size: var(--F_Font_Size_Large);
    padding-bottom: .5rem;
    box-sizing: content-box;
    gap: .5rem;
  `,
  DayHeaderWrapper: styled.div`
    display: flex;
    height: 2rem;
    align-items: center;
  `,
  DayHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    font-size: var(--F_Font_Size_Label);
    text-align: center;
    color: var(--F_Font_Color_Label);
    font-weight: 600;
  `,
  Weeks: styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: .375rem;
  `,
  Day: styled.div<{
    selected: boolean,
    disabled: boolean
  }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    font-size: var(--F_Font_Size_Label);
    border-radius: .25rem;

    cursor: ${props => 
      props.disabled 
        ? 'auto' 
        : 'pointer'
    };

    color: ${props => 
      props.disabled 
        ? 'var(--F_Font_Color_Disabled)' 
        : 'var(--F_Font_Color)'
    };

    background: ${props =>
      props.selected
        ? 'var(--F_Surface_2)'
        : 'none'
    };

    &:hover {
      color: ${props => 
        props.disabled 
          ? 'var(--F_Font_Color_Disabled)' 
          : 'var(--F_Font_Color)'
      };
      background: ${props =>
        props.selected
          ? 'var(--F_Surface_2)'
          : props.disabled
            ? 'none'
            : 'var(--F_Surface)'
      };
    }
  `,
  TitleWrapper: styled.div`
    display: flex;
    justify-content: center;
    color: var(--F_Font_Color);
    padding: .25rem;
    height: 100%;
  `,
  YearTitle: styled.div`
    height: 100%;
    font-size: var(--F_Font_Size);
  `,
  Arrow: styled.div`
    color: var(--F_Font_Color);
    width: 2rem;
    height: 2rem;
    border-radius: .25rem;
    width: var(--F_Input_Height);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: var(--F_Surface);
    &:hover {
      background: var(--F_Surface_1);
    }
    &:active {
      background: var(--F_Surface_2);
    }
  `
}