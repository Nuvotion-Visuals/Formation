/**
 * Creates a timestamp in the format YYYY-MM-DD-HH-MM-SS by using the Date object in JavaScript.
 * This timestamp can be used to record the current date and time in a consistent format.
 * 
 * @returns {string} timestamp
 * 
 * @example
 * // returns timestamp
 * timestamp()
 */
export const timestamp = () : string => {
  const now = new Date()
  const pad = (number: number) => number.toString().padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDay())}-${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`
}
// console.log(timestamp()) // Output: "2022-12-13-23-45-30"