/**
 * @function getZoomScale
 * 
 * This function returns the current zoom scale factor applied to the document.
 * The zoom scale factor is obtained from the CSS variable '--F_Zoom' and it's important
 * for maintaining visual consistency across different zoom levels.
 * 
 * Note that '--F_Zoom' is a CSS variable that should be updated dynamically in your project
 * when changing the zoom level. This function is useful in cases where you need this value in your 
 * JavaScript computations.
 *
 * @returns {number} The current zoom scale factor of the document.
 *
 * @example
 * getZoomScale() // Output: 0.8
 */
export const getZoomScale = () : number => 
  1 / Number(getComputedStyle(document.documentElement).getPropertyValue('--F_Zoom'))
