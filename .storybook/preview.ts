import type { Preview } from "@storybook/react";

import '../src/index.dark.css'

// fontawesome
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
  fas.faAnglesLeft, fas.faAnglesRight, fas.faCamera
)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
