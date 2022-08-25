# Formation

[Storybook](https://avsync-live.github.io/formation) |
[GitHub Repository](https://github.com/AVsync-LIVE/formation) |
[NPM Package](https://www.npmjs.com/package/@avsync.live/formation)

Formation is a component library based on React, Styled Components and CSS variables.

## Installation

```shell
yarn add @avsync.live/formation
```

## Usage

The following is a minimal example for [Create React App](https://create-react-app.dev/docs/getting-started).

[CodeSandbox](https://codesandbox.io/s/formation-minimal-example-xmir9o)

```jsx
// App.js
import React from 'react'

import { Page, StyleHTML, Button } from '@avsync.live/formation'

import '@avsync.live/formation/dist/index.dark.css' // or index.light.css

// fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fas from '@fortawesome/free-solid-svg-icons'
library.add(
  // regular
  far.faHeart, far.faPaperPlane, far.faCheckSquare, far.faSquare,
  fas.faEnvelope,

  // solid
  fas.faInfoCircle, fas.faBars, fas.faHeart, fas.faPlus,
  fas.faEllipsisV, fas.faPaperPlane, fas.faCalendarAlt,
  fas.faArrowRight, fas.faArrowLeft, fas.faClock, fas.faSearch,
  fas.faSortAlphaUp, fas.faSortAlphaDown, fas.faFilter,
  fas.faChevronCircleRight, fas.faChevronCircleLeft, fas.faEnvelope,
  fas.faCheck, fas.faExclamationTriangle
)

export default function App() {
  return (
    <Page>
      <StyleHTML>
        <h1>Formation</h1>
        <p>This is a minimal example for Create React App</p>
      </StyleHTML>
      <Button
        text='Like'
        icon='heart' // name of the icon without the 'fa' and in kebab-case
        iconPrefix='fas' // fas, far, fal, etc
      />
    </Page>
  )
}

```

### CSS and Customization

Formation uses CSS variables to adjust the colors, typography, and proportions of components.

You must import Formation's CSS index file. It is available in both dark and light themes.

```jsx
// in your app's entrypoint (_app.tsx, App.js, etc)
import '@avsync.live/formation/dist/index.dark.css' // or index.light.css
```

To modify these properties, overwrite them in your project's global style sheet.

```css
:root {
  --Primary: hotpink;
}
```

### Icons
Formation uses [FontAwesome v6](https://fontawesome.com/v6/search?m=free) and supports both pro and free icons.

The free icons below are used by some components, and should be included in your project.

```jsx
// in your app's entrypoint (_app.tsx, App.js, etc)
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fas from '@fortawesome/free-solid-svg-icons'
library.add(
  // regular
  far.faHeart, far.faPaperPlane, far.faCheckSquare, far.faSquare,
  fas.faEnvelope,

  // solid
  fas.faInfoCircle, fas.faBars, fas.faHeart, fas.faPlus,
  fas.faEllipsisV, fas.faPaperPlane, fas.faCalendarAlt,
  fas.faArrowRight, fas.faArrowLeft, fas.faClock, fas.faSearch,
  fas.faSortAlphaUp, fas.faSortAlphaDown, fas.faFilter,
  fas.faChevronCircleRight, fas.faChevronCircleLeft, fas.faEnvelope,
  fas.faCheck, fas.faExclamationTriangle
)

```

## Why Formation?
 - Easily modify styling using css variables
 - Responsive from 5" mobile touchscreens to 4K TVs
 - Touch-first
 - No reliance on right clicks
 - No reliance on hover states
 - Allow for hold-to-drag and swiping, but also provide tap/click-only alternatives
 - Minimal use of animations
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

Formation adheres to the Unimpeded Design System philosophy, where users do not have to wait for animations to complete, or for the app to finishing changing modes in order to proceed with their task. The user is only limited physically by their reaction time.