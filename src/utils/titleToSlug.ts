/**
Converts a title string to a "slug" string, which replaces all non-alphanumeric characters with hyphens and converts it to lowercase
*
@param {string} title - The input title string
@returns {string} The "slug" string
@example
// returns "how-to-train-your-dragon"
titleToSlug("How To Train Your Dragon")
*
@example
// returns "the-hitchhiker's-guide-to-the-galaxy"
titleToSlug("The Hitchhiker's Guide To The Galaxy")
*/
export const titleToSlug = (title: string): string => {
  // Replace all non-alphanumeric characters with hyphens
  return title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}
