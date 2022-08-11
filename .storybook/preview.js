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
      background-color: var(--Background);
    }
    body {
      background-color: var(--Background);

    }
    `

  
    return <>
      <style>{styleContent}</style>
      <>{story(context)}</>
    </>
  }
];


// fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library, config } from '@fortawesome/fontawesome-svg-core'

import { 
  faHeart, faPaperPlane, faFolder, faFolderBlank, faPlusSquare, faSquare, faCheckSquare, faBookmark
} from '@fortawesome/free-regular-svg-icons'

import { 
  faHeart as fasHeart, faEllipsisVertical as fasEllipsisVertical,
  faTimes as fasTimes, faPlus as fasPlus, faSearch as fasSearch,
  faSortAlphaDown as fasSortAlphaDown, faFilter as fasFilter,
  faSortAlphaUp as fasSortAlphaUp, faCalendarAlt as fasCalendarAlt, faChevronCircleRight, faChevronCircleLeft,
  faCheck, faTimes, faExclamationTriangle, faInfoCircle, faChevronDown, faChevronUp,
  faEnvelope, faMapPin, faLock, faUser, faGlobe, faUsers, faPlus,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHeart, faPaperPlane, faFolderBlank, faPlusSquare, fasHeart,
  fasEllipsisVertical, fasTimes, fasPlus, fasSearch, fasSortAlphaDown,
  fasFilter, fasSortAlphaUp, fasCalendarAlt, faSquare, faCheckSquare,
  faEnvelope, faMapPin, faLock, faUser, faGlobe, faUsers, faPlus, faBookmark,
  
  faChevronCircleRight, faChevronCircleLeft,
  faCheck, faTimes, faExclamationTriangle, faInfoCircle, faChevronDown, faChevronUp,
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