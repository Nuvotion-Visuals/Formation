/**
 * @function shareText
 *
 * This function provides an interface for sharing text content across various platforms and apps, 
 * supported by the Web Share API provided by the user's browser.
 *
 * @param {string} str - The text content to be shared.
 * @param {(Error) => void} onError - An optional callback function that will be invoked if sharing is not supported on the device or if an error is encountered.
 * 
 * @example
 * shareText('This is some text to share', (err) => console.error('Sharing failed', err));
 */
export const shareText = (str: string, onError?: (err: Error) => void) => {
  if ('share' in navigator) {
    navigator.share({
      title: '',
      text: str,
      url: ''
    });
  } else {
    if (onError) {
      onError(new Error('Sharing is not supported on this device'));
    }
  }
}