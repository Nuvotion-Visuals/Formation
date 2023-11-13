// utils
export { getSuperscriptOrdinal } from './utils/getSuperscriptOrdinal'
export { getOrdinal } from './utils/getOrdinal'
export { isTouchCapable } from './utils/isTouchCapable'  
export { getTimezone } from './utils/getTimezone'
export { reorderItems } from './utils/reorderItems'
export { labelColors, getLabelColor } from './utils/labels'
export type LabelColor = 
  'red' | 
  'orange' | 
  'yellow' |
  'green' |
  'blue' | 
  'indigo' | 
  'purple' |
  'pink' |
  'cyan' | 
  'teal' | 
  'gray' |
  'none'
  export type LabelType = {
    name: string,
    description: string,
    labelColor: LabelColor
  }
export { getColorFromGuid } from './utils/getColorFromGuid'
export { getInitials } from './utils/getInitials'
export { capitalizeFirstLetter } from './utils/capitalizeFirstLetter'
export { copyToClipboard } from './utils/copyToClipboard'  
export { downloadFile } from './utils/downloadFile'
export { shareText } from './utils/shareText'
export { shareTextViaEmail } from './utils/shareTextViaEmail'
export { getTimeAgo } from './utils/getTimeAgo'
export { blobToBase64 } from './utils/blobToBase64'
export { timestamp } from './utils/timestamp'
export { getZoomScale } from './utils/getZoomScale'
export { stringInArray } from './utils/stringInArray'
export { getCookie } from './utils/getCookie'
export { resourceUrlToDataUrl } from './utils/resourceUrlToDataUrl'
export { resizeDataURL } from './utils/resizeDataURL'
export { markdownToHTML } from './utils/markdownToHTML'
export { HTMLtoMarkdown } from './utils/HTMLtoMarkdown' 
export { titleToSlug } from './utils/titleToSlug'
export { slugToTitle } from './utils/slugToTitle'
export { pickIndexFromArray, hashString } from './utils/pickIndexFromArray'
export { generateUUID } from './utils/generateUUID'
export { scrollToElementById } from './utils/scrollToElementById'
export { getAlphabetLetter } from './utils/getAlphabetLetter'
export { generateThumbnail } from './utils/generateThumbnail'
export { generateVideoThumbnails } from './utils/generateThumbnail'
export { blobURLToFile } from './utils/blobURLToFile'
export { insertCSS } from './utils/insertCSS'

// hooks
export { useBreakpoint } from './hooks/useBreakpoint'
export { useOnClickOutside } from './hooks/useOnClickOutside'
export { useScrollTo } from './hooks/useScrollTo'
export { useIsScrolledToBottom } from './hooks/useIsScrolledToBottom'
export { useScrollVisible } from './hooks/useScrollVisible'
export { usePrevious } from './hooks/usePrevious'

// types
export interface ItemProps {
  name?: string,
  onClick?: (e: React.MouseEvent) => void,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  minimalIcon?: boolean,
  src?: string,
  text?: string,
  labelColor?: any,
  label?: string,
  subtitle?: string,
  dateString?: string,
  title?: string,
  date?: Date,
  small?: boolean,
  href?: string,
  active?: boolean,
  spaceIcon?: boolean,
  prefix?: React.ReactNode,
  children?: React.ReactNode,
  content?: React.ReactNode,
  emphasize?: boolean,
  indent?: boolean,
  pageTitle?: string,
  newTab?: boolean,
  value?: any,
  disableBreak?: boolean,
  compact?: boolean,
  disablePadding?: boolean
}

// Atoms (0)
export { AspectRatio } from './components/AspectRatio/AspectRatio'
export { Auth } from './components/Auth/Auth'
export { Badge } from './components/Badge/Badge'
export { Box } from './components/Box/Box'
export { Break } from './components/Break/Break'
export { ColorPicker } from './components/ColorPicker/ColorPicker'
export { Empty } from './components/Empty/Empty'
export { Gap } from './components/Gap/Gap'
export { Grid } from './components/Grid/Grid'
export { Icon } from './components/Icon/Icon'
export interface Props extends FontAwesomeIconProps {
  iconPrefix?: IconPrefix | undefined
}
export { Label } from './components/Label/Label'
export { LineBreak } from './components/LineBreak/LineBreak'
export { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner'
export { NavHeader } from './components/NavHeader/NavHeader'
export { NavLogo } from './components/NavLogo/NavLogo'
export { NavMenuBars } from './components/NavMenuBars/NavMenuBars'
export { NumberRange } from './components/Sliders/NumberRange'
export { Page } from './components/Page/Page'
export { ParseHTML } from './components/ParseHTML/ParseHTML'
export { Progress } from './components/Progress/Progress'
export { Reorder } from './components/Reorder/Reorder'
export { Ripple } from './components/Ripple/Ripple'
export { Spacer } from './components/Spacer/Spacer'
export { StyleHTML } from './components/StyleHTML/StyleHTML'
export { Docking } from './components/Docking/Docking'
export { Link } from './components/Link/Link'
export { Avatar } from './components/Avatar/Avatar'
export { Placeholders } from './components/Placeholders/Placeholders'
export { Modal } from './components/Modal/Modal'
export { ImagePicker } from './components/ImagePicker/ImagePicker'
export { RichTextEditor } from './components/RichTextEditor/RichTextEditor'
export { Steps } from './components/Steps/Steps'
export { Checkboxes } from './components/Checkboxes/Checkboxes'
export { DropCorners } from './components/DragAndDrop/DropCorners'
export { GroupRadius } from './components/GroupRadius/GroupRadius'

// Molecules (1)
export { ArticlePreview } from './components/ArticlePreview/ArticlePreview'
export { Article } from './components/Article/Article'
export { SearchSortFilter } from './components/SearchSortFilter/SearchSortFilter'
export { Radio } from './components/Radio/Radio'
export { Button } from './components/Button/Button'
export interface ButtonProps {
  href?: string,
  hero?: boolean,
  name?: string,
  icon?: IconName,
  onClick?: (e: React.MouseEvent) => void,
  primary?: boolean,
  text?: string,
  blink?: boolean,
  rotate?: boolean,
  title?: string,
  disabled?: boolean,
  expand?: boolean,
  submit?: boolean,
  minimal?: boolean,
  id?: string,
  iconPrefix?: IconPrefix,
  minimalIcon?: boolean,
  secondary?: boolean,
  labelColor?: LabelColor,
  singleBlink? : boolean,
  tab? : boolean,
  newTab?: boolean,
  square?: boolean,
  circle?: boolean,
  expandVertical?: boolean,
  compact?: boolean,
  children?: React.ReactNode,
  prefix?: React.ReactNode,
  disableCenter?: boolean,
  off?: boolean,
  invertTab?: boolean
}
export { Notification } from './components/Notification/Notification'
export { TextInput } from './components/TextInput/TextInput'
export type TextInputProps = {
  name?: string,
  label?: string,
  error?: string,
  disabled?: boolean,
  compact?: boolean,
  hero?: boolean,
  success?: boolean,
  type?: string,
  id?: string,
  onChange?: (value: string) => void,
  value: string,
  autoFocus?: boolean,
  icon?: IconName,
  iconPrefix?: IconPrefix
  hint?: string,
  onClick?: (e: React.MouseEvent) => void,
  preventFocus?: boolean,
  onBlur?: () => void,
  ref?: any,
  labelColor?: LabelColor,
  onEnter?: () => void,
  onChangeEvent?: (e: any) => void,
  placeholder?: string,
  forceFocus?: boolean,
  hideOutline?: boolean,
  secondaryIcon?: IconName,
  secondaryOnClick?: (e: React.MouseEvent) => void,
  buttons?: ButtonProps[],
  canClear?: boolean,
  onClear?: () => void,
  dropdownOpen?: boolean,
  backgroundColor?: string
}
export { Dropdown } from './components/Dropdown/Dropdown'
export { Sidebar } from './components/Sidebar/Sidebar'
interface NavProps {
  type?: string,
  href?: string,
  title?: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  name?: string,
  toolTipTitle?: string,
  active?: boolean,
  newTab?: boolean,
  onClick?: (e: React.MouseEvent) => void,
  children?: React.ReactNode
}

export type Navs = NavProps[]
export { Select } from './components/Select/Select'
export { Switch } from './components/Switch/Switch'
export { LabelColorPicker } from './components/LabelColorPicker/LabelColorPicker'
export { Item } from './components/ListEditor/Item'
export { AutocompleteDropdown } from './components/AutocompleteDropdown/AutocompleteDropdown'
export { NumberInput } from './components/NumberInput/NumberInput'
export { FileUpload } from './components/FileUpload/FileUpload'
export { FileDrop } from './components/DragAndDrop/FileDrop'
export { DropTarget } from './components/DragAndDrop/DropTarget'
export { DragOrigin } from './components/DragAndDrop/DragOrigin'

// Tissue (2)
export { Navigation } from './components/Navigation/Navigation'
export { Location } from './components/Location/Location'
export { TimePicker } from './components/TimePicker/TimePicker'
export { DatePicker } from './components/DatePicker/DatePicker'
export { Tags } from './components/Tags/Tags'
export { Tabs } from './components/Tabs/Tabs'
export { TimeZone } from './components/TimeZone/TimeZone'
export { LabelEditor } from './components/LabelEditor/LabelEditor'
export { List } from './components/ListEditor/List'
export { LabelManager } from './components/LabelManager/LabelManager'
export { ExpandableList } from './components/ListEditor/ExpandableList'
export { DateAndTimePicker } from './components/DateAndTimePicker/DateAndTimePicker'
export { NumberSlider } from './components/Sliders/NumberSlider'
export { NumberSliderVertical } from './components/Sliders/NumberSliderVertical'
export { FileBrowser } from './components/FileBrowser/FileBrowser'
export { VideoPlayer } from './components/VideoPlayer/VideoPlayer'
export { AudioPlayer } from './components/AudioPlayer/AudioPlayer'

import React from 'react'

import { Link } from './components/Link/Link'
let linkComponent = Link as any
export const getLinkComponent = () => linkComponent
export const setLinkComponent = (newLinkComponent : React.ReactNode) => {
  linkComponent = newLinkComponent
}

import { LinkContext, Linker } from './components/Linker/Linker'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export {
  LinkContext,
  Linker
}
