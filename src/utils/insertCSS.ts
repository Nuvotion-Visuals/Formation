/**
 * @function insertCSS
 * 
 * This function injects a CSS string into the `<head>` of the HTML document.
 * A new `<style>` tag containing the CSS string is created and appended to the `<head>` of the HTML document.
 * 
 * @param {string} cssString - The CSS string to be inserted.
 * 
 * @throws Will throw an error if the `<head>` cannot be found or the CSS fails to be appended.
 * 
 * @example
 * insertCSS(".my-class { color: red; }") 
 */
export const insertCSS = (cssString: string) => {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssString))
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(styleElement)
}
