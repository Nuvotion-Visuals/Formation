// fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library, config } from '@fortawesome/fontawesome-svg-core'

import { 
  faHeart, faPaperPlane, faFolder, faFolderBlank, faPlusSquare
} from '@fortawesome/free-regular-svg-icons'

import { 
  faHeart as fasHeart
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHeart, faPaperPlane, faFolderBlank, faPlusSquare, fasHeart
)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}