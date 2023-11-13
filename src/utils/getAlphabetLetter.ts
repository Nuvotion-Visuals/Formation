/**
 * @function getAlphabetLetter
 * 
 * This utility function returns the alphabet letter at the given index.
 * 
 * It uses ASCII values for determining the alphabet letter. The ASCII value of 'a' is 97, so we add the index to 97 and convert it into a character.
 * The result is capitalized before being returned.
 * 
 * Note: The function throws an error if the index is less than 0 or greater than 25.
 * 
 * @param {number} index - The position of the letter in the alphabet, where index 0 represents the letter 'A' and index 25 represents 'Z'.
 * @returns {string} The uppercase alphabet letter at the given index.
 *
 * @throws Will throw an error if the index is less than 0 or greater than 25.
 * 
 * @example
 * 
 * console.log(getAlphabetLetter(0)); // Outputs: 'A'
 * console.log(getAlphabetLetter(25)); // Outputs: 'Z'
 * console.log(getAlphabetLetter(13)); // Outputs: 'N'
 * console.log(getAlphabetLetter(26)); // Throws Error: 'Index must be between 0 and 25'
 */
export const getAlphabetLetter = (index: number): string => {
  if (index < 0 || index > 25) {
    throw new Error('Index must be between 0 and 25');
  }
  
  return String.fromCharCode(index + 97).toUpperCase();
  }