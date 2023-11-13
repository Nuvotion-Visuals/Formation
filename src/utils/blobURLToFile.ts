/**
 * Helper function to convert a blob URL to a `File` object. It uses the Fetch API to get the blob at the specified URL, then uses
 * it to construct a new `File` object.
 *
 * @function blobURLToFile
 *
 * @param {string} blobUrl - The URL where the blob can be fetched from.
 * @param {string} fileName - The name to use for the `File` object.
 *
 * @returns {Promise<File>} - A `Promise` that resolves to a `File` object representing the blob.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/File|MDN: File}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response/blob|MDN: Response.blob}
 *
 * @example
 * const url = 'http://example.com/image.png';
 * const file = await blobURLToFile(url, 'image.png');
 */
export const blobURLToFile = async (blobUrl: string, fileName: string): Promise<File> => {
  const response = await fetch(blobUrl)
  const blob = await response.blob()
  return new File([blob], fileName, { type: blob.type })
}
