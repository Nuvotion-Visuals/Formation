export const getAlphabetLetter = (index: number): string => {
  if (index < 0 || index > 25) {
    throw new Error('Index must be between 0 and 25');
  }
  
  return String.fromCharCode(index + 97).toUpperCase();
  }