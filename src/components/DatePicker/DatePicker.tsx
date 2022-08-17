import { styled } from '@storybook/theming';
import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button';
import { Box } from '../Box/Box';
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { Spacer } from '../Spacer/Spacer';
import { LineBreak } from '../LineBreak/LineBreak';

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
      selected={day.getTime() === selected.getTime()}
      disabled={day.getMonth() !== month}
    >
      {
        day.getDate()
      }
    </S.Day>
  )
}

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
      getAllDaysInAWeek(weekStart).map((day, i) =>
        <Day
          key={i}
          month={month}
          day={new Date(day)}
          selected={selected}
          onChange={onChange}
        />
      )
    }
  </>

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

    clone.setMonth(value.getMonth() - 1)
    setDate(clone)
  }

  const year = value.getFullYear()
  const month = value.toLocaleString('en-us', { month: 'long' })

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
      date={value}
      onChange={onChange}
      selected={value}
      month={value.getMonth()}
    />
    <Box mt={.375} mb={.125} >
      <Button
        text='Done'
        expand={true}
        onClick={onClose}
      />
    </Box>
  </>)
}

interface Props {
  value: Date,
  label?: string,
  onChange: (arg0: Date) => void,
  error?: string
}

export const DatePicker = ({
  value,
  onChange,
  label,
  error
}: Props) => {
  const [isOpen, set_isOpen] = useState(false)
  const [displayValue, set_displayValue] = useState(value.toLocaleDateString())

  const updateDate = (value: string) => {
    set_displayValue(new Date(value).toLocaleDateString())

    if (isValidDate(value)) {
      onChange(new Date(value))
    }
  }

  useEffect(() => {
    set_displayValue(value.toLocaleDateString())
  }, [value])

  const ref = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(ref, () => {
    set_isOpen(false)
  })

  return (
    <S.DatePicker>
      <TextInput
        label={label ? label : 'Date'}
        icon={'calendar-alt'}
        iconPrefix='far'
        value={displayValue}
        onChange={value => updateDate(value)}
        onClick={() => set_isOpen(true)}
        error={error}
      />

      {
        isOpen
          ? <S.DatePickerCalendar ref={ref}>
              <Calendar
                onChange={newValue => onChange(newValue)}
                value={value}
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
    background: var(--Background);
    border-radius: .5rem;
    padding: .5rem;
    box-shadow: var(--Outline);
    top: calc(var(--Input_Height) - .25rem);
    width: 196px;
    left: 1.5rem;
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
    font-size: var(--Font_Size);
    padding-bottom: .375rem;
    box-sizing: content-box;
    gap: .25rem;
  `,
  DayHeaderWrapper: styled.div`
    display: flex;
    height: 24px;
    align-items: center;
  `,
  DayHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 24px;
    font-size: 11px;
    text-align: center;
    color: var(--Font_Color_Label);
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
    width: 28px;
    height: 24px;
    font-size: 11px;
    border-radius: .25rem;

    cursor: ${props => 
      props.disabled 
        ? 'auto' 
        : 'pointer'
    };

    color: ${props => 
      props.disabled 
        ? 'var(--Font_Color_Disabled)' 
        : 'var(--Font_Color)'
    };

    background: ${props =>
      props.selected
        ? 'var(--Surface_2)'
        : 'none'
    };

    &:hover {
      color: ${props => 
        props.disabled 
          ? 'var(--Font_Color_Disabled)' 
          : 'var(--Font_Color)'
      };
      background: ${props =>
        props.selected
          ? 'var(--Surface_2)'
          : props.disabled
            ? 'none'
            : 'var(--Surface)'
      };
    }
  `,
  TitleWrapper: styled.div`
    display: flex;
    justify-content: center;
    color: var(--Font_Color);
    padding: .25rem;
    height: 100%;
  `,
  YearTitle: styled.div`
    height: 100%;
    font-size: var(--Font_Size);
  `,
  Arrow: styled.div`
    color: var(--Font_Color);
    width: 2rem;
    height: 100%;
    border-radius: .25rem;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: var(--Surface);
    &:hover {
      background: var(--Surface_1);
    }
    &:active {
      background: var(--Surface_2);
    }
  `
}