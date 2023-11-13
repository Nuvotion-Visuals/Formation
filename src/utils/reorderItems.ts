/**
 * @function reorderItems
 * 
 * This function generates a new order for a list of items by swapping an item from its previous index 
 * to a new index.
 * 
 * @param {array} items - An array containing the list of items need to be reordered.
 * @param {number} previousIndex - The original index of the item in the list that is being reordered.
 * @param {number} nextIndex - The new index in the list where the item will be placed.
 * 
 * @returns {array} A new array with the item moved from its previous index to the next index.
 * 
 * @example
 * const elements = ['item1', 'item2', 'item3']
 * const reorderedItems = reorderItems(elements, 0, 2); // Returns ['item2', 'item3', 'item1']
 */
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
