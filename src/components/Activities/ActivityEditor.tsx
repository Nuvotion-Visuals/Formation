import React, { useEffect } from 'react'
import styled from 'styled-components'

import { TextInput, TimePicker } from '../../internal'

interface Props {
  value: any,
  onChange: Function
}

export const ActivityEditor = ({ value, onChange }: Props) => {

  return (
    <S.Form>
      <TextInput
        value={''}
        label={'Title'}
      />
      <TimePicker
        value={''}
        label={'Start Time'}
        onChange={() => null}
      />
      <TimePicker
        value={''}
        label={'End Time'}
        onChange={() => null}
      />
    </S.Form>
  )
}

const S = {
  Form: styled.div<{}>`
    width: 100%;
    max-width: 400px;
    height: 100vh;
    position: sticky;
    top: 0;
  `
}
