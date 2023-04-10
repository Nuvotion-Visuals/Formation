import React from 'react'
import styled from 'styled-components'

import { RichTextEditor, StyleHTML } from '../../internal'

interface Props {
  value: string
}

export const Article = ({ value }: Props) => {
  return (
    <RichTextEditor value={value} readOnly />
  )
}