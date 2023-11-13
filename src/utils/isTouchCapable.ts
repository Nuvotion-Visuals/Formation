/**
 * @function isTouchCapable
 * 
 * This function checks if the current device supports touch events.
 * It uses the 'ontouchstart' property to detect touch capability.
 * This method returns true if touch events are enabled, otherwise false.
 * 
 * @returns {boolean} Returns a boolean indicating whether the device supports touch events.
 * 
 * @example
 * const touchEnabled = isTouchCapable() // true or false
 */
export const isTouchCapable = () => typeof document !== 'undefined' ? 'ontouchstart' in document?.documentElement : false
