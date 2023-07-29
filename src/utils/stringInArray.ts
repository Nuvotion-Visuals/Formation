// This function checks if a given string exists in an array of strings. 
export const stringInArray = (str: string, array: string[]): boolean =>
  array.filter((item: string) => str === item).length > 0
