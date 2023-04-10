import React from 'react'
import styled from 'styled-components'

import { RichTextEditor, StyleHTML } from '../../internal'

interface Props {
  children?: React.ReactNode,
  value: string
}

export const Article = ({ children, value }: Props) => {
  return (
    <RichTextEditor value={value} readOnly />
  )
}