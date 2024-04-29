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
export const getInitials = (name: string) => {
  // Regular expression to match common emojis
  const emojiRegex = /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/u;

  const match = name.match(emojiRegex);
  if (match && match[0]) {
    return match[0]; // Return the emoji if present
  }

  // Split name, filter initials, and convert to uppercase
  return name
    .split(' ')
    .map((n, i, a) => i === 0 || i + 1 === a.length ? n[0] : null)
    .join('')
    .toUpperCase()
}