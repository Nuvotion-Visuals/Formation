import { Button } from '../../internal'
import React from 'react'
import styled from 'styled-components'

interface Props {
  
}

export const Envelope = ({ }: Props) => {
  return (<S.Envelope>
    <Button text='Click' />

  </S.Envelope>)
}

const S = {
  Envelope: styled.div`
    
  `
}