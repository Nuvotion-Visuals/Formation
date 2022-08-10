# Formation

Formation is a comprehensive React component library that uses Styled Components and CSS variables.

[View Source on GitHub](https://github.com/AVsync-LIVE/formation)

[View Package on NPM](https://www.npmjs.com/package/@avsync.live/formation)

[View Components in Storybook](https://avsync-live.github.io/formation)

[![image](https://user-images.githubusercontent.com/18317587/183244327-7204046a-009c-4a69-ba93-ef77f1e78618.png)](https://avsync-live.github.io/formation)

> **Note:** This library is still actively in development and should not be used for production projections yet.

## Installation

`yarn add @avsync.live/formation`

## Usage

<pre>
  import React from 'react'
  import { Button } from '@avsync.live/formation'

  const MyComponent = () => {
    return &lt;Button text='Click me'&gt;
  }
</pre>

## Icons

Formation uses [FontAwesome v6](https://fontawesome.com/v6/search?m=free) and supports both pro and free icons.

## Theming

Theming is based on CSS variables.

## Core principals
 - Responsive from the smallest of phones to the largest of multi-window 4K monitors
 - Touch-first
 - No reliance on right clicks
 - No reliance on hover states
 - Allow for hold-to-drag and swiping, but also provide tap/click-only alternatives
 - Minimal use of animations
 - Easily modify the styling using interchangeable themes
 - Prefer a small inline dropdown over a context-changing modal popup.

## Implementation
 - [React](https://reactjs.org/docs/getting-started.html)
 - [Styled Components](https://styled-components.com/docs)
 - [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
 - Surface-based background-color system
 - Use of Storybook to develop, manage, and visualize components outside of an application
 - [TODO] Code sandbox examples for all components
 - [TODO] Design system guide similar to [Material Design documentation](https://material.io/design/environment/elevation.html)

## Philosophy

The name [Formation](https://www.etymonline.com/word/formation) expresses both the *form* embodied by the user interface, and the process by which user interaction *forms* the desired outcome of the application. The layout of the document is also composed of a *formation* of components.

Formation adheres to the Unimpeded Design System, where users do not have to wait for animations to complete, or for the app to finishing changing modes in order to proceed with their task. 

Animations should be minimized or avoided, as they can degrade performance and make interactions feel less responsive.

In Unimpeded Design, right clicking is avoided because touch inputs require a slower, secondary interaction like "tap and hold."

Interface elements must not rely on hover states to function, as not all devices support hovering. Basic functionality should not be obscured behind device-specific capabilities.

If different application modes are required, unobtrusive dropdown menus are prefered to full-screen modal popups. Dropdowns are less disruptive to the user's context.

