// fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library, config } from '@fortawesome/fontawesome-svg-core'

import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart, faPaperPlane as farPaperPlane } from '@fortawesome/free-regular-svg-icons'

library.add(faHeart, farHeart, farPaperPlane)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}