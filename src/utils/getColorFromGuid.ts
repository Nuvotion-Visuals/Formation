export const getColorFromGuid = (guid : string) => {
  if (guid) {
    const range = guid?.split('').map(i => i.charCodeAt(0)).reduce((a, b) => a + b, 0) % 100
    var hue = Math.floor((range / 100) * 360);
    var pastel = 'hsl(' + hue + ', 100%, 45%)'   
    return pastel 
  }
  return 'white'
}
