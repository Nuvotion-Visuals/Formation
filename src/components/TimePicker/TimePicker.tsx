import { styled } from '@storybook/theming';
import React, { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

import { TextInput } from '../TextInput/TextInput'

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
  onClose
} : {
  value: string,
  onMonthChange: (arg0: string) => void,
  onChange: (arg0: string) => void,
  onClose: () => void
}) => <>
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
    ].map(item =>
      
      <S.Item 
        onClick={() => {
          onChange(item)
          onClose()
        }}
        active={value === item}
      >
        { item }
      </S.Item>  
    )
  }
</>

interface Props {
  value: string,
  label?: string,
  onChange: (arg0: string) => void,
  error?: string
}

export const TimePicker = ({
  value,
  onChange,
  label,
  error
}: Props) => {
  const [isOpen, set_isOpen] = useState(false)
  const [displayValue, set_displayValue] = useState(value)

  const updateTime = (value: string) => {
    // if (isValidDate(value) || true) {
      onChange(value)
    // }
  }

  useEffect(() => {
    set_displayValue(value)
  }, [value])

  const ref = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(ref, () => {
    set_isOpen(false)
  })

  return (
    <S.TimePicker>
      <TextInput
        label={label ? label : 'Time'}
        icon={'clock'}
        iconPrefix='far'
        value={displayValue}
        onChange={value => updateTime(value)}
        onClick={() => set_isOpen(true)}
        error={error}
      />

      {
        isOpen
          ? <S.TimesDropdown ref={ref}>
              <Times
                onChange={newValue => onChange(newValue)}
                value={value}
                onMonthChange={newDate => onChange(newDate)}
                onClose={() => set_isOpen(false)}
              />
            </S.TimesDropdown>
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
    color: var(--Font_Color);
    padding: .5rem 1rem;
    font-size: var(--Font_Size);
    background: ${props => props.active ? 'var(--Surface_1)' : 'none'};
    cursor: pointer;
    &:hover {
      background: ${props => props.active ? 'var(--Surface_2)' : 'var(--Surface)'};
    }
  `,
  TimesDropdown: styled.div`
    position: absolute;
    z-index: 1;
    background: var(--Background);
    border-radius: .5rem;
    box-shadow: var(--Outline);
    top: calc(var(--Input_Height) - .25rem);
    width: calc(196px + 1rem);
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    left: 2rem;
    user-select: none;
  `
}