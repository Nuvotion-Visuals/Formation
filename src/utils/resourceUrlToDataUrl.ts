/**
 * Convert resource url to data url
 * 
 * @param {string} url - The resource url
 * @returns {Promise<string>} dataUrl
 * 
 * @example
 * // returns dataUrl
 * resourceUrlToDataUrl("https://example.com/image.jpg")
 */
export const resourceUrlToDataUrl = async (url : string)  => {
  try {
    const blob = await fetch(url).then(response => response.blob())
    const dataUrl = await new Promise<string>(resolve => {
      let reader = new FileReader()
      reader.onload = () => resolve((reader.result as string))
      reader.readAsDataURL(blob)
    }) 
    return (dataUrl as string)
  }
  catch (e) {
    console.log(e)
    return ''
  }
}
