/**
 * @function getCookie
 * 
 * This function retrieves the value of a specific cookie from the browser's document.cookie object.
 * It first creates a semi-colon separated string value of the current cookies and inserts a leading semi-colon.
 * Then it splits the string into an array of cookies based on the name of the cookie we want to retrieve.
 * If the cookie with the provided name exists, there will be two parts in the array.
 * In this case, the function returns the cookie value by further splitting this array on semi-colons to ignore any following cookies.
 * If the cookie doesn't exist, this function returns undefined.
 * 
 * @param {string} name - The name of the cookie whose value is to be retrieved.
 * @returns {string | undefined} The value of the cookie if it exists, otherwise undefined.
 *
 * @example
 * 
 * // Assume document.cookie is "name=John Doe; age=30; city=Boston"
 * console.log(getCookie('name')); // Outputs: 'John Doe'
 * console.log(getCookie('address')); // Outputs: undefined
 */
export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts?.pop()?.split(';')?.shift()
}
  