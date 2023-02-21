import React, { useEffect, useMemo, useState, lazy, Suspense } from 'react'
import styled from 'styled-components'

import ReactQuill, { Quill } from 'react-quill';

import { Box, Icon, LineBreak, LoadingSpinner, Spacer } from '../../internal'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

const BubbleTheme = Quill.import('themes/bubble');
class ExtendBubbleTheme extends BubbleTheme {
  constructor(quill: any, options: any) {
    super(quill, options);

    quill.on('selection-change', (range: any) => {
      if (range) {
        quill.theme.tooltip.show();
        quill.theme.tooltip.position(quill.getBounds(range));
      }
    });
  }
}

Quill.register('themes/bubble', ExtendBubbleTheme);

interface Props {
  icon?: IconName,
  iconPrefix?: IconPrefix,
  label?: string,
  placeholder?: string,
  value: string,
  onChange?: (arg0: string) => void,
  height?: string,
  outset?: boolean,
  onEnter?: (arg0: string) => void,
  readOnly?: boolean
}

export const RichTextEditor = ({ 
  icon,
  iconPrefix,
  label,
  placeholder,
  value,
  onChange,
  height,
  outset,
  onEnter,
  readOnly
} : Props) => {
  const quillRef = React.useRef(null)

  const imageHandler = () => {
    let quill = (quillRef.current as any).getEditor();
    quill.on('selection-change', (range : any) => {
      if (range) {
        quill.theme.tooltip.show();
        quill.theme.tooltip.position(quill.getBounds(range));
      }
    });
    const tooltip = quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
  
    tooltip.save = function() {
      const range = quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        quill.insertEmbed(range.index, 'image', value, 'user');
      }
    };
  
    tooltip.hide = function() {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
    };
    tooltip.textbox.addEventListener('click', function(event: MouseEvent) {
      event.stopPropagation();
    });
  
    tooltip.edit('image');
    tooltip.textbox.placeholder = 'Image URL';
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        ['bold', 'italic', 'underline', 'strike'],

        [{ 'list': 'ordered' }, { 'list': 'bullet' }],

        ['link', 'blockquote', 'code-block'],

        [{ 'color': [] }, { 'background': [] }],

        [{ 'script': 'sub' }, { 'script': 'super' }],

        [{ 'align': [] }],

        ['image', 'video'],

        ['clean']
      ],
      handlers: {
        'image': imageHandler
      }
    },
  }), [])

  useEffect(() => {
    const quill = (quillRef.current as any)?.getEditor();
    
    if (quill) {
      const tooltip = quill.theme.tooltip;
      tooltip.textbox.addEventListener('click', function(event: MouseEvent) {
        event.stopPropagation();
      });
    }
  }, [quillRef])
  
  const [show, set_show] = useState(!label || !!value)

  const renderContent = () => (
    <Suspense fallback={<Box p={1}><LoadingSpinner small={true} /></Box>}>
      <ReactQuill 
        readOnly={readOnly}
        theme='bubble' 
        value={value} 
        onChange={onChange} 
        modules={modules}
        ref={quillRef}
        placeholder={placeholder}
        onKeyDown={e => {
          if (e.code === 'Enter' && onEnter && !e.shiftKey) {
            e.preventDefault()
            onEnter(value)
            return
          }
        }}
        
      />
    </Suspense>
  )

  return (<>
    {
      readOnly
        ? renderContent()
        : <S.Container
            outset={outset}
            onBlur={() => {
              setTimeout(function(){
                if (document.activeElement?.className.includes('sb-') && label) {
                  const empty = value === undefined || value === '<p><br></p>'
                  set_show(!empty)
                }
              }, 0);
            }}
            height={height}
            onClick={() => {
              if (quillRef?.current) {
                (quillRef.current as any).focus()
              }
            }}
          >
            { renderContent() }
          </S.Container>
    }
  </>
    
  )
}

const S = {
  Container: styled.div<{
    height?: string,
    outset?: boolean
  }>`
    box-shadow: ${props => props.outset ? 'var(--F_Outline_Outset)' : 'var(--F_Outline)'};
    border-radius: .75rem;
    transition: .15s height; 
    position: relative;
    width: calc(100% - 2rem);
    height: ${props => props.height ? props.height : 'auto'};
    max-height: ${props => props.height ? props.height : 'auto'};
    overflow-y: auto;
    padding: .75rem 1rem;
    padding-bottom: ${props => props.height ? 'none' : '54px'};
    .quill {
      height: ${props => props.height ? props.height : 'auto'};
    }

    &:hover {
      box-shadow: ${props => props.outset ? 'var(--F_Outline_Outset_Hover)' : 'var(--F_Outline_Hover)'};
    }
    &:focus-within {
      box-shadow: ${props => props.outset ? 'var(--F_Outline_Outset_Focus)' : 'var(--F_Outline_Focus)'};

      label {
        color: var(--F_Font_Color);
      }
    }
  `
}

