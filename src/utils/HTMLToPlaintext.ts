// @ts-ignore
import h2p from 'html2plaintext'

/**
 * Converts an HTML string to plain text by stripping out HTML tags and formatting.
 * This function is useful for scenarios where raw text is needed from HTML content,
 * such as extracting text for search indexing, generating text previews from HTML documents,
 * or for any situation where HTML formatting is not desired in the output text.
 *
 * @param {string} htmlString - The HTML string to be converted to plain text.
 * @returns {string} The plain text extracted from the given HTML string.
 *
 * @example
 * // To convert a simple HTML paragraph to plain text
 * const html = "<p>Hello, world!</p>";
 * const text = HTMLToPlaintext(html);
 * console.log(text); // Outputs: "Hello, world!"
 *
 * @example
 * // To extract text from a complex HTML structure for a text summary
 * const complexHtml = "<div><h1>Title</h1><p>Some <strong>important</strong> text here.</p></div>";
 * const plainText = HTMLToPlaintext(complexHtml);
 * console.log(plainText); // Outputs: "Title Some important text here."
 */
export const HTMLToPlaintext = (htmlString: string): string => {
  return h2p(htmlString)
}
