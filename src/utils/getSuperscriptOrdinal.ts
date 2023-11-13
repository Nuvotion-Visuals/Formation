/**
 * @function getSuperscriptOrdinal
 * 
 * This function returns the superscript ordinal of a given number. It's a string
 * that represents the generalized form of the common representation for ordinals 
 * (e.g., "1st", "2nd", "3rd"). The output from this function would be 'st', 'nd', 'rd', or 'th'
 * depending on the input number, which presumes that it has already been resolved to its 
 * correct English ordinal.
 * 
 * It can be used in any scenario where the ordinal indicator needs to be displayed differently,
 * typically in superscripted form (e.g., academia reports, footnotes or bibliography references)
 * 
 * @param {number} number - A number to get its superscript ordinal.
 * @returns {string} The superscript suffix for the ordinal of the number.
 *
 * @example
 * 
 * console.log(getSuperscriptOrdinal(1)); // Outputs: 'st'
 * console.log(getSuperscriptOrdinal(2)); // Outputs: 'nd'
 * console.log(getSuperscriptOrdinal(3)); // Outputs: 'rd'
 * console.log(getSuperscriptOrdinal(4)); // Outputs: 'th'
 */
export const getSuperscriptOrdinal = (number : number) => {
  if (number === 1) {
    return 'st'
  }
  if (number === 2) {
    return 'nd'
  }
  if (number === 3) {
    return 'rd'
  }
  return 'th'
}