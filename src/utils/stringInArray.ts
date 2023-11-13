/**
 * @function stringInArray
 *
 * This function checks if a given string exists in an array of strings
 *
 * @param {string} str - The target string to find in the array.
 * @param {Array<string>} array - The array of strings to search in.
 *
 * @return {boolean} - Returns a boolean indicating whether the string exists in the array. 
 *                     Returns true if string is found in the array, otherwise returns false. 
 * 
 * @example
 * const fruits = ['apple', 'banana', 'cherry'];
 * 
 * stringInArray('apple', fruits); // returns true
 * stringInArray('pear', fruits); // returns false
 */
export const stringInArray = (str: string, array: string[]): boolean =>
  array.filter((item: string) => str === item).length > 0
