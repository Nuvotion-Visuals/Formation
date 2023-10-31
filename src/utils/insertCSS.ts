export const insertCSS = (cssString: string) => {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssString))
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(styleElement)
}
