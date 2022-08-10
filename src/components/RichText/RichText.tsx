import React, { useEffect, useState } from 'react'
import RichTextEditor, { EditorValue } from 'react-rte'
import styled from 'styled-components'

interface Props {
  value: string,
  onChange: any
}

export const RichText = ({ 
  value,
  onChange
}: Props) => {

  const [internalValue, set_internalValue] = useState(RichTextEditor.createValueFromString(value, 'html'))


  useEffect(() => {
    onChange(internalValue.toString('html'))
  }, [internalValue])

  return (
    <S.RichTextEditor
      value={internalValue}
      onChange={(editorValue : EditorValue) => set_internalValue(editorValue)}
      toolbarConfig={{
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
        BLOCK_TYPE_BUTTONS: [
          {label: 'UL', style: 'unordered-list-item'},
          {label: 'OL', style: 'ordered-list-item'}
        ],
        INLINE_STYLE_BUTTONS: [
          {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
          {label: 'Italic', style: 'ITALIC'},
          {label: 'Underline', style: 'UNDERLINE'}
        ],
        BLOCK_TYPE_DROPDOWN: [
          {label: 'Normal', style: 'unstyled'},
          {label: 'Heading Large', style: 'header-one'},
          {label: 'Heading Medium', style: 'header-two'},
          {label: 'Heading Small', style: 'header-three'}
        ]
      }}
    />
  )
}

const S = {
  RichTextEditor: styled(RichTextEditor)`

  `
}
