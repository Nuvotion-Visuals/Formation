/**
* Helper function to capitalize the first letter of a given string.
*
* @function capitalizeFirstLetter
*
* @param {string} string - The string whose first letter will be capitalized.
*
* @returns {string} - The input string with its first letter capitalized.
*
* @throws {TypeError} - If the input is not a string.
*
* @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String|MDN: String}
*
* @example
* const str = 'hello world';
* const capitalizedStr = capitalizeFirstLetter(str);
* 
* console.log(capitalizedStr); // 'Hello world'
*/
export const capitalizeFirstLetter = (string: string) => string[0].toUpperCase() + string.substring(1)
