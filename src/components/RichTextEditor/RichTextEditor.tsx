import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import ReactQuill from 'react-quill'
import './quill.css'
import { Box, LineBreak, Spacer } from '../../internal'

interface Props {
  label?: string,
  placeholder?: string,
  value: any,
  onChange: (arg0: any) => void
}

export const RichTextEditor = ({ 
  label,
  placeholder,
  value,
  onChange
} : Props) => {
  const quillRef = React.useRef(null)

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }, 'bold', 'italic', 'underline','strike', {'list': 'ordered'}, {'list': 'bullet'}, 'link'],
      ],
    },
  }), [])

  const [show, set_show] = useState(!label || !!value)

  useEffect(() => {
    if (show) {
      (quillRef.current as any).focus()
    }
  }, [show])

  return (
    <S.Container
    onBlur={() => {
      setTimeout(function(){
        if (document.activeElement?.className.includes('sb-') && label) {
          const empty = value === undefined || value === '<p><br></p>'
          set_show(!empty)
        }
      }, 0);
    }}
    >
      {
        label &&
          <S.Label 
            onClick={() => {
              set_show(true);
              
            }}
            shrink={show}
          >
            {
              label
            }
          </S.Label>
      }

      <S.TextEditorContainer shrink={!show}>
      <ReactQuill 
            theme="snow" 
            value={value} 
            onChange={onChange} 
            modules={modules}
            ref={quillRef}
            placeholder={placeholder}
            
          />

      </S.TextEditorContainer>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    box-shadow: var(--F_Outline);
    border-radius: .5rem;
    transition: .15s height; 

    &:hover {
      box-shadow: var(--F_Outline_Hover);
    }
    &:focus-within {
      box-shadow: var(--F_Outline_Focus);
      label {
        color: var(--F_Font_Color);
      }
    }
  `,
  TextEditorContainer: styled.div<{
    shrink?: boolean
  }>`
    width: 100%;
    display: ${props => props.shrink ? 'none' : 'block'};
  `,
  Label: styled.label<{
    shrink?: boolean
  }>`
    font-size: ${props => props.shrink ? 'var(--F_Font_Size)' : 'var(--F_Font_Size_Large)'};
    color: var(--F_Font_Color_Label);
    height: ${props => props.shrink ? 'var(--F_Input_Height)' : 'var(--F_Input_Height_Hero)'};
    transition: .15s all; 
    display: flex;
    padding: 0 1rem;
    align-items: center;
    border-bottom: ${props => props.shrink ? '1px solid var(--F_Surface)' : 'none'};
  `
}

