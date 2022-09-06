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
  reorderItems
} from './utils'
export {
  getSuperscriptOrdinal,
  getOrdinal,
  isTouchCapable,
  reorderItems
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
import { 
  ListEditor, 
  List, 
  ListItem, 
  ListItemEditor, 
  ListItems,
  Slot,
  Toolbar,
  ListItemMode,
  ListItemType,
  Lists
} from './components/ListEditor'
export {
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
  ListEditor,
  List,
  ListItemEditor,
  ListItem,
  ListItems,
  Slot,
  Switch,
  Toolbar,
  ListItemMode,
  ListItemType,
  Lists,
}

// Tissue (2)
import { Navigation } from './components/Navigation/Navigation'
import { Location } from './components/Location/Location'
import { TimePicker } from './components/TimePicker/TimePicker'
import { DatePicker } from './components/DatePicker/DatePicker'
import { Tags } from './components/Tags/Tags'
import { Tabs } from './components/Tabs/Tabs'
import { TimeZone } from './components/TimeZone/TimeZone'
export {
  Navigation,
  Location,
  TimePicker,
  DatePicker,
  Tags,
  Tabs,
  TimeZone
}

// Organs (3)
import { DateAndTimePicker } from './components/DateAndTimePicker/DateAndTimePicker'
export {
  DateAndTimePicker
}

// Organisms (4)



