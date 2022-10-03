import light from '!!style-loader?injectType=lazyStyleTag!css-loader!../src/index.light.css'
import dark from '!!style-loader?injectType=lazyStyleTag!css-loader!../src/index.dark.css'

import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'

export const decorators = [
  cssVariablesTheme,
  (story, context) => {
    // const defaultBackgroundColorKey = context?.parameters?.backgrounds?.default
    // const defaultBackgroundColor = context?.parameters?.backgrounds?.values?.find(v => v.name === defaultBackgroundColorKey)?.value
    // const currentBackgroundColor = context?.globals?.backgrounds?.value ?? defaultBackgroundColor
  
    const styleContent = `
    .docs-story {
      background-color: var(--F_Background);
    }
    body {
      background-color: var(--F_Background);

    }
    `

  
    return <>
      <style>{styleContent}</style>
      <>{story(context)}</>
    </>
  }
];

import { addDecorator } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';

addDecorator(withPerformance);

// fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fas from '@fortawesome/free-solid-svg-icons'
library.add(
  // regular
  far.faHeart, far.faPaperPlane, far.faCheckSquare, far.faSquare,
  fas.faEnvelope, far.faTrashAlt,

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
  fas.faHashtag
)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  cssVariables: {
    files: {
      'Light Theme': light,
      'Dark Theme': dark,
    },
    defaultTheme: 'Light Theme'
  }
}