// Based on: https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de

// Explaination:
// internal.ts is the single source of truth for
// importing and exporting internal dependencies,
// including components, utils, and types.
// By explictly determining module loading order
// circular dependency errors are avoided.
// In addtion, it provides a simple and consistent 
// import path in components, rather than varying
// relative paths

// Adding new imports/exports:
// Put the object in the appropriate section based
// on its levels of internal dependencies. 
// In this example, A, B, and C represent components:
//           A : No internal dependencies
//      A -> B : 1 level
// A -> B -> C : 2 levels

// utils
import {
  getSuperscriptOrdinal,
  getOrdinal,
  isTouchCapable,
  reorderItems,
  getBackground,
  getOutline,
  getInitials,
  getColorFromGuid,
  getTimezone,
  copyToClipboard,
  downloadFile,
  shareText,
  shareTextViaEmail,
  resourceUrlToDataUrl,
  resizeDataURL,
  calculateFileHash,
  getCookie,
  getTimeAgo,
  getZoomScale,
  capitalizeFirstLetter,
  stringInArray,
  blobToBase64,
  timestamp,
  markdownToHTML,
  HTMLtoMarkdown
} from './utils'
export {
  getSuperscriptOrdinal,
  getOrdinal,
  isTouchCapable,
  reorderItems,
  getBackground,
  getOutline,
  getInitials,
  getColorFromGuid,
  getTimezone,
  copyToClipboard,
  downloadFile,
  shareText,
  shareTextViaEmail,
  resourceUrlToDataUrl,
  resizeDataURL,
  calculateFileHash,
  getCookie,
  getTimeAgo,
  getZoomScale,
  capitalizeFirstLetter,
  stringInArray,
  blobToBase64,
  timestamp,
  markdownToHTML,
  HTMLtoMarkdown
}

// hooks
import { 
  useBreakpoint,
  useOnClickOutside,
  useScrollTo
} from './hooks'
export {
  useBreakpoint,
  useOnClickOutside,
  useScrollTo
}

// types
import { Props as ItemProps } from './components/ListEditor/Item'
export {
  ItemProps
}

// Atoms (0)
import { AspectRatio } from './components/AspectRatio/AspectRatio'
import { Auth } from './components/Auth/Auth'
import { Badge } from './components/Badge/Badge'
import { Box } from './components/Box/Box'
import { Break } from './components/Break/Break'
import { ColorPicker } from './components/ColorPicker/ColorPicker'
import { Empty } from './components/Empty/Empty'
import { Gap } from './components/Gap/Gap'
import { Grid } from './components/Grid/Grid'
import { Icon } from './components/Icon/Icon'
import { Label } from './components/Label/Label'
import { LineBreak } from './components/LineBreak/LineBreak'
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner'
import { NavHeader } from './components/NavHeader/NavHeader'
import { NavLogo } from './components/NavLogo/NavLogo'
import { NavMenuBars } from './components/NavMenuBars/NavMenuBars'
import { NumberRange } from './components/NumberRange/NumberRange'
import { NumberSlider } from './components/NumberSlider/NumberSlider'
import { Page } from './components/Page/Page'
import { ParseHTML } from './components/ParseHTML/ParseHTML'
import { Progress } from './components/Progress/Progress'
import { Reorder } from './components/Reorder/Reorder'
import { Ripple } from './components/Ripple/Ripple'
import { Spacer } from './components/Spacer/Spacer'
import { StyleHTML } from './components/StyleHTML/StyleHTML'
import { Docking } from './components/Docking/Docking'
import { Link } from './components/Link/Link'
import { Avatar } from './components/Avatar/Avatar'
import { Placeholders } from './components/Placeholders/Placeholders'
import { Modal } from './components/Modal/Modal'
import { ImagePicker } from './components/ImagePicker/ImagePicker'
import { RichTextEditor } from './components/RichTextEditor/RichTextEditor'
import { Steps } from './components/Steps/Steps'

export {
  AspectRatio,
  Auth,
  Badge,
  Box,
  Break,
  ColorPicker,
  Empty,
  Gap,
  Grid,
  Icon,
  Label,
  LineBreak,
  LoadingSpinner,
  NavHeader,
  NavLogo,
  NavMenuBars,
  NumberRange,
  NumberSlider,
  Page,
  ParseHTML,
  Progress,
  Reorder,
  Ripple,
  Spacer,
  StyleHTML,
  Docking,
  Link,
  Avatar,
  Placeholders,
  Modal,
  ImagePicker,
  RichTextEditor,
  Steps
}

// Molecules (1)
import { ArticlePreview } from './components/ArticlePreview/ArticlePreview'
import { Article } from './components/Article/Article'
import { Search } from './components/Search/Search'
import { Radio } from './components/Radio/Radio'
import { Button } from './components/Button/Button'
import { Notification } from './components/Notification/Notification'
import { TextInput } from './components/TextInput/TextInput'
import { Dropdown, OptionsType } from './components/Dropdown/Dropdown'
import { Sidebar, Navs } from './components/Sidebar/Sidebar'
import { Select } from './components/Select/Select'
import { Switch } from './components/Switch/Switch'
import { LabelColorPicker } from './components/LabelColorPicker/LabelColorPicker'
import { ActivityEditor } from './components/Timeline/ActivityEditor'
import { Item } from './components/ListEditor/Item'
export {
  ActivityEditor,
  ArticlePreview,
  Article,
  Search,
  Radio,
  Button,
  Notification,
  TextInput,
  Dropdown, OptionsType,
  Sidebar, Navs,
  Select,
  Item,
  Switch,
  LabelColorPicker
}

// Tissue (2)
import { Navigation } from './components/Navigation/Navigation'
import { Location } from './components/Location/Location'
import { TimePicker } from './components/TimePicker/TimePicker'
import { DatePicker } from './components/DatePicker/DatePicker'
import { Tags } from './components/Tags/Tags'
import { Tabs } from './components/Tabs/Tabs'
import { TimeReference } from './components/Timeline/TimeReference'
import { TimelineSurface } from './components/Timeline/TimelineSurface'
import { TimeZone } from './components/TimeZone/TimeZone'
import { LabelEditor } from './components/LabelEditor/LabelEditor'
import { List } from './components/ListEditor/List'
export {
  Navigation,
  Location,
  TimePicker,
  DatePicker,
  Tags,
  TimeReference,
  TimelineSurface,
  Tabs,
  TimeZone,
  LabelEditor,
  List
}

// Organs (3)
import { LabelManager } from './components/LabelManager/LabelManager'
import { Timeline } from './components/Timeline/Timeline'
export {
  LabelManager,
  Timeline
}
import { ExpandableList } from './components/ListEditor/ExpandableList'

export {
  DateAndTimePicker,
  ExpandableList
}

// Organisms (4)

import React from 'react'

let linkComponent = Link as any
export const getLinkComponent = () => linkComponent
export const setLinkComponent = (newLinkComponent : React.ReactNode) => {
  linkComponent = newLinkComponent
}