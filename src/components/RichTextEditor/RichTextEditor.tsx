import React, { useState, useEffect, FC, useRef } from 'react'
import styled from 'styled-components'
import { 
  Button, 
  Gap, 
  StyleHTML, 
  insertCSS,
} from '../../internal'
import { quillStyles } from './quillStyles'
import { IconPrefix } from '@fortawesome/fontawesome-common-types'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  px?: number,
  outline?: boolean,
  iconPrefix?: IconPrefix
}
export const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  px,
  outline,
  iconPrefix
}) => {
  const [loaded, setLoaded] = useState(false)
  const quillRef = useRef(null)

  const [headerValue, setHeaderValue] = useState('normal')

  useEffect(() => {
    insertCSS(quillStyles)
    import('react-quill').then(() => {
      setLoaded(true)
    })
  }, [])

  const CustomToolbar = ({ handlers }: any) => (
    <S.Toolbar id='custom-toolbar'>
      <Gap disableWrap gap={.25}>
      <S.Select 
        className='ql-header' 
        onChange={handlers.handleHeaders} 
        value={headerValue}
        onClick={e => e.stopPropagation()}
        title='Format'
      >
        <option value='1'>H1</option>
        <option value='2'>H2</option>
        <option value='3'>H3</option>
        <option value='4'>H4</option>
        <option value='normal'>Normal</option>
      </S.Select>
      <Button icon={'bold'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleBold} compact minimal square title='Bold' />
      <Button icon={'italic'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleItalic} compact minimal square title='Italic' />
      <Button icon={'underline'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleUnderline} compact minimal square title='Underline' />
      <Button icon={'list-ol'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleListOrdered} compact minimal square title='Ordered List' />
      <Button icon={'list-ul'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleListBullet} compact minimal square title='Unordered List' />
      <Button icon={'link'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleLink} compact minimal square title='Insert Link' />
      <Button icon={'image'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleImage} compact minimal square title='Insert Image' />
      <Button icon={'clapperboard'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleVideo} compact minimal square title='Insert Video' />
      <Button icon={'code'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleIframe} compact minimal square title='Insert Iframe' />
      <Button icon={'terminal'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleCode} compact minimal square title='Code Block' />
      <Button icon={'quote-right'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleBlockquote} compact minimal square title='Blockquote' />
      <Button icon={'eraser'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} onClick={handlers.handleClean} compact minimal square title='Clear Formatting' />
      </Gap>
    </S.Toolbar>
  )
  
  const handlers = {
    handleBold: () => {
      const quill = (quillRef.current as any).getEditor()
      quill.format('bold', !quill.getFormat().bold)
    },
    handleItalic: () => {
      const quill = (quillRef.current as any).getEditor()
      quill.format('italic', !quill.getFormat().italic)
    },
    handleUnderline: () => {
      const quill = (quillRef.current as any).getEditor()
      quill.format('underline', !quill.getFormat().underline)
    },
    handleListOrdered: () => {
      const quill = (quillRef.current as any).getEditor()
      const format = quill.getFormat()
      quill.format('list', format.list === 'ordered' ? false : 'ordered')
    },
    handleListBullet: () => {
      const quill = (quillRef.current as any).getEditor()
      const format = quill.getFormat()
      quill.format('list', format.list === 'bullet' ? false : 'bullet')
    },
    handleLink: () => {
      const quill = (quillRef.current as any).getEditor()
      const tooltip = quill.theme.tooltip
      const scrollPosition = quill.scrollingContainer.scrollTop
    
      const originalSave = tooltip.save
      const originalHide = tooltip.hide
    
      tooltip.save = function() {
        const range = quill.getSelection(true)
        const value = this.textbox.value
        if (value) {
          quill.format('link', value)
          this.hide()
        }
        quill.scrollingContainer.scrollTop = scrollPosition
      }
    
      tooltip.hide = function() {
        this.save = originalSave
        this.hide = originalHide
      }
    
      tooltip.textbox.addEventListener('click', (event: any) => {
        event.stopPropagation()
      })
    
      tooltip.edit('link')
      tooltip.textbox.placeholder = 'Enter link URL'
    },
    handleImage: () => {
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
  
        quill.scrollingContainer.scrollTop = scrollPosition
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
    },
    handleVideo: () => {
      const quill = (quillRef.current as any).getEditor()
      const tooltip = quill.theme.tooltip
      
      const originalSave = tooltip.save
      const originalHide = tooltip.hide
    
      tooltip.save = function() {
        const range = quill.getSelection(true)
        const value = this.textbox.value
        if (value) {
          quill.insertEmbed(range.index, 'video', value)
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
    
      tooltip.edit('video')
      tooltip.textbox.placeholder = 'Insert Video URL'
    },
    handleCode: () => {
      const quill = (quillRef.current as any).getEditor()
      quill.format('code-block', !quill.getFormat()['code-block'])
    },
    handleClean: (quill: any) => {
      quill.removeFormat(quill.getSelection())
    },
    handleIframe: () => {
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
    },
    handleHeaders: () => {
      const quill = (quillRef.current as any).getEditor()
      const selectedValue = (document.querySelector('.ql-header') as any).value
      setHeaderValue(selectedValue)
      if (selectedValue === 'normal') {
        quill.removeFormat(quill.getSelection())
      } else {
        quill.format('header', parseInt(selectedValue, 10))
      }
    },
    handleBlockquote: () => {
      const quill = (quillRef.current as any).getEditor()
      const format = quill.getFormat()
      quill.format('blockquote', format.blockquote ? false : true)
    },
  }

  const focus = () => {
    const quill = (quillRef.current as any).getEditor()
    if (quill) {
      quill.focus()
    }
  }

  const ReactQuill = require('react-quill')
  return (
    <S.RichTextEditor 
      px={px || 0}
      outline={outline}
      onClick={focus}
    >
      <StyleHTML>
      <CustomToolbar handlers={handlers} />
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        clipboard={{
          matchVisual: false
        }}
        modules={{
          toolbar: '#custom-toolbar'
        }}
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
    ${props => props.outline && `
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
    `}
  `,
  Toolbar: styled.div`
    width: calc(100% - 1.5rem);
    border-bottom: 1px solid var(--F_Surface_2);
    padding: 0 .75rem;
  `,
  Select: styled.select`
    background: none;
    outline: none;
    border: none;
    option {
      background: var(--F_Background);
    }
  `
}