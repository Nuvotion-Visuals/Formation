/**
* Triggers a file download from a given string.
*
* @function downloadFile
*
* @param {string} str - The string that should be written to the downloaded file.
* @param {string} filename - The filename that should be assigned to the downloaded file.
* @param {string} mimeType - The MIME type of the file to be downloaded.
*
* @throws {TypeError} - If any of the input parameters is not a string.
*
* @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types|MDN: Basics of HTTP - MIME types}
*
* @example
* const str = 'Text to be saved in the file';
* const filename = 'textfile.txt';
* const mimeType = 'text/plain';
* downloadFile(str, filename, mimeType);
*/
export const downloadFile = (str: string, filename: string, mimeType: string) => {
  const link = document.createElement('a');
  link.setAttribute('download', filename);
  link.setAttribute('href', `data:${mimeType};charset=utf-8,${encodeURIComponent(str)}`);
  link.click();
}