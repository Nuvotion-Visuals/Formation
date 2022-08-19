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

// hooks and utils
export * from './utils'
export * from './hooks'

// No internal dependencies
export * from './components/Auth/Auth'
export * from './components/Ripple/Ripple'
export * from './components/LoadingSpinner/LoadingSpinner'
export * from './components/RichText/RichText'
export * from './components/Empty/Empty'
export * from './components/AspectRatio/AspectRatio'
export * from './components/StyleHTML/StyleHTML'
export * from './components/LineBreak/LineBreak'
export * from './components/Box/Box'
export * from './components/Gap/Gap'
export * from './components/Spacer/Spacer'
export * from './components/Icon/Icon'
export * from './components/ColorPicker/ColorPicker'
export * from './components/Break/Break'
export * from './components/Grid/Grid'
export * from './components/NavHeader/NavHeader'
export * from './components/HamburgerMenu/HamburgerMenu'
export * from './components/NavLogo/NavLogo'
export * from './components/NumberSlider/NumberSlider'
export * from './components/NumberRange/NumberRange'
export * from './components/Page/Page'


// 1 level of dependencies
export * from './components/ArticlePreview/ArticlePreview'
export * from './components/Article/Article'
export * from './components/Search/Search'
export * from './components/Radio/Radio'
export * from './components/Button/Button'
export * from './components/Notification/Notification'
export * from './components/TextInput/TextInput'
export * from './components/Dropdown/Dropdown'
export * from './components/Sidebar/Sidebar'
export * from './components/Select/Select'

export * from './components/ListEditor'


// 2 levels of dependencies
export * from './components/Navigation/Navigation'
export * from './components/Location/Location'
export * from './components/TimePicker/TimePicker'
export * from './components/DatePicker/DatePicker'
export * from './components/Tags/Tags'
export * from './components/Tabs/Tabs'

// 3 levels of dependencies
export * from './components/TimeZone/TimeZone'

// 4 levels of dependencies
export * from './components/DateAndTimePicker/DateAndTimePicker'


