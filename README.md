# Formation

> **Note:** This library is still actively in development and should not be used for production projections yet.

Formation is a comprehensive React component library based on Styled Components and CSS variables.

[View Source on GitHub](https://github.com/AVsync-LIVE/formation)

[View Package on NPM](https://www.npmjs.com/package/@avsync.live/formation)

Click on the image below to view Formation's Storybook. [Learn more about Storybook](https://storybook.js.org/).

[![image](https://user-images.githubusercontent.com/18317587/183244327-7204046a-009c-4a69-ba93-ef77f1e78618.png)](https://avsync-live.github.io/formation)

## Installation

`yarn add @avsync.live/formation`

## Philosophy

The name “Formation” expresses both the *form* embodied by the user interface, and the process by which user interaction *forms* the desired outcome of the application. The layout of the document is also composed of a *formation* of components.

Formation adheres to the concept of Unimpeded Design, where users never have to wait for animations to complete, or for the application to finishing changing modes in order to proceed with their task. 

Animations should be minimized or avoided, as they can degrade performance and make interactions feel less responsive.

Right clicking is avoided because on touch and controler inputs a secondary interaction like "tap and hold" is required that slows down the user's completion of their inteded task.

Interface elements must also never rely on hover states to function, as not all devices support hovering. Basic functionality should not be obscured behind device-specific capabilities.

If different application modes are required, unobtrusive dropdown menus are prefered to full-screen modal popups so as not to disrupt the user's context.

## Core principals
 - Responsive from the smallest of phones to the largest of multi-window 4K monitors.
 - Touch-first
 - No right clicks
 - No reliance on hover states
 - Allow for hold-to-drag, but also allow for tap/click-only alternatives
 - Minimal animations
 - Easily modify the styling using interchangeable themes.
 - Prefer a small inline dropdown over a context-changing modal popup.

## Implementation

 - Surface-based background-color system
 - CSS variables
 - React Styled-components
 - Use of storybook to manage and visualize components outside of an application
 - Code sandbox examples for all components