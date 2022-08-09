// fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library, config } from '@fortawesome/fontawesome-svg-core'

import { 
  faHeart, faPaperPlane, faFolder, faFolderBlank, faPlusSquare, faSquare, faCheckSquare
} from '@fortawesome/free-regular-svg-icons'

import { 
  faHeart as fasHeart, faEllipsisVertical as fasEllipsisVertical,
  faTimes as fasTimes, faPlus as fasPlus, faSearch as fasSearch,
  faSortAlphaDown as fasSortAlphaDown, faFilter as fasFilter,
  faSortAlphaUp as fasSortAlphaUp, faCalendarAlt as fasCalendarAlt, faChevronCircleRight, faChevronCircleLeft,
  faCheck, faTimes, faExclamationTriangle, faInfoCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHeart, faPaperPlane, faFolderBlank, faPlusSquare, fasHeart,
  fasEllipsisVertical, fasTimes, fasPlus, fasSearch, fasSortAlphaDown,
  fasFilter, fasSortAlphaUp, fasCalendarAlt, faSquare, faCheckSquare,
  
  
  faChevronCircleRight, faChevronCircleLeft,
  faCheck, faTimes, faExclamationTriangle, faInfoCircle
)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#121212',
      },
      {
        name: 'light',
        value: '#FFFFFF',
      }
    ],
  },
}