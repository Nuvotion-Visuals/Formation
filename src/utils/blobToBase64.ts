/**
 * Helper function to convert a Blob object to base64 encoded string. It uses the FileReader API which is useful when dealing with binary files.
 *
 * @function blobToBase64
 * @param {Blob} blob - The Blob object to be converted to base64 string.
 * @param {Function} callback - The callback function that gets invoked once the Blob is read as a base64 string. This callback gets passed the resultant base64 string.
 *
 * @example
 * var blob = new Blob(["Hello, world!"], {type: "text/plain"});
 * blobToBase64(blob, console.log);
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob|MDN: Blob}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FileReader|MDN: FileReader}
 */
export const blobToBase64 = (blob : Blob, callback: (value: string) => void) => {
  var a = new FileReader();
  a.onload = function(e) {
    if (e.target) {
      callback(e.target.result as string);
    }
  }
  a.readAsDataURL(blob);
}