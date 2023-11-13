import {v4 as uuidv4} from 'uuid';

/**
 * @function generateUUID
 * 
 * This utility function generates a random UUID.
 * 
 * The items are generated using the v4 algorithm, meaning that they are random UUIDs.
 * 
 * @returns {string} A v4 UUID
 * 
 * @example
 * 
 * const id = generateUUID();
 * console.log(id);  // Prints a unique v4 UUID e.g. 'b3bb1e49-11a8-4133-965d-de4b4c2f8ae0'
 */
export function generateUUID() : string {
  return uuidv4()
}
