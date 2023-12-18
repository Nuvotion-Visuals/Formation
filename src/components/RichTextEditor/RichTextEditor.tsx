import React, { useState, useEffect, FC, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { StyleHTML, insertCSS } from '../../internal'
import { quillStyles } from './quillStyles'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  px?: number,
  outline?: boolean
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  px,
  outline
}) => {
  const [loaded, setLoaded] = useState(false)
  const quillRef = useRef(null)

  useEffect(() => {
    insertCSS(quillStyles)
    import('react-quill').then(() => {
      setLoaded(true)
    })
  }, [])

  const imageHandler = () => {
    const quill = (quillRef.current as any).getEditor()
    const tooltip = quill.theme.tooltip

    const scrollPosition = quill.scrollingContainer.scrollTop

    const originalSave = tooltip.save
    const originalHide = tooltip.hide

    tooltip.save = function() {
      const range = quill.getSelection(true)
      const value = this.textbox.value
      if (value) {
        quill.insertEmbed(range.index, 'image', value)
        this.hide()
      }

      quill.scrollingContainer.scrollTop = scrollPosition;
    }

    tooltip.hide = function() {
      this.save = originalSave
      this.hide = originalHide
    }

    tooltip.textbox.addEventListener('click', (event: any) => {
      event.stopPropagation()
    })

    tooltip.edit('image')
    tooltip.textbox.placeholder = 'Insert Image URL'
  }

  const iframeHandler = () => {
    const quill = (quillRef.current as any).getEditor()
    const tooltip = quill.theme.tooltip
  
    const originalSave = tooltip.save
    const originalHide = tooltip.hide
  
    tooltip.save = function() {
      const range = quill.getSelection(true)
      const iframeHtml = this.textbox.value
      if (iframeHtml) {
        quill.clipboard.dangerouslyPasteHTML(range.index, iframeHtml, 'user')
        this.hide()
      }
    }
  
    tooltip.hide = function() {
      this.save = originalSave
      this.hide = originalHide
    }
  
    tooltip.textbox.addEventListener('click', (event: any) => {
      event.stopPropagation()
    })
  
    tooltip.edit('iframe')
    tooltip.textbox.placeholder = 'Insert Iframe HTML'
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        {'header': [1, 2, 3, false]},
        'bold', 'italic', 'underline',
        {'list': 'ordered'}, {'list': 'bullet'},
        'link', 'image', 'video', 'iframe',
        'code',
        'clean'
      ],
      handlers: {
        'image': imageHandler,
        'iframe': iframeHandler
      }
    },
  }), [])

  if (!loaded) return <></>

  const ReactQuill = require('react-quill')
  return (
    <S.RichTextEditor 
      px={px || 0}
      outline={outline}
    >
      <StyleHTML>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
      />
      </StyleHTML>
    </S.RichTextEditor>
  )
}

const S = {
  RichTextEditor: styled.div<{
    px: number,
    outline?: boolean
  }>`
    position: relative;
    display: flex;
    width: 100%;
    border-radius: .75rem;
    box-shadow: ${props => props.outline ? 'var(--F_Outline)' : 'none'};
    .ql-editor {
      padding: ${props => `0 ${props.px}rem !important`};
    }
    .ql-toolbar {
      padding: ${props => `0 ${props.px}rem !important`};
      margin: 1px;
      margin-top: 0;
      border-radius: ${props => props.outline ? '.75rem .75rem 0 0' : '0'};
    }
    &:hover {
      box-shadow: var(--F_Outline_Hover);

      .ql-toolbar {
        border-top: 1px solid var(--F_Surface_3);
      }
    }
    &:active, &:focus-within {
      box-shadow: var(--F_Outline_Focus);

      .ql-toolbar {
        border-top: 1px solid var(--F_Surface_4);
      }
    }
  `
}