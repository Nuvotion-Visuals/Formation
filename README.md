# Formation

[Storybook](https://formation-ui.netlify.app) |
[GitHub Repository](https://github.com/AVsync-LIVE/formation) |
[NPM Package](https://www.npmjs.com/package/@avsync.live/formation)

Formation is a comprehensive component library built on [React](https://reactjs.org/docs/getting-started.html), 
[Styled Components](https://styled-components.com/docs) and [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). With Formation, you can:

 - Dynamically bind page structure and styles to your data
 - Customize colors, sizing, and typography using CSS variables
 - Use the powerful dev environment and living documentation provided by [Storybook](https://formation-ui.netlify.app) 
 - Take advantage of included hooks and utilities

## Installation

```shell
yarn add @avsync.live/formation
# or
npm i @avsync.live/formation
```

## Create React App

If you're using Create React App, check out the [formation-create-react-app-example](https://stackblitz.com/edit/react-ts-xyhgvu) on StackBlitz.


## Next.js

Formation works well with the popular React framework, Next.js. Check out the [formation-next-example](https://github.com/AVsync-LIVE/formation-next-example) on GitHub for a working example of server-side rendering with styled-components.


## Electron and Nextron

Formation is perfect for creating Electron apps using the Nextron framework. Check out the [formation-nextron-example](https://github.com/AVsync-LIVE/formation-nextron-example) on GitHub to start creating cross-platform apps with Formation.


### CSS and Customization

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

[View all customiziable CSS variables](https://formation-ui.netlify.app/?path=/story/theme--theme)


### Icons

Formation uses [FontAwesome v6](https://fontawesome.com/v6/search?m=free), allowing for both pro and free icons to be used in components. 

The following icons should be included in your project to ensure all components display correctly.

```jsx
// in your app's entrypoint (_app.tsx, App.js, etc)
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fas from '@fortawesome/free-solid-svg-icons'
library.add(
  // regular
  far.faHeart, far.faPaperPlane, far.faCheckSquare, far.faSquare,
  fas.faEnvelope, far.faTrashAlt, far.faBookmark,

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
  fas.faEraser, fas.faImage
)

```


## Design System

Formation adheres to the principles of unimpeded user interface and user experience design, including minimizing distractions and interruptions, providing immediate feedback and response, emphasizing simplicity and clarity, and prioritizing ease of use and accessibility. This allows for a seamless, intuitive, and enjoyable user experience.

The key principles of unimpeded UI UX design are:
 1. Minimize distractions and interruptions: A unimpeded UI and UX design should minimize distractions and interruptions for the user. This means avoiding unnecessary animations, transitions, and pop-ups that can disrupt the user's workflow, and instead focusing on providing a clear and consistent interface that allows the user to focus on their task.

 2. Provide immediate feedback and response: A unimpeded UI and UX design should provide immediate feedback and response to the user's actions. This means responding to user input as quickly as possible, and providing clear feedback to indicate that the action has been received and is being processed.

 3. Emphasize simplicity and clarity: A unimpeded UI and UX design should emphasize simplicity and clarity in its design. This means avoiding cluttered or complex interfaces, and instead using clear and concise language, icons, and visual elements to communicate information and actions to the user.

 4. Prioritize ease of use and accessibility: A unimpeded UI and UX design should prioritize ease of use and accessibility for all users. This means designing interfaces that are easy to navigate and understand, and making sure that the design is accessible to users with disabilities or other accessibility needs.

By following these principles, designers can create interfaces and experiences that are seamless, intuitive, and enjoyable for users.