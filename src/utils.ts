export const getSuperscriptOrdinal = (number : number) => {
  if (number === 1) {
    return 'st'
  }
  if (number === 2) {
    return 'nd'
  }
  if (number === 3) {
    return 'rd'
  }
  return 'th'
}

export const getOrdinal = (number : number) => {
  const special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth']
  const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet']

  if (number < 20) return special[number]
  if (number%10 === 0) return deca[Math.floor(number/10)-2] + 'ieth'
  return deca[Math.floor(number/10)-2] + 'y-' + special[number%10]
}

export const isTouchCapable = () => 'ontouchstart' in document?.documentElement

export const reorderItems = (items: any[], previousIndex: number, nextIndex: number) => {
  const itemInPreviousPosition = items[previousIndex]
  const newItems = items

  if (previousIndex >= nextIndex) {
    newItems.splice(nextIndex, 0, itemInPreviousPosition)
    newItems.splice(previousIndex + 1, 1)
  }
  else {
    newItems.splice(previousIndex, 1)
    newItems.splice(nextIndex, 0, itemInPreviousPosition)
  }
  return newItems
}