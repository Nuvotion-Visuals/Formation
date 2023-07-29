/**
Converts a "slug" string to a title case string, meaning the first letter of each word is capitalized, while considering certain lowercase words that should not be capitalized
*
@param {string} slug - The input "slug" string
@returns {string} The title case string
@example
// returns "How To Train Your Dragon"
slugToTitle("how-to-train-your-dragon")
*
@example
// returns "The Hitchhiker's Guide To The Galaxy"
slugToTitle("the-hitchhiker's-guide-to-the-galaxy")
*/
export const slugToTitle = (slug: string): string => {
  // Replace hyphens with spaces
  const title = slug.replace(/-/g, ' ');

  // Split the title into words
  const words = title.split(' ');

  // Create an array of lowercase words that should not be capitalized
  const lowercaseWords = [
    'a', 'an', 'and', 'as', 'at', 'but', 'by',
    'for', 'if', 'in', 'nor', 'of', 'off', 'on',
    'or', 'per', 'so', 'the', 'to', 'up', 'via', 'yet'
  ];

  // Capitalize each word, unless it should be lowercase
  return words.map((word) => {
    return lowercaseWords.includes(word) ? word : word.replace(/\b\w/g, (w) => w.toUpperCase());
  }).join(' ');
}