/**
 * @function getColorFromGuid
 * 
 * This function takes a GUID (Globally Unique Identifier) string and uses it to generate a pastel color.
 * 
 * It first splits the given GUID into an array of characters and maps each character to its ASCII value.
 * Then it calculates the sum of these ASCII values. As ASCII values can be large, 
 * it uses the modulo operation to limit the range of the sum to 100.
 * This sum is then used to calculate a hue value, which will be between 0 and 360.
 * The pastel color is generated using hsl (Hue, Saturation, Lightness) color notation with the calculated hue, 
 * a saturation of 100%, and a lightness of 45%.
 * 
 * If no guid is provided, the color will default to white.
 * 
 * @param {string} guid - The GUID to use for generating a color.
 * @returns {string} The generated pastel color in hsl notation.
 *
 * @example
 * 
 * console.log(getColorFromGuid('6bd79f17-ae22-4548-9d8f-6a8c8e370a58')); // Outputs: 'hsl(84, 100%, 45%)'
 * console.log(getColorFromGuid('')); // Outputs: 'white'
 */
export const getColorFromGuid = (guid : string) => {
  if (guid) {
    const range = guid?.split('').map(i => i.charCodeAt(0)).reduce((a, b) => a + b, 0) % 100
    var hue = Math.floor((range / 100) * 360);
    var pastel = 'hsl(' + hue + ', 100%, 45%)'   
    return pastel 
  }
  return 'white'
}
