import React, { useEffect, useMemo, useState, lazy, Suspense } from 'react'
import styled from 'styled-components'

import { Box, LoadingSpinner, Button, ButtonProps } from '../../internal'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
const LazyReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

const { Quill } = LazyReactQuill

if (typeof window === 'object') {
// register custom bubble theme to default to being open, and make tooltips work correctly
const BubbleTheme = Quill.import('themes/bubble');
  class ExtendBubbleTheme extends BubbleTheme {
  constructor(quill: any, options: any) {
    super(quill, options);

    quill.on('selection-change', (range: any) => {
      if (range && range.length > 0) {
        this.positionTooltip(quill, range);
      }
    });

    quill.container.addEventListener('dblclick', () => {
      const range = quill.getSelection();
      // if (range && range.length > 0) {
        this.positionTooltip(quill, range);
      // }
    });
  }

  positionTooltip(quill: any, range: any) {
    const tooltip = quill.theme.tooltip;
    const containerBounds = quill.container.getBoundingClientRect();
    const rangeBounds = quill.getBounds(range);

    // Calculate the position to display the tooltip below the selection.
    let top = 0;
    let left = rangeBounds.left + (rangeBounds.width / 2) - (tooltip.root.offsetWidth / 2);

    // Check if the tooltip would be cut off on the left or right side, and adjust its position accordingly.
    if (left < containerBounds.left) {
      left = containerBounds.left;
    } else if (left + tooltip.root.offsetWidth > containerBounds.right) {
      left = containerBounds.right - tooltip.root.offsetWidth;
    }

    // Apply the calculated position to the tooltip.
    tooltip.root.style.left = `${left}px`;
    tooltip.root.style.top = `${top}px`;
    
    // Add a close button to the tooltip
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `background: none; padding: .25rem .5rem; border: none; color: var(--F_Font_Color); font-size: 15px; cursor: pointer;`

    closeButton.style.position = 'absolute';
    closeButton.style.top = '0';
    closeButton.style.right = '0';
    closeButton.addEventListener('click', () => {
      tooltip.hide();
    });
    tooltip.root.appendChild(closeButton);

    tooltip.show();
  }
}
  Quill.register('themes/bubble', ExtendBubbleTheme);

}

const applyHighlight = (quill: any, textToHighlight: string) => {
  // Clear existing highlights
  const text = quill.getText();
  quill.formatText(0, text.length, "highlight", false);

  // Apply new highlight if textToHighlight is not empty
  if (textToHighlight) {
    const startIndex = text.indexOf(textToHighlight);
    if (startIndex !== -1) {
      quill.formatText(startIndex, textToHighlight.length, "highlight", true);
    }
  }
};
interface Props {
  icon?: IconName,
  iconPrefix?: IconPrefix,
  placeholder?: string,
  value: string,
  onChange?: (arg0: string) => void,
  height?: string,
  outset?: boolean,
  onEnter?: (arg0: string) => void,
  readOnly?: boolean,
  children?: React.ReactNode,
  autoFocus?: boolean;
  highlightedPart?: string;
}

export const RichTextEditor = ({ 
  placeholder,
  value,
  onChange,
  height,
  outset,
  onEnter,
  autoFocus,
  readOnly,
  children,
  highlightedPart,
} : Props) => {
  const quillRef = React.useRef(null)

  useEffect(() => {
    const quill = (quillRef.current as any)?.getEditor();
    if (quill) {
      applyHighlight(quill, highlightedPart || '');
    }
  }, [quillRef, highlightedPart]);

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
        { header: [1, 2, 3, 4, 5, 6, false] },
        'bold', 'italic', 'underline', 'strike',
        { 'list': 'ordered' }, { 'list': 'bullet' },
        'link', 'blockquote', 'code-block',
        { 'color': [] }, { 'background': [] },
        { 'script': 'sub' }, { 'script': 'super' },
        { 'align': [] },
        { indent: "-1" }, { indent: "+1" },
        'image', 'video',
        'clean',
      ],
      handlers: {
        'image': imageHandler
      }
    }
  }), [])

  useEffect(() => {
    const quill = (quillRef.current as any)?.getEditor();
  
    if (quill) {
      const tooltip = quill.theme.tooltip;
      tooltip.textbox.addEventListener('click', function (event: MouseEvent) {
        event.stopPropagation();
      });
  
      if (quillRef?.current && autoFocus) {
        const quillEditorContent = quill.container.querySelector(".ql-editor");
        if (quillEditorContent) {
          quillEditorContent.click();
        }
      }
    }
  }, [quillRef, autoFocus]);
  
  const renderContent = () => (
    <S.QuillContainer>
    <Suspense fallback={<Box p={1}><LoadingSpinner small={true} /></Box>}>
      <LazyReactQuill 
        readOnly={readOnly}
        theme='bubble' 
        value={value} 
        onChange={onChange} 
        modules={modules}
    
        ref={quillRef}
        placeholder={placeholder}
        onKeyDown={(e: any) => {
          if (e.code === 'Enter' && onEnter && !e.shiftKey) {
            e.preventDefault()
            onEnter(value)
            return
          }
        }}
        
      />
    </Suspense>
    </S.QuillContainer>
  )

  return (<>
    {
      typeof window !== 'undefined'
      && 
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
              children
                ? <>
                    <S.Left>
                      <S.Scroll>
                        { renderContent() }
                      </S.Scroll>
                    </S.Left>

                    <S.Right onClick={e => e.stopPropagation()}>
                      {
                        children
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
    overflow-y: auto;
    .quill {
      height: ${props => props.height ? `calc(${props.height}px - 1.5rem)` : '100%'};
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
    width: calc(100% - 1.5rem);
    overflow-y: auto;
    overflow-x: hidden;
    padding: .75rem 1rem;
  `,
  Left: styled.div`
    position: relative;
    width: calc(100% - 2.5rem);
    height: 100%;
  `,
  Right:  styled.div`
    position: relative;
    width: var(--F_Input_Height);
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: .25rem 0;
    padding-right: .25rem;
  `,
  VSpacer: styled.div`
    display: flex;
    height: 100%;
  `,
  QuillContainer: styled.div`  
    /* quill */
    .ql-container {
      font-size: var(--F_Font_Size);
      width: 100%;
      margin: 0px;
      position: relative;
    }
    .ql-tooltip {
      left: 0 !important;
      margin-right: 0;
    }
    .ql-container.ql-disabled .ql-tooltip {
      visibility: hidden;
    }
    .ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {
      pointer-events: none;
    }
    .ql-clipboard {
      left: -100000px;
      height: 2px;
      overflow-y: hidden;
      position: absolute;
      top: 50%;
    }
    .ql-clipboard p {
      margin: 0;
      padding: 0;
    }
    .ql-editor {
      box-sizing: border-box;
      line-height: 1.66;
      height: 100%;
      outline: none;
      overflow-y: auto;
      tab-size: 4;
      -moz-tab-size: 4;
      text-align: left;
      white-space: pre-wrap;
      word-wrap: break-word;
      width: 100%;
      overflow-x: hidden;
      margin-bottom: -.75rem;
    }
    .ql-editor sub {
      vertical-align: sub;
      font-size: smaller;
    }
    .ql-editor sup {
      vertical-align: super;
      font-size: smaller;
    }
    .ql-editor > * {
      cursor: text;
    }
    .ql-editor p,
    .ql-editor ol,
    .ql-editor ul,
    .ql-editor pre,
    .ql-editor blockquote,
    .ql-editor h1,
    .ql-editor h2,
    .ql-editor h3,
    .ql-editor h4,
    .ql-editor h5,
    .ql-editor h6 {
      margin: 0;
      padding: 0;
      counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor p {
      margin-bottom: .75rem;
    }
    .ql-editor ol,
    .ql-editor ul {
      padding-left: .75rem;
      margin-bottom: .75rem;
    }
    .ql-editor ol > li,
    .ql-editor ul > li {
      list-style-type: none;
      margin-bottom: .25rem;
    }
    .ql-editor ul > li::before {
      content: '\2022';
    }
    .ql-editor ul[data-checked=true],
    .ql-editor ul[data-checked=false] {
      pointer-events: none;
    }
    .ql-editor ul[data-checked=true] > li *,
    .ql-editor ul[data-checked=false] > li * {
      pointer-events: all;
    }
    .ql-editor ul[data-checked=true] > li::before,
    .ql-editor ul[data-checked=false] > li::before {
      color: #777;
      cursor: pointer;
      pointer-events: all;
    }
    .ql-editor ul[data-checked=true] > li::before {
      content: '\2611';
    }
    .ql-editor ul[data-checked=false] > li::before {
      content: '\2610';
    }
    .ql-editor li::before {
      display: inline-block;
      white-space: nowrap;
      width: 1.2em;
    }
    .ql-editor li:not(.ql-direction-rtl)::before {
      margin-left: -1.5em;
      margin-right: 0.3em;
      text-align: right;
    }
    .ql-editor li.ql-direction-rtl::before {
      margin-left: 0.3em;
      margin-right: -1.5em;
    }
    .ql-editor ol li:not(.ql-direction-rtl),
    .ql-editor ul li:not(.ql-direction-rtl) {
      padding-left: .75rem;
    }
    .ql-editor ol li.ql-direction-rtl,
    .ql-editor ul li.ql-direction-rtl {
      padding-right: 1.5em;
    }
    .ql-editor ol li {
      counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
      counter-increment: list-0;
    }
    .ql-editor ol li:before {
      content: counter(list-0, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-1 {
      counter-increment: list-1;
    }
    .ql-editor ol li.ql-indent-1:before {
      content: counter(list-1, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-1 {
      counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-2 {
      counter-increment: list-2;
    }
    .ql-editor ol li.ql-indent-2:before {
      content: counter(list-2, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-2 {
      counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-3 {
      counter-increment: list-3;
    }
    .ql-editor ol li.ql-indent-3:before {
      content: counter(list-3, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-3 {
      counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-4 {
      counter-increment: list-4;
    }
    .ql-editor ol li.ql-indent-4:before {
      content: counter(list-4, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-4 {
      counter-reset: list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-5 {
      counter-increment: list-5;
    }
    .ql-editor ol li.ql-indent-5:before {
      content: counter(list-5, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-5 {
      counter-reset: list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-6 {
      counter-increment: list-6;
    }
    .ql-editor ol li.ql-indent-6:before {
      content: counter(list-6, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-6 {
      counter-reset: list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-7 {
      counter-increment: list-7;
    }
    .ql-editor ol li.ql-indent-7:before {
      content: counter(list-7, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-7 {
      counter-reset: list-8 list-9;
    }
    .ql-editor ol li.ql-indent-8 {
      counter-increment: list-8;
    }
    .ql-editor ol li.ql-indent-8:before {
      content: counter(list-8, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-8 {
      counter-reset: list-9;
    }
    .ql-editor ol li.ql-indent-9 {
      counter-increment: list-9;
    }
    .ql-editor ol li.ql-indent-9:before {
      content: counter(list-9, decimal) '. ';
    }
    .ql-editor .ql-indent-1:not(.ql-direction-rtl) {
      padding-left: 3em;
    }
    .ql-editor li.ql-indent-1:not(.ql-direction-rtl) {
      padding-left: 4.5em;
    }
    .ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {
      padding-right: 3em;
    }
    .ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {
      padding-right: 4.5em;
    }
    .ql-editor .ql-indent-2:not(.ql-direction-rtl) {
      padding-left: 6em;
    }
    .ql-editor li.ql-indent-2:not(.ql-direction-rtl) {
      padding-left: 7.5em;
    }
    .ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {
      padding-right: 6em;
    }
    .ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {
      padding-right: 7.5em;
    }
    .ql-editor .ql-indent-3:not(.ql-direction-rtl) {
      padding-left: 9em;
    }
    .ql-editor li.ql-indent-3:not(.ql-direction-rtl) {
      padding-left: 10.5em;
    }
    .ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {
      padding-right: 9em;
    }
    .ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {
      padding-right: 10.5em;
    }
    .ql-editor .ql-indent-4:not(.ql-direction-rtl) {
      padding-left: 12em;
    }
    .ql-editor li.ql-indent-4:not(.ql-direction-rtl) {
      padding-left: 13.5em;
    }
    .ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {
      padding-right: 12em;
    }
    .ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {
      padding-right: 13.5em;
    }
    .ql-editor .ql-indent-5:not(.ql-direction-rtl) {
      padding-left: 15em;
    }
    .ql-editor li.ql-indent-5:not(.ql-direction-rtl) {
      padding-left: 16.5em;
    }
    .ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {
      padding-right: 15em;
    }
    .ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {
      padding-right: 16.5em;
    }
    .ql-editor .ql-indent-6:not(.ql-direction-rtl) {
      padding-left: 18em;
    }
    .ql-editor li.ql-indent-6:not(.ql-direction-rtl) {
      padding-left: 19.5em;
    }
    .ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {
      padding-right: 18em;
    }
    .ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {
      padding-right: 19.5em;
    }
    .ql-editor .ql-indent-7:not(.ql-direction-rtl) {
      padding-left: 21em;
    }
    .ql-editor li.ql-indent-7:not(.ql-direction-rtl) {
      padding-left: 22.5em;
    }
    .ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {
      padding-right: 21em;
    }
    .ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {
      padding-right: 22.5em;
    }
    .ql-editor .ql-indent-8:not(.ql-direction-rtl) {
      padding-left: 24em;
    }
    .ql-editor li.ql-indent-8:not(.ql-direction-rtl) {
      padding-left: 25.5em;
    }
    .ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {
      padding-right: 24em;
    }
    .ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {
      padding-right: 25.5em;
    }
    .ql-editor .ql-indent-9:not(.ql-direction-rtl) {
      padding-left: 27em;
    }
    .ql-editor li.ql-indent-9:not(.ql-direction-rtl) {
      padding-left: 28.5em;
    }
    .ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {
      padding-right: 27em;
    }
    .ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {
      padding-right: 28.5em;
    }
    .ql-editor .ql-video {
      display: block;
      max-width: 100%;
    }
    .ql-editor .ql-video.ql-align-center {
      margin: 0 auto;
    }
    .ql-editor .ql-video.ql-align-right {
      margin: 0 0 0 auto;
    }
    .ql-editor .ql-bg-black {
      background-color: #000;
    }
    .ql-editor .ql-bg-red {
      background-color: #e60000;
    }
    .ql-editor .ql-bg-orange {
      background-color: #f90;
    }
    .ql-editor .ql-bg-yellow {
      background-color: #ff0;
    }
    .ql-editor .ql-bg-green {
      background-color: #008a00;
    }
    .ql-editor .ql-bg-blue {
      background-color: #06c;
    }
    .ql-editor .ql-bg-purple {
      background-color: #93f;
    }
    .ql-editor .ql-color-white {
      color: #fff;
    }
    .ql-editor .ql-color-red {
      color: #e60000;
    }
    .ql-editor .ql-color-orange {
      color: #f90;
    }
    .ql-editor .ql-color-yellow {
      color: #ff0;
    }
    .ql-editor .ql-color-green {
      color: #008a00;
    }
    .ql-editor .ql-color-blue {
      color: #06c;
    }
    .ql-editor .ql-color-purple {
      color: #93f;
    }
    .ql-editor .ql-font-serif {
    }
    .ql-editor .ql-font-monospace {
      font-family: Monaco, Courier New, monospace;
    }
    .ql-editor .ql-size-small {
      font-size: 0.75em;
    }
    .ql-editor .ql-size-large {
      font-size: 1.5em;
    }
    .ql-editor .ql-size-huge {
      font-size: 2.5em;
    }
    .ql-editor .ql-direction-rtl {
      direction: rtl;
      text-align: inherit;
    }
    .ql-editor .ql-align-center {
      text-align: center;
    }
    .ql-editor .ql-align-justify {
      text-align: justify;
    }
    .ql-editor .ql-align-right {
      text-align: right;
    }
    .ql-editor.ql-blank::before {
      color: var(--F_Font_Color_Disabled);
      content: attr(data-placeholder);
      left: 0;
      pointer-events: none;
      position: absolute;
    }
    .ql-toolbar {
      padding: .125rem;
      justify-content: center;
      display: flex;
      flex-wrap: wrap;
    }
    .ql-bubble.ql-toolbar:after,
    .ql-bubble .ql-toolbar:after {
      clear: both;
      content: '';
      display: table;
    }
    .ql-bubble.ql-toolbar button,
    .ql-bubble .ql-toolbar button {
      background: none;
      border: none;
      cursor: pointer;
      display: inline-block;
      float: left;
      height: 24px;
      padding: 3px 5px;
      width: 28px;
    }
    .ql-bubble.ql-toolbar button svg,
    .ql-bubble .ql-toolbar button svg {
      float: left;
      height: 100%;
    }
    .ql-bubble.ql-toolbar button:active:hover,
    .ql-bubble .ql-toolbar button:active:hover {
      outline: none;
    }
    .ql-bubble.ql-toolbar input.ql-image[type=file],
    .ql-bubble .ql-toolbar input.ql-image[type=file] {
      display: none;
    }
    .ql-bubble.ql-toolbar button:hover,
    .ql-bubble .ql-toolbar button:hover,
    .ql-bubble.ql-toolbar button:focus,
    .ql-bubble .ql-toolbar button:focus,
    .ql-bubble.ql-toolbar button.ql-active,
    .ql-bubble .ql-toolbar button.ql-active,
    .ql-bubble.ql-toolbar .ql-picker-label:hover,
    .ql-bubble .ql-toolbar .ql-picker-label:hover,
    .ql-bubble.ql-toolbar .ql-picker-label.ql-active,
    .ql-bubble .ql-toolbar .ql-picker-label.ql-active,
    .ql-bubble.ql-toolbar .ql-picker-item:hover,
    .ql-bubble .ql-toolbar .ql-picker-item:hover,
    .ql-bubble.ql-toolbar .ql-picker-item.ql-selected,
    .ql-bubble .ql-toolbar .ql-picker-item.ql-selected {
      color: #fff;
    }
    .ql-bubble.ql-toolbar button:hover .ql-fill,
    .ql-bubble .ql-toolbar button:hover .ql-fill,
    .ql-bubble.ql-toolbar button:focus .ql-fill,
    .ql-bubble .ql-toolbar button:focus .ql-fill,
    .ql-bubble.ql-toolbar button.ql-active .ql-fill,
    .ql-bubble .ql-toolbar button.ql-active .ql-fill,
    .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-bubble.ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-bubble .ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-bubble.ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-bubble .ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-bubble.ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-bubble .ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
    .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
      fill: #fff;
    }
    .ql-bubble.ql-toolbar button:hover .ql-stroke,
    .ql-bubble .ql-toolbar button:hover .ql-stroke,
    .ql-bubble.ql-toolbar button:focus .ql-stroke,
    .ql-bubble .ql-toolbar button:focus .ql-stroke,
    .ql-bubble.ql-toolbar button.ql-active .ql-stroke,
    .ql-bubble .ql-toolbar button.ql-active .ql-stroke,
    .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-bubble.ql-toolbar button:hover .ql-stroke-miter,
    .ql-bubble .ql-toolbar button:hover .ql-stroke-miter,
    .ql-bubble.ql-toolbar button:focus .ql-stroke-miter,
    .ql-bubble .ql-toolbar button:focus .ql-stroke-miter,
    .ql-bubble.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-bubble .ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
    .ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
      stroke: #fff;
    }
    @media (pointer: coarse) {
      .ql-bubble.ql-toolbar button:hover:not(.ql-active),
      .ql-bubble .ql-toolbar button:hover:not(.ql-active) {
        color: var(--F_Font_Color_Disabled);
      }
      .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-fill,
      .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-fill,
      .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,
      .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {
        fill: var(--F_Font_Color_Disabled);
      }
      .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-stroke,
      .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-stroke,
      .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,
      .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {
        stroke: var(--F_Font_Color_Disabled);
      }
    }
    .ql-bubble {
      box-sizing: border-box;
    }
    .ql-bubble * {
      box-sizing: border-box;
    }
    .ql-bubble .ql-hidden {
      display: none;
    }
    .ql-bubble .ql-out-bottom,
    .ql-bubble .ql-out-top {
      visibility: hidden;
    }
    .ql-bubble .ql-tooltip {
      position: relative;
    }
    .ql-bubble .ql-tooltip a {
      cursor: pointer;
      text-decoration: none;
    }
    .ql-bubble .ql-tooltip.ql-flip {
      transform: translateY(-10px);
    }
    .ql-bubble .ql-formats {
      display: inline-block;
      vertical-align: middle;
    }
    .ql-bubble .ql-formats:after {
      clear: both;
      content: '';
      display: table;
    }
    .ql-bubble .ql-stroke {
      fill: none;
      stroke: var(--F_Font_Color_Disabled);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2;
    }
    .ql-bubble .ql-stroke-miter {
      fill: none;
      stroke: var(--F_Font_Color_Disabled);
      stroke-miterlimit: 10;
      stroke-width: 2;
    }
    .ql-bubble .ql-fill,
    .ql-bubble .ql-stroke.ql-fill {
      fill: var(--F_Font_Color_Disabled);
    }
    .ql-bubble .ql-empty {
      fill: none;
    }
    .ql-bubble .ql-even {
      fill-rule: evenodd;
    }
    .ql-bubble .ql-thin,
    .ql-bubble .ql-stroke.ql-thin {
      stroke-width: 1;
    }
    .ql-bubble .ql-transparent {
      opacity: 0.4;
    }
    .ql-bubble .ql-direction svg:last-child {
      display: none;
    }
    .ql-bubble .ql-direction.ql-active svg:last-child {
      display: inline;
    }
    .ql-bubble .ql-direction.ql-active svg:first-child {
      display: none;
    }
    .ql-bubble .ql-editor h1 {
      font-size: 2em;
      line-height: 1.2;
      margin-bottom: .75rem;
    }
    .ql-bubble .ql-editor h2 {
      font-size: 1.5em;
      margin-top: 1rem;
    }
    .ql-bubble .ql-editor h3 {
      font-size: 1.17em;
      margin-top: 1rem;
    }
    .ql-bubble .ql-editor h4 {
      font-size: 1em;
    }
    .ql-bubble .ql-editor h5 {
      font-size: 0.83em;
    }
    .ql-bubble .ql-editor h6 {
      font-size: 0.67em;
    }
    .ql-bubble .ql-editor a {
      text-decoration: underline;
      color: var(--F_Font_Color_Link);
    }
    .ql-bubble .ql-editor blockquote {
      border-left: 4px solid var(--F_Font_Color_Disabled);
      margin-bottom: 5px;
      margin-top: 5px;
      padding-left: 16px;
    }
    .ql-bubble .ql-editor code,
    .ql-bubble .ql-editor pre {
      background-color: var(--F_Surface_0);
      border-radius: .25rem;
      font-size: 14px;
    }
    .ql-bubble .ql-editor pre {
      white-space: pre-wrap;
      margin-bottom: 5px;
      margin-top: 5px;
      padding: .5rem .75rem;
    }
    .ql-bubble .ql-editor code {
      font-size: 85%;
      padding: 2px 4px;
    }
    .ql-bubble .ql-editor pre.ql-syntax {
      overflow: visible;
      margin-bottom: .5rem;
      background: black;
      color: #ccc;
    }
    .ql-bubble .ql-editor img {
      max-width: 100%;
      margin-bottom: .75rem;
    }
    .ql-bubble .ql-picker {
      color: var(--F_Font_Color_Disabled);
      display: inline-block;
      float: left;
      font-size: 14px;
      font-weight: 500;
      height: 24px;
      position: relative;
      vertical-align: middle;
    }
    .ql-bubble .ql-picker-label {
      cursor: pointer;
      display: inline-block;
      height: 100%;
      padding-left: 8px;
      padding-right: 2px;
      position: relative;
      width: 100%;
    }
    .ql-bubble .ql-picker-label::before {
      display: inline-block;
      line-height: 22px;
    }
    .ql-bubble .ql-picker-options {
      background-color: var(--F_Background);
      display: none;
      min-width: 100%;
      padding: 4px 8px;
      position: absolute;
      white-space: nowrap;
    }
    .ql-bubble .ql-picker-options .ql-picker-item {
      cursor: pointer;
      display: block;
      padding-bottom: 5px;
      padding-top: 5px;
    }
    .ql-bubble .ql-picker.ql-expanded .ql-picker-label {
      color: #777;
      z-index: 2;
    }
    .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-fill {
      fill: #777;
    }
    .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
      stroke: #777;
    }
    .ql-bubble .ql-picker.ql-expanded .ql-picker-options {
      display: block;
      margin-top: -1px;
      top: 100%;
      z-index: 1;
    }
    .ql-bubble .ql-color-picker,
    .ql-bubble .ql-icon-picker {
      width: 28px;
    }
    .ql-bubble .ql-color-picker .ql-picker-label,
    .ql-bubble .ql-icon-picker .ql-picker-label {
      padding: 2px 4px;
    }
    .ql-bubble .ql-color-picker .ql-picker-label svg,
    .ql-bubble .ql-icon-picker .ql-picker-label svg {
      right: 4px;
    }
    .ql-bubble .ql-icon-picker .ql-picker-options {
      padding: 4px 0px;
    }
    .ql-bubble .ql-icon-picker .ql-picker-item {
      height: 24px;
      width: 24px;
      padding: 2px 4px;
    }
    .ql-bubble .ql-color-picker .ql-picker-options {
      padding: 3px 5px;
      width: 152px;
    }
    .ql-bubble .ql-color-picker .ql-picker-item {
      border: 1px solid transparent;
      float: left;
      height: 16px;
      margin: 2px;
      padding: 0px;
      width: 16px;
    }
    .ql-bubble .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
      position: absolute;
      margin-top: -9px;
      right: 0;
      top: 50%;
      width: 18px;
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-bubble .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-bubble .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,
    .ql-bubble .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,
    .ql-bubble .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {
      content: attr(data-label);
    }
    .ql-bubble .ql-picker.ql-header {
      width: 98px;
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-label::before,
    .ql-bubble .ql-picker.ql-header .ql-picker-item::before {
      content: 'Normal';
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
      content: 'Heading 1';
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
      content: 'Heading 2';
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
      content: 'Heading 3';
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
      content: 'Heading 4';
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
      content: 'Heading 5';
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
      content: 'Heading 6';
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
      font-size: 2em;
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
      font-size: 1.5em;
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
      font-size: 1.17em;
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
      font-size: 1em;
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
      font-size: 0.83em;
    }
    .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
      font-size: 0.67em;
    }
    .ql-bubble .ql-picker.ql-font {
      width: 108px;
    }
    .ql-bubble .ql-picker.ql-font .ql-picker-label::before,
    .ql-bubble .ql-picker.ql-font .ql-picker-item::before {
      content: 'Sans Serif';
    }
    .ql-bubble .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
    .ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
      content: 'Serif';
    }
    .ql-bubble .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
    .ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
      content: 'Monospace';
    }
    .ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
      font-family: Georgia, Times New Roman, serif;
    }
    .ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
      font-family: Monaco, Courier New, monospace;
    }
    .ql-bubble .ql-picker.ql-size {
      width: 98px;
    }
    .ql-bubble .ql-picker.ql-size .ql-picker-label::before,
    .ql-bubble .ql-picker.ql-size .ql-picker-item::before {
      content: 'Normal';
    }
    .ql-bubble .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
    .ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
      content: 'Small';
    }
    .ql-bubble .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
    .ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
      content: 'Large';
    }
    .ql-bubble .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
    .ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
      content: 'Huge';
    }
    .ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
      font-size: 10px;
    }
    .ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
      font-size: 18px;
    }
    .ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
      font-size: 32px;
    }
    .ql-bubble .ql-color-picker.ql-background .ql-picker-item {
      background-color: #fff;
    }
    .ql-bubble .ql-color-picker.ql-color .ql-picker-item {
      background-color: #000;
    }
    .ql-bubble .ql-toolbar .ql-formats {
      /* margin: 8px 12px 8px 0px; */
    }
    .ql-bubble .ql-toolbar .ql-formats:first-child {
    }
    .ql-bubble .ql-color-picker svg {
      margin: 1px;
    }
    .ql-bubble .ql-color-picker .ql-picker-item.ql-selected,
    .ql-bubble .ql-color-picker .ql-picker-item:hover {
      border-color: #fff;
    }
    .ql-bubble .ql-tooltip {
      background-color: var(--F_Background);
      border-radius: .5rem;
      color: #fff;
      box-shadow: var(--F_Outline);
      top: 2px !important;
    }
    .ql-bubble .ql-tooltip-arrow {
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      content: " ";
      display: block;
      left: 50%;
      margin-left: -6px;
      position: absolute;
    }
    .ql-bubble .ql-tooltip:not(.ql-flip) .ql-tooltip-arrow {
      border-bottom: 6px solid var(--F_Background);
      top: -6px;
    }
    .ql-bubble .ql-tooltip.ql-flip .ql-tooltip-arrow {
      border-top: 6px solid var(--F_Background);
      bottom: -6px;
    }
    .ql-bubble .ql-tooltip.ql-editing .ql-tooltip-editor {
      display: block;
    }
    .ql-bubble .ql-tooltip.ql-editing .ql-formats {
      visibility: hidden;
    }
    .ql-bubble .ql-tooltip-editor {
      display: none;
    }
    .ql-bubble .ql-tooltip-editor input[type=text] {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 13px;
      height: 100%;
      outline: none;
      padding: 10px 20px;
      position: absolute;
      width: 100%;
    }
    .ql-bubble .ql-tooltip-editor a {
      top: 10px;
      position: absolute;
      right: 20px;
    }
    .ql-bubble .ql-tooltip-editor a:before {
      color: var(--F_Font_Color_Disabled);
      content: "\D7";
      font-size: 16px;
      font-weight: bold;
    }
    .ql-container.ql-bubble:not(.ql-disabled) a {
      position: relative;
      white-space: nowrap;
    }
    .ql-container.ql-bubble:not(.ql-disabled) a::before {
      background-color: var(--F_Background);
      border-radius: 15px;
      top: -5px;
      font-size: 12px;
      color: #fff;
      content: attr(href);
      font-weight: normal;
      overflow: hidden;
      padding: 5px 15px;
      text-decoration: none;
      z-index: 1;
    }
    .ql-container.ql-bubble:not(.ql-disabled) a::after {
      border-top: 6px solid var(--F_Background);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      top: 0;
      content: " ";
      height: 0;
      width: 0;
    }
    .ql-container.ql-bubble:not(.ql-disabled) a::before,
    .ql-container.ql-bubble:not(.ql-disabled) a::after {
      left: 0;
      margin-left: 50%;
      position: absolute;
      transform: translate(-50%, -100%);
      transition: visibility 0s ease 200ms;
      visibility: hidden;
    }
    .ql-container.ql-bubble:not(.ql-disabled) a:hover::before,
    .ql-container.ql-bubble:not(.ql-disabled) a:hover::after {
      visibility: visible;
    }

    :root {
      --F_Syntax_Selection: rgba(255, 255, 255, 0.35);
      --F_Syntax_Text: #ffffff;
      --F_Syntax_String: #c47a4e;
      --F_Syntax_Number: #f3c74d;
      --F_Syntax_Title: #78a9ff;
      --F_Syntax_Built_In: #f7d038;
      --F_Syntax_Keyword: #d67fb7;
      --F_Syntax_Function: #f65d92;
      --F_Syntax_Params: #6eb7ff;
      --F_Syntax_Comment: #63c381;
    }

    pre code {
      display: block;
      overflow-x: auto;
      padding: 10px;
      -webkit-text-size-adjust: none;
    }

    pre code *::selection,
    .hljs::selection {
      background: var(--F_Syntax_Selection) !important;
    }

    .hljs {
      color: var(--F_Syntax_Text);
    }

    .hljs-string {
      color: var(--F_Syntax_String);
    }

    .hljs-number {
      color: var(--F_Syntax_Number) !important;
    }

    .hljs-title {
      color: var(--F_Syntax_Title) !important;
    }

    .hljs-built_in {
      color: var(--F_Syntax_Built_In) !important;
    }

    .hljs-keyword {
      color: var(--F_Syntax_Keyword) !important;
    }

    .hljs-function > .hljs-keyword {
      color: var(--F_Syntax_Function) !important;
      font-style: italic;
    }

    .hljs-params {
      color: var(--F_Syntax_Params);
    }

    .hljs-comment {
      color: var(--F_Syntax_Comment);
    }
  `
}

