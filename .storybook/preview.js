// fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library, config } from '@fortawesome/fontawesome-svg-core'

import { 
  faHeart, faPaperPlane, faFolder, faFolderBlank, faPlusSquare, 
} from '@fortawesome/free-regular-svg-icons'

import { 
  faHeart as fasHeart, faEllipsisVertical as fasEllipsisVertical
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHeart, faPaperPlane, faFolderBlank, faPlusSquare, fasHeart,
  fasEllipsisVertical
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