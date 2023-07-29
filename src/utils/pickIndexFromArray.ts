
/**
* Hash a string to a number
*
* @param {string} str - The input string
* @return {number} hash - The hashed number 
*/
export function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
      hash = hash & hash
  }
  return hash
}

/**
* Returns an index of an array based on a string's hash
* This function ensures that the index returned is always the same for the same input string
*
* @param {string} str - The input string to hash
* @param {Array} arr - The input array
* @return {number} index - The index of the array based on the string's hash
*
* @example
* // returns 2
* pickIndexFromArray("Hello World", [1,2,3,4,5])
* 
* @example
* // returns 0
* pickIndexFromArray("Hello World", [7,8,9,10])
*/

export function pickIndexFromArray(str: string, arr: Array<any>): number {
  const hash = hashString(str)
  const index = hash % arr.length
  return index
}
