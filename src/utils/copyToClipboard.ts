/**
* Copies the provided text to the system clipboard.
*
* @function copyToClipboard
*
* @param {string} str - The text to copy to the clipboard.
* @param {() => void} [onSuccess] - Optional callback function to be executed once the input string has been successfully copied to the clipboard.
* @param {(err: Error) => void} [onError] - Optional callback function to be executed if an error occurs while attempting to copy the input string to the clipboard.
*
* @throws {TypeError} - If the input is not a string.
*
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText|MDN: Clipboard API - writeText}
*
* @example
* const str = 'Text to be copied';
* copyToClipboard(str, () => console.log('Copied!'), err => console.error('An error occurred: ', err));
*/
export const copyToClipboard = (str: string, onSuccess?: () => void, onError?: (err: Error) => void) => {
  navigator.clipboard.writeText(str)
    .then(() => {
      if (onSuccess) {
        onSuccess()
      }
    })
    .catch((err) => {
      if (onError) {
        onError(err)
      }
    })
}