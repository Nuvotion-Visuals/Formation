# Formation

[Storybook](https://formation.avsync.live) |
[GitHub Repository](https://github.com/AVsync-LIVE/formation) |
[NPM Package](https://www.npmjs.com/package/@avsync.live/formation)

Formation is a comprehensive component library powered by [React](https://reactjs.org/docs/getting-started.html), 
[Styled Components](https://styled-components.com/docs) and [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for creating apps and websites that demand responsive, unified cross-platform experiences. It uses [Vite](https://vitejs.dev/) for fast [HMR](https://vitejs.dev/guide/features.html#hot-module-replacement) in development, and [Rollup](https://rollupjs.org/) for efficient production bundling.

 - Customize colors, sizing, and typography using CSS variables
 - Living documentation and development enviroment provided by [Storybook v7](https://formation.avsync.live) 
 - Save time with essential hooks and utilities included

In conjunction with the example projects, you can use Formation as a minimalistic framework for building cross-platform applications with declarative Typescript.

Platforms supported: Web, Mac, Windows, Linux

Planned support: iOS, Android, WebOS

## Installation

```shell
yarn add @avsync.live/formation
# or
npm i @avsync.live/formation
# or
pnpm i @avsync.live/formation
```

## Usage

The following is a minimal usage example for Create React App.

```jsx
// App.js
import React from 'react';

import { Page, StyleHTML, Button } from '@avsync.live/formation';
import '@avsync.live/formation/dist/index.dark.css'; // or index.light.css

// FontAwesome
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as far from '@fortawesome/free-regular-svg-icons';
import * as fas from '@fortawesome/free-solid-svg-icons';
library.add(
  // include your FontAwesome icons here. See the section below on which icons
  // should be included to ensure Formation components render correctly
);

export default function App() {
  return (
    <Page>
      <StyleHTML>
        <h1>Formation</h1>
        <p>This is a minimal example for Create React App</p>
      </StyleHTML>
      <Button
        text="Like"
        icon="heart" // name of the icon without the 'fa' and in kebab-case
        iconPrefix="fas" // fas, far, fal, etc
      />
    </Page>
  );
}
```

## Examples

If you're creating a web or native application from scratch, it may be helpful to clone one of these example templates. They are also useful for referencing how to integrate Formation with an exisiting application.

### Web: Create React App

If you're using Create React App, check out the [formation-create-react-app-example](https://stackblitz.com/edit/react-ts-xyhgvu) on StackBlitz.


### Web: Next.js

Formation works well with the popular React framework, Next.js. Check out the [formation-next-example](https://github.com/AVsync-LIVE/formation-next-example) on GitHub for a working example of server-side rendering with styled-components.


### Desktop: Electron and Nextron

Formation is perfect for creating desktop apps using the Nextron framework, which combines Next.js and Electron. Check out the [formation-nextron-example](https://github.com/AVsync-LIVE/formation-nextron-example) on GitHub to start creating cross-platform apps with Formation.


## CSS and Customization

Formation allows you to easily customize the colors, typography, and proportions of your components using CSS variables. 

To use Formation's styles, you must import the appropriate CSS index file (dark or light theme) in your project. 


```jsx
// in your app's entrypoint (_app.tsx, App.js, etc)
import '@avsync.live/formation/dist/index.dark.css' // or index.light.css
```

You can then overwrite these variables in your global style sheet to change the look and feel of your components.

```css
:root {
  --F_Primary: hotpink;
}
```

[View all customiziable CSS variables](https://formation.avsync.live/?path=/story/theme--theme)


## Icons

Formation uses [FontAwesome v6](https://fontawesome.com/v6/search?m=free), allowing for both pro and free icons to be used in components. 

The following icons should be included in your project to ensure all components display correctly. You can also use other style variants, just be sure to include your chosen style in component props, like `iconPrefix='fal'`.

```jsx
// in your app's entrypoint (_app.tsx, App.js, etc)
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fas from '@fortawesome/free-solid-svg-icons'
library.add(
  // regular
  far.faHeart, far.faPaperPlane, far.faCheckSquare, far.faSquare,
  fas.faEnvelope, far.faTrashAlt, far.faBookmark, far.faCircle, far.faCircleDot,

  // solid
  fas.faInfoCircle, fas.faBars, fas.faHeart, fas.faPlus,
  fas.faEllipsisV, fas.faPaperPlane, fas.faCalendarAlt,
  fas.faArrowRight, fas.faArrowLeft, fas.faClock, fas.faSearch,
  fas.faSortAlphaUp, fas.faSortAlphaDown, fas.faFilter,
  fas.faChevronCircleRight, fas.faChevronCircleLeft, fas.faEnvelope,
  fas.faCheck, fas.faExclamationTriangle, fas.faUser, fas.faLock,
  fas.faPhone, fas.faUsers, fas.faTasks, fas.faCheckSquare,
  fas.faCompass, fas.faHashtag, fas.faBell, fas.faChevronLeft,
  fas.faChevronRight, fas.faChevronDown, fas.faChevronUp,
  fas.faTrashAlt, fas.faMapMarkerAlt, fas.faEdit, fas.faMoneyCheckDollar,
  fas.faUserPlus, fas.faAddressCard, fas.faHandshakeAngle,
  fas.faArchive, fas.faShare, fas.faTimes, fas.faMessage,
  fas.faHashtag, fas.faMapPin, fas.faBookmark, fas.faDownload,
  fas.faExternalLink, fas.faCrop, fas.faImage, fas.faUserCircle,
  fas.faEraser, fas.faImage, fas.faChevronDown, fas.faChevronUp, 
  fas.faSort, fas.faArrowUp, fas.faArrowDown, fas.faThumbTack,
  fas.faCircle, fas.faCircleDot, fas.faGlobe, fas.faLink,
  fas.faArrowRight, fas.faPaperPlane, fas.faCaretDown, fas.faCaretRight,
  fas.faHashtag, fas.faCaretUp, fas.faCloudUpload, fas.faUpload,
  fas.faFolder, fas.faPlay, fas.faPause, fas.faVolumeMute, fas.faVolumeHigh,
  fas.faExpand, fas.faRepeat, fas.faSearch, fas.faUndo, fas.faRedo,
  fas.faFastBackward, fas.faFastForward, fas.faMagnet, fas.faClapperboard,
  fas.faPhotoVideo, fas.faArrowUpFromBracket, fas.faArrowsLeftRightToLine,
  fas.faMagnifyingGlassMinus, fas.faMagnifyingGlassPlus, fas.faCog,
  fas.faScissors, fas.faEyedropper, fas.faGrip, fas.faList, fas.faAddressCard,
  fas.faCaretRight, fas.faCaretLeft, fas.faAngleLeft, fas.faAngleRight, 
  fas.faAnglesLeft, fas.faAnglesRight, fas.faCamera, fas.faSquareCheck,
  fas.faRepeat, fas.faCopy, fas.faSync,
  fas.faBold, fas.faItalic, fas.faUnderline, fas.faListOl, fas.faListUl, fas.faLink,
  fas.faImage, fas.faVideo, fas.faCode, fas.faEraser, fas.faFileVideo, fas.faFileCode,
  fas.faTerminal, fas.faQuoteRight
)

```