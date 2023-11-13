/**
 * @function getInitials
 * 
 * This function retrieves the initials from a name. It splits the name into words, 
 * and then takes the first character of the first word and last word to form the initials.
 * The resulting initials are then converted to uppercase.
 * 
 * If the name consists of a single word, the first letter of this word is taken twice.
 * 
 * @param {string} name - The full name from which initials are to be extracted.
 * @returns {string} The initials extracted from the name, converted to uppercase.
 *
 * @example
 * 
 * console.log(getInitials('John Doe')); // Outputs: 'JD'
 * console.log(getInitials('John')); // Outputs: 'JJ'
 */
export const getInitials = (name : string) => 
  name?.split(' ').map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join('').toUpperCase()

