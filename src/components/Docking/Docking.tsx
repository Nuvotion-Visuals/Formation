import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { insertCSS } from '../../internal'

interface Props {
  config: any,
}

/**
 * `Docking` is a component that enables dynamic and responsive arrangement of panels within an application interface.
 * It allows users to organize their workspace with resizable and movable panels. The `config` object defines the initial state
 * and structure of these panels, dictating how they should be displayed and interacted with upon initialization.
 *
 * @component
 * @param {object} config - The configuration object defining the initial state and layout of the panels.
 *
 * @example
 * // Docking component with a configuration for panel layout
 * const panelConfig = {
 *   content: [{
 *     type: 'row',
 *     content:[{
 *       type: 'component',
 *       componentName: 'exampleComponent',
 *       title: 'Panel Title',
 *       isClosable: true,
 *       componentState: { label: 'Panel Content' }
 *     }]
 *   }]
 * };
 *
 * <Docking config={panelConfig} />
 */
export const Docking = ({
  config,
}: Props) => {
  const [layoutManager, setLayoutManager] = useState({})

  const [content, set_content] = useState(<></>)

  useEffect(() => {
    (async () => {
      insertCSS(`
      .lm_root {
        position: relative;
      }
      .lm_row > .lm_item {
        float: left;
      }
      .lm_content {
        overflow: auto;
        position: relative;
      }
      .lm_content > :first-child {
        min-height: 100%;
      }
      .lm_dragging,
      .lm_dragging * {
        cursor: move !important;
        -webkit-user-select: none;
          -moz-user-select: none;
            -ms-user-select: none;
                user-select: none;
      }
      .lm_maximised {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 40;
      }
      .lm_maximise_placeholder {
        display: none;
      }
      .lm_splitter {
        position: relative;
        z-index: 2;
      }
      .lm_splitter:hover,
      .lm_splitter.lm_dragging {
        background: orange;
      }
      .lm_splitter.lm_vertical .lm_drag_handle {
        width: 100%;
        position: absolute;
        cursor: ns-resize;
        height: .5rem !important;
        top: -.25rem !important;
        
      }
      .lm_splitter.lm_horizontal {
        float: left;
        height: 100%;
      }
      .lm_splitter.lm_horizontal .lm_drag_handle {
        height: 100%;
        position: absolute;
        cursor: ew-resize;
        left: -.25rem !important;
        width: .5rem !important;
      }
      .lm_header {
        overflow: visible;
        position: relative;
        z-index: 1;
        -webkit-user-select: none;
          -moz-user-select: none;
            -ms-user-select: none;
                user-select: none;
      }
      .lm_header.lm_selectable {
        cursor: pointer;
      }
      .lm_header [class^=lm_] {
        box-sizing: content-box !important;
      }
      .lm_header .lm_controls {
        position: absolute;
        right: 3px;
      }
      .lm_header .lm_controls > li {
        cursor: pointer;
        float: left;
        width: 18px;
        height: 18px;
        text-align: center;
      }
      .lm_header ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
      .lm_header .lm_tabs {
        position: absolute;
        width: 100%;
        height: 20px;
        background: var(--F_Background);
      }
      .lm_header .lm_tab {
        cursor: pointer;
        float: left;
        display: flex;
        align-items: center;
        height: 20px;
        padding-left: 12px;
        padding-right: 8px;
        position: relative;
      }
      .lm_header .lm_tab i {
        width: 2px;
        height: 19px;
        position: absolute;
      }
      .lm_header .lm_tab i.lm_left {
        top: 0;
        left: -2px;
      }
      .lm_header .lm_tab i.lm_right {
        top: 0;
        right: -2px;
      }
      .lm_header .lm_tab .lm_title {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--F_Font_Color_Disabled);
      }
      .lm_header .lm_tab .lm_close_tab {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        display: none;
      }
      .lm_stack {
        position: relative;
      }
      .lm_stack > .lm_items {
        overflow: hidden;
      }
      .lm_stack.lm_left > .lm_items {
        position: absolute;
        left: 20px;
        top: 0;
      }
      .lm_stack.lm_right > .lm_items {
        position: absolute;
        right: 20px;
        top: 0;
      }
      .lm_stack.lm_right > .lm_header {
        position: absolute;
        right: 0;
        top: 0;
      }
      .lm_stack.lm_bottom > .lm_items {
        position: absolute;
        bottom: 20px;
      }
      .lm_stack.lm_bottom > .lm_header {
        position: absolute;
        bottom: 0;
      }
      .lm_stack.lm_docked {
        overflow: visible;
        z-index: 3;
      }
      .lm_stack.lm_docked > .lm_header {
        z-index: 5;
      }
      .lm_stack.lm_docked > .lm_items {
        *z-index: 3;
        transition: height 0.4s ease-in;
        border: solid 2px;
        border-image-slice: 1 !important;
        margin: -2px 0;
      }
      .lm_stack.lm_docked.lm_left > .lm_items,
      .lm_stack.lm_docked.lm_right > .lm_items {
        transition: width 0.4s ease-in, height 0.001s linear;
      }
      .lm_left.lm_stack .lm_header,
      .lm_right.lm_stack .lm_header {
        height: 100%;
      }
      .lm_left.lm_dragProxy .lm_header,
      .lm_right.lm_dragProxy .lm_header,
      .lm_left.lm_dragProxy .lm_items,
      .lm_right.lm_dragProxy .lm_items {
        float: left;
      }
      .lm_left.lm_dragProxy .lm_header,
      .lm_right.lm_dragProxy .lm_header,
      .lm_left.lm_stack .lm_header,
      .lm_right.lm_stack .lm_header {
        width: 20px;
        vertical-align: top;
      }
      .lm_left.lm_dragProxy .lm_header .lm_tabs,
      .lm_right.lm_dragProxy .lm_header .lm_tabs,
      .lm_left.lm_stack .lm_header .lm_tabs,
      .lm_right.lm_stack .lm_header .lm_tabs {
        transform-origin: left top;
        top: 0;
        width: 1000px;
        /*hack*/
      }
      .lm_left.lm_dragProxy .lm_header .lm_controls,
      .lm_right.lm_dragProxy .lm_header .lm_controls,
      .lm_left.lm_stack .lm_header .lm_controls,
      .lm_right.lm_stack .lm_header .lm_controls {
        bottom: 0;
      }
      .lm_dragProxy.lm_left .lm_header .lm_tabs,
      .lm_stack.lm_left .lm_header .lm_tabs {
        transform: rotate(-90deg) scaleX(-1);
        left: 0;
      }
      .lm_dragProxy.lm_left .lm_header .lm_tabs .lm_tab,
      .lm_stack.lm_left .lm_header .lm_tabs .lm_tab {
        transform: scaleX(-1);
        margin-top: 1px;
      }
      .lm_dragProxy.lm_left .lm_header .lm_tabdropdown_list,
      .lm_stack.lm_left .lm_header .lm_tabdropdown_list {
        top: initial;
        right: initial;
        left: 20px;
      }
      .lm_dragProxy.lm_right .lm_content {
        float: left;
      }
      .lm_dragProxy.lm_right .lm_header .lm_tabs,
      .lm_stack.lm_right .lm_header .lm_tabs {
        transform: rotate(90deg) scaleX(1);
        left: 100%;
        margin-left: 0;
      }
      .lm_dragProxy.lm_right .lm_header .lm_controls,
      .lm_stack.lm_right .lm_header .lm_controls {
        left: 3px;
      }
      .lm_dragProxy.lm_right .lm_header .lm_tabdropdown_list,
      .lm_stack.lm_right .lm_header .lm_tabdropdown_list {
        top: initial;
        right: 20px;
        
      }
      .lm_dragProxy.lm_bottom .lm_header,
      .lm_stack.lm_bottom .lm_header {
        width: 100%;
      }
      .lm_dragProxy.lm_bottom .lm_header .lm_tab,
      .lm_stack.lm_bottom .lm_header .lm_tab {
        margin-top: 0;
        border-top: none;
      }
      .lm_dragProxy.lm_bottom .lm_header .lm_controls,
      .lm_stack.lm_bottom .lm_header .lm_controls {
        top: 3px;
      }
      .lm_dragProxy.lm_bottom .lm_header .lm_tabdropdown_list,
      .lm_stack.lm_bottom .lm_header .lm_tabdropdown_list {
        top: initial;
        bottom: 20px;
      }
      .lm_drop_tab_placeholder {
        float: left;
        width: 100px;
        height: 10px;
        visibility: hidden;
      }
      .lm_header .lm_controls .lm_tabdropdown:before {
        content: '';
        width: 0;
        height: 0;
        vertical-align: middle;
        display: inline-block;
        border-top: 5px dashed;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        color: white;
      }
      .lm_header .lm_tabdropdown_list {
        position: absolute;
        top: 20px;
        right: 0;
        z-index: 5;
        overflow: hidden;
        
      }
      .lm_header .lm_tabdropdown_list .lm_tab {
        clear: both;
        padding-right: 10px;
        margin: 0;
      }
      .lm_header .lm_tabdropdown_list .lm_tab .lm_title {
        width: 100px;
      }
      .lm_header .lm_tabdropdown_list .lm_close_tab {
        display: none !important;
      }
      /***********************************
      * Drag Proxy
      ***********************************/
      .lm_dragProxy {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 30;
      }
      .lm_dragProxy .lm_header {
        background: transparent;
      }
      .lm_dragProxy .lm_content {
        border-top: none;
        overflow: hidden;
      }
      .lm_dropTargetIndicator {
        display: none;
        position: absolute;
        z-index: 20;
        transition: all 200ms ease;
      }
      .lm_dropTargetIndicator .lm_inner {
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
      }
      .lm_transition_indicator {
        display: none;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 20;
      }
      .lm_popin {
        width: 20px;
        height: 20px;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 9999;
      }
      .lm_popin > * {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .lm_popin > .lm_bg {
        z-index: 10;
      }
      .lm_popin > .lm_icon {
        z-index: 20;
      }
      
      .lm_goldenlayout {
        background: var(--F_Background);
      }
      .lm_content {
        background: var(--F_Background);
        border: 1px solid transparent;
      }
      .lm_dragProxy .lm_content {
      }
      .lm_dropTargetIndicator {
        outline: 1px dashed #cccccc;
      }
      .lm_dropTargetIndicator .lm_inner {
        background: #000000;
        opacity: 0.2;
      }
      .lm_splitter {
        background: #000000;
        opacity: 1;
        transition: opacity 200ms ease;
      }
      .lm_splitter:hover,
      .lm_splitter.lm_dragging {
        background: #444444;
        opacity: 1;
      }
      .lm_header {
        height: 20px !important;
      }
      .lm_header .lm_tab {
        font-family: Arial, sans-serif;
        font-size: 13px;
        color: var(--F_Font_Color_Disabled);
        background: var(--F_Background);
        margin-right: 2px;
      
      }
      .lm_header .lm_tab .lm_close_tab {
        width: 11px;
        height: 11px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAQUlEQVR4nHXOQQ4AMAgCQeT/f6aXpsGK3jSTuCVJAAr7iBdoAwCKd0nwfaAdHbYERw5b44+E8JoBjEYGMBq5gAYP3usUDu2IvoUAAAAASUVORK5CYII=");
        background-position: center center;
        background-repeat: no-repeat;
        top: 4px;
        right: 6px;
        opacity: 0.4;
      }
      .lm_header .lm_tab .lm_close_tab:hover {
        opacity: 1;
      }
      .lm_header .lm_tab.lm_active {
        border-bottom: none;
      }
      .lm_header .lm_tab.lm_active .lm_title {
        border-bottom: none;
        color: var(--F_Font_Color);
      }
      .lm_header .lm_tab.lm_active .lm_close_tab {
        opacity: 1;
      }
      .lm_dragProxy.lm_right .lm_header .lm_tab.lm_active,
      .lm_stack.lm_right .lm_header .lm_tab.lm_active {
      }
      .lm_dragProxy.lm_bottom .lm_header .lm_tab,
      .lm_stack.lm_bottom .lm_header .lm_tab {
      }
      .lm_dragProxy.lm_bottom .lm_header .lm_tab.lm_active,
      .lm_stack.lm_bottom .lm_header .lm_tab.lm_active {
      }
      .lm_selected .lm_header {
        background-color: #452500;
      }
      .lm_tab:hover,
      .lm_tab.lm_active {
        background: var(--F_Background);
        color: #dddddd;
      }
      .lm_header .lm_controls .lm_tabdropdown:before {
        color: #ffffff;
      }
      .lm_controls > li {
        position: relative;
        background-position: center center;
        background-repeat: no-repeat;
        opacity: 0.4;
        transition: opacity 300ms ease;
      }
      .lm_controls > li:hover {
        opacity: 1;
      }
      .lm_controls .lm_popout {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAPklEQVR4nI2Q0QoAIAwCNfr/X7aXCpGN8snBdgejJOzckpkxs9jR6K6T5JpU0nWl5pSXTk7qwh8SnNT+CAAWCgkKFpuSWsUAAAAASUVORK5CYII=");
      }
      .lm_controls .lm_maximise {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAKElEQVR4nGP8////fwYCgImQAgYGBgYWKM2IR81/okwajIpgvsMbVgAwgQYRVakEKQAAAABJRU5ErkJggg==");
      }
      .lm_controls .lm_close {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAQUlEQVR4nHXOQQ4AMAgCQeT/f6aXpsGK3jSTuCVJAAr7iBdoAwCKd0nwfaAdHbYERw5b44+E8JoBjEYGMBq5gAYP3usUDu2IvoUAAAAASUVORK5CYII=");
      
      }
      .lm_controls .lm_dock {
        /* background-image: url('../../img/lm_docked_white.png'); */
        transform: rotate(-45deg);
        transition: transform 300ms;
      }
      .lm_stack.lm_docked .lm_controls .lm_dock {
        transform: rotate(0deg);
      }
      .lm_stack.lm_docked > .lm_items {
        border-color: #555555;
        border-image: linear-gradient(to right, #444444 1%, #999999 100%);
      }
      .lm_maximised .lm_header {
        background-color: #000000;
      }
      .lm_maximised .lm_controls .lm_maximise {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAKElEQVR4nGP8////fwYCgImQAgYGBgYWKM2IR81/okwajIpgvsMbVgAwgQYRVakEKQAAAABJRU5ErkJggg==");
      }
      .lm_transition_indicator {
        background-color: #000000;
        border: 1px dashed #555555;
      }
      .lm_popin {
        cursor: pointer;
      }
      .lm_popin .lm_bg {
        background: #ffffff;
        opacity: 0.3;
      }
      .lm_popin .lm_icon {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJCAYAAADpeqZqAAAAWklEQVR4nJWOyw3AIAxDHcQC7L8jbwT3AlJBfNp3SiI7dtRaLSlKKeoA1oEsKSQZCEluexw8Tm3ohk+E7bnOUHUGcNh+HwbBygw4AZ7FN/Lt84p0l+yTflV8AKQyLdcCRJi/AAAAAElFTkSuQmCC');
        background-position: center center;
        background-repeat: no-repeat;
        border-left: 1px solid #eeeeee;
        border-top: 1px solid #eeeeee;
        opacity: 0.7;
      }
      .lm_popin:hover .lm_icon {
        opacity: 1;
      }
    `);

      const { GoldenLayoutComponent } = require('./src')
      set_content(
        <GoldenLayoutComponent
          config={config}
          autoresize={true}
          debounceResize={100}
          onLayoutReady={setLayoutManager}
        />
      )
    })()
  }, [])

  return (
    <S.DockingContainer>
      {
        content
      }
    </S.DockingContainer>
  );
}

const S = {
  DockingContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
   
  `,
  LoadingContainer: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `
}