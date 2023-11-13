/**
 * @function getOrdinal
 * 
 * This function returns the ordinal form of a given number, i.e.,
 * a number indicating position/order in a series (e.g., "1st", "2nd", "3rd", and so on).
 * Ordinals are used to designate place in a series or denote ranks or measurements.
 * 
 * English ordinals up to nineteen (e.g,. "first", "second", "third") are returned directly
 * from a list of special array. Beyond that, ordinals are constructed by appending appropriate
 * English suffixes.
 * 
 * @param {number} number - A number to get its ordinal form.
 * @returns {string} The ordinal form of the number.
 *
 * @example
 * 
 * console.log(getOrdinal(0)); // Outputs: 'zeroth'
 * console.log(getOrdinal(1)); // Outputs: 'first'
 * console.log(getOrdinal(13)); // Outputs: 'thirteenth'
 * console.log(getOrdinal(25)); // Outputs: 'twenty-fifth'
 */
export const getOrdinal = (number : number) => {
  const special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth']
  const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet']

  if (number < 20) return special[number]
  if (number%10 === 0) return deca[Math.floor(number/10)-2] + 'ieth'
  return deca[Math.floor(number/10)-2] + 'y-' + special[number%10]
}
