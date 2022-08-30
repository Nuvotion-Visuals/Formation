import styled from 'styled-components'
import React, { useState } from 'react'

export const Badge = () => {
  return (
    <S.Badge>Badge</S.Badge>
  )
}

const S = {
  Badge: styled.div`
    width: 100%;
    height: 10rem;
    background: red;
  `
}