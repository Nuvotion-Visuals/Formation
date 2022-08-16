import React, { useEffect, useState } from 'react'
import { TextInput } from '../TextInput/TextInput'

const cloneDate = (date : Date) => new Date(date.valueOf())

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

const WeekHeader = () => ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) =>
  <span key={day + index} className='day-header'>
    { day }
  </span>
)

const buildWeeks = (date : Date) : Date[] => {
  const tempDate = cloneDate(date)

  tempDate.setDate(1)

  const month = tempDate.getMonth()
  const weekStartDate = getFirstDayofWeek(tempDate)
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

const Day = ({ 
  day, 
  month, 
  selected, 
  onSelect 
} : {
  day: Date,
  month: number,
  selected: Date,
  onSelect: (arg0: any) => void
}) => {
  let className = day.getMonth() !== month || isWeekend(day) ? 'disabled' : ''

  if (day.getTime() === selected.getTime()) {
    className = 'selected';
  }

  return (
    <span
      className={'day ' + className}
      onMouseUp={onSelect.bind(null, day)}
    >
      {
        day.getDate()
      }
    </span>
  )
}

const Week = ({ 
  weekStart, 
  selected, 
  month, 
  onSelect 
} : {
  weekStart: Date,
  selected: Date,
  month: number,
  onSelect: (arg0: any) => void
}) => 
  <div className='days-wrapper'>
    {
      getAllDaysInAWeek(weekStart).map((day, i) =>
        <Day
          key={i}
          month={month}
          day={new Date(day)}
          selected={selected}
          onSelect={onSelect}
        />
      )
    }
  </div>

const Weeks = ({ 
  date, 
  month, 
  selected, 
  onSelect 
} : {
  date: Date,
  month: number,
  selected: Date,
  onSelect: (arg0: any) => void
}) => 
  <div>
    {
      buildWeeks(date).map((day, i) =>
        <Week
          key={i}
          month={month}
          weekStart={day}
          selected={selected}
          onSelect={onSelect}
        />
      )
    }
  </div>

const Calendar = ({ 
  selectedDate, 
  onMonthChange, 
  onSelect 
} : {
  selectedDate: Date,
  onMonthChange: (arg0: Date) => void,
  onSelect: (arg0: any) => void
}) => {
  const [selected, set_selected] = useState(new Date(selectedDate))

  const setDate = (newDate: Date) => {
    onMonthChange(newDate)
  }

  const nextMonth = () => {
    const clone = new Date(selected)

    clone.setMonth(selected.getMonth() + 1)
    setDate(clone)
  }

  const previousMonth = () => {
    const clone = new Date(selected)

    clone.setMonth(selected.getMonth() - 1)
    setDate(clone)
  }

  const year = selected.getFullYear()
  const month = selected.toLocaleString('en-us', { month: 'long' })

  return (
    <div>
      <div className='month-header-wrapper'>
        <span className='title-wrapper'>
          <span className='month-title'>{month}</span>
          <span className='year-title '>{year}</span>
        </span>
        <span className='arrow right' onClick={nextMonth}>
          &gt;
        </span>
        <span className='arrow right' onClick={previousMonth}>
          &lt;
        </span>
      </div>
      <div className='day-header-wrapper'>
        {
          WeekHeader()
        }
      </div>
      <Weeks
        date={selected}
        onSelect={onSelect}
        selected={selectedDate}
        month={selected.getMonth()}
      />
    </div>
  )
}

interface Props {
  value: Date,
  onChange: (arg0: Date) => void
}

export const DatePicker = ({
  value,
  onChange
}: Props) => {
  const [isOpen, set_isOpen] = useState(false)
  const [isFocused, set_isFocused] = useState(false)
  const [currentSelected, set_currentSelected] = useState(value)
  const [tempDate, set_tempDate] = useState(value.toLocaleDateString())

  useEffect(() => {
    onChange(currentSelected)

  }, [currentSelected])

  const open = () => {
    set_isOpen(true)
    set_isFocused(true)
  }

  const close = () => {
    set_isOpen(false)
    set_isFocused(false)
  }

  let invalidDate = false
  const isInvalid = invalidDate ? ' is-invalid' : '';
  const focusClass = !invalidDate && (isFocused || isOpen) ? ' is-focused' : '';

  const select = (value: Date) => {
    set_isOpen(false)
    set_currentSelected(value)
    }

    const updateDate = (value: string) => {
      set_tempDate(new Date(value).toLocaleDateString())

      if (isValidDate(value)) {
        set_currentSelected(new Date(value))
      }
    }

  return (
    <div
      className='datepicker-wrapper'
    >
      <div
        onClick={open}
        className={'datepicker-input' + focusClass + isInvalid}
      >
        <TextInput
          label={'Date'}
          icon={'calendar-alt'}
          iconPrefix='far'
          value={tempDate}
          onChange={value => updateDate(value)}
        />
      </div>
      
      {
        isOpen
          ? <div className='datepicker-calendar'>
              <Calendar
                onSelect={select}
                selectedDate={currentSelected}
                onMonthChange={() => {}}
              />
            </div>
        : null
      }
  </div>
)
}