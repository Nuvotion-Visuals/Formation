import React, { useEffect, useMemo, useState, lazy, Suspense } from 'react'
import styled from 'styled-components'

import ReactQuill, { Quill } from 'react-quill';

import { Box, LoadingSpinner, Button, ButtonProps } from '../../internal'
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
  readOnly?: boolean,
  buttons?: ButtonProps[]
}

export const RichTextEditor = ({ 
  label,
  placeholder,
  value,
  onChange,
  height,
  outset,
  onEnter,
  readOnly,
  buttons
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
            height={height}
            onClick={() => {
              if (quillRef?.current) {
                (quillRef.current as any).focus()
              }
            }}
          >
            {
              buttons
                ? <>
                    <S.Left>
                      <S.Scroll>
                        { renderContent() }
                      </S.Scroll>
                    </S.Left>

                    <S.Right onClick={e => e.stopPropagation()}>
                        {
                        buttons?.map(buttonProps => <Button {...buttonProps} />)
                      }
                    </S.Right>
                  </>
                : <S.ScrollFull>
                    { renderContent() }
                  </S.ScrollFull>
            }
            
            
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
    display: flex;
    height: ${props => props.height ? props.height : 'auto'};
    max-height: ${props => props.height ? props.height : 'auto'};
    width: 100%;
    padding-bottom: ${props => props.height ? 'none' : '54px'};
    overflow-y: auto;
    .quill {
      height: ${props => props.height ? `calc(${props.height}px - 1.5rem)` : 'auto'};
      width: 100%;
    }

    &:hover {
      box-shadow: ${props => props.outset ? 'var(--F_Outline_Outset_Hover)' : 'var(--F_Outline_Hover)'};
    }
    &:focus-within {
      box-shadow: ${props => props.outset ? 'var(--F_Outline_Outset_Focus)' : 'var(--F_Outline_Focus)'};
    }
  `,
  Scroll: styled.div`
    height: calc(100% - 1.5rem);
    width: calc(100% - 2rem);
    overflow-y: auto;
    overflow-x: hidden;
    padding: .75rem 1rem;
  `,
  ScrollFull: styled.div`
    position: relative;
    height: calc(100% - 1.5rem);
    width: calc(100% - 2rem);
    overflow-y: auto;
    overflow-x: hidden;
    padding: .75rem 1rem;
  `,
  Left: styled.div`
    position: relative;
    width: 100%;
    width: 100%;
    height: 100%;
  `,
  Right:  styled.div`
    position: relative;
    width: var(--F_Input_Height);
    display: flex;
    align-items: flex-start;
    padding: .25rem 0;
    padding-right: .25rem;
  `,
}

