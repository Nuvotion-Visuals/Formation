/**
 * Resizes an image dataURL to fit within maximum width and height and returns the resized image dataURL
 * 
 * @param {string} dataURL - The image dataURL
 * @param {number} [maxWidth=512] - The maximum width of the resized image
 * @param {number} [maxHeight=512] - The maximum height of the resized image
 * @param {string} [format="jpeg"] - The format of the resized image. Can be "jpeg" or "png"
 * @param {number} [compression=1.0] - The compression of the resized image (for JPEG format only)
 * @returns {string} The resized image dataURL
 * 
 * @example
 * // returns resized image dataURL
 * resizeDataURL("data:image/png;base64,iVBORw0KG...", 512, 512, "png", 0.7)
 */
export const resizeDataURL = (
  dataURL: string,
  maxWidth?: number,
  maxHeight?: number,
  format?: string,
  compression?: number,
): string => {
  const img = document.createElement("img");
  img.src = dataURL;

  const canvas = document.createElement("canvas");
  // @ts-ignore
  canvas.getContext("2d").drawImage(img, 0, 0);

  maxWidth = maxWidth || 512;
  maxHeight = maxHeight || 512;
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  }
  canvas.width = width;
  canvas.height = height;
  // @ts-ignore
  canvas.getContext("2d").drawImage(img, 0, 0, width, height);

  const resizedDataURL = canvas.toDataURL(
    format === "jpeg" || format === "jpg" || !format ? "image/jpeg" : "image/png",
    compression || 1.0,
  );

  return resizedDataURL;
};
