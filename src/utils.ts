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

export const getBackground = (color: string) => {
  switch(color) {
    case 'red':
      return 'var(--F_Label_Background_Red)'
    case 'pink':
      return 'var(--F_Label_Background_Pink)'
    case 'purple':
      return 'var(--F_Label_Background_Purple)'
    case 'darkpurple':
      return 'var(--F_Label_Background_Dark_Purple)'
    case 'indigo':
      return 'var(--F_Label_Background_Indigo)'
    case 'blue':
      return 'var(--F_Label_Background_Blue)'
    case 'lightblue':
      return 'var(--F_Label_Background_Light_Blue)'
    case 'cyan':
      return 'var(--F_Label_Background_Cyan)'
    case 'teal':
      return 'var(--F_Label_Background_Teal)'
    case 'orange':
      return 'var(--F_Label_Background_Orange)'
    case 'gray':
    case 'grey':
      return 'var(--F_Label_Background_Gray)'
    default:
      return color
      
  }
}

export const getOutline = (color: string) => {
  switch(color) {
    case 'red':
      return 'var(--F_Label_Outline_Red)'
    case 'pink':
      return 'var(--F_Label_Outline_Pink)'
    case 'purple':
      return 'var(--F_Label_Outline_Purple)'
    case 'darkpurple':
      return 'var(--F_Label_Outline_Dark_Purple)'
    case 'indigo':
      return 'var(--F_Label_Outline_Indigo)'
    case 'blue':
      return 'var(--F_Label_Outline_Blue)'
    case 'lightblue':
      return 'var(--F_Label_Outline_Light_Blue)'
    case 'cyan':
      return 'var(--F_Label_Outline_Cyan)'
    case 'teal':
      return 'var(--F_Label_Outline_Teal)'
    case 'orange':
      return 'var(--F_Label_Outline_Orange)'
    default:
      return 'var(--F_Label_Outline_Gray)'
  }
}

export const renderRow = (time: number) => {
  switch (time) {
    case 0.00:
      return 1;
      break;
    case 0.15:
      return 2;
      break;
    case 0.30:
      return 3;
      break;
    case 0.45:
      return 4;
      break;
    case 1.00:
      return 5;
      break;
    case 1.15:
      return 6;
      break;
    case 1.30:
      return 7;
      break;
    case 1.45:
      return 8;
      break;
    case 2.00:
      return 9;
      break;
    case 2.15:
      return 10;
      break;
    case 2.30:
      return 11;
      break;
    case 2.45:
      return 12;
      break;
    case 3.00:
      return 13;
      break;
    case 3.15:
      return 14;
      break;
    case 3.30:
      return 15;
      break;
    case 3.45:
      return 16;
      break;
    case 4.00:
      return 17;
      break;
    case 4.15:
      return 18;
      break;
    case 4.30:
      return 19;
      break;
    case 4.45:
      return 20;
      break;
    case 5.15:
      return 21;
      break;
    case 5.15:
      return 22;
      break;
    case 5.30:
      return 23;
      break;
    case 5.45:
      return 24;
      break;
    case 6.00:
      return 25;
      break;
    case 6.15:
      return 26;
      break;
    case 6.30:
      return 27;
      break;
    case 6.45:
      return 28;
      break;
    case 7.00:
      return 29;
      break;
    case 7.15:
      return 30;
      break;
    case 7.30:
      return 31;
      break;
    case 7.45:
      return 32;
      break;
    case 8.00:
      return 33;
      break;
    case 8.15:
      return 34;
      break;
    case 8.30:
      return 35;
      break;
    case 8.45:
      return 36;
      break;
    case 9.00:
      return 37;
      break;
    case 9.15:
      return 38;
      break;
    case 9.30:
      return 39;
      break;
    case 9.45:
      return 40;
      break;
    case 10.00:
      return 41;
      break;
    case 10.15:
      return 42;
      break;
    case 10.30:
      return 43;
      break;
    case 10.45:
      return 44;
      break;
    case 11.00:
      return 45;
      break;
    case 11.15:
      return 46;
      break;
    case 11.30:
      return 47;
      break;
    case 11.45:
      return 48;
      break;
    case 12.00:
      return 49;
      break;
    case 12.15:
      return 50;
      break;
    case 12.30:
      return 51;
      break;
    case 12.45:
      return 52;
      break;
    case 13.00:
      return 53;
      break;
    case 13.15:
      return 54;
      break;
    case 13.30:
      return 55;
      break;
    case 13.45:
      return 56;
      break;
    case 14.00:
      return 57;
      break;
    case 14.15:
      return 58;
      break;
    case 14.30:
      return 59;
      break;
    case 14.45:
      return 60;
      break;
    case 15.00:
      return 61;
      break;
    case 15.15:
      return 62;
      break;
    case 15.30:
      return 63;
      break;
    case 15.45:
      return 64;
      break;
    case 16.00:
      return 65;
      break;
    case 16.15:
      return 66;
      break;
    case 16.30:
      return 67;
      break;
    case  16.45:
      return 68;
      break;
    case 17.00:
      return 69;
      break;
    case 17.15:
      return 70;
      break;
    case 17.30:
      return 71;
      break;
    case 17.45:
      return 72;
      break;
    case 18.00:
      return 73;
      break;
    case 18.15:
      return 74;
      break;
    case 18.30:
      return 75;
      break;
    case 18.45:
      return 76;
      break;
    case 19.00:
      return 77;
      break;
    case 19.15:
      return 78;
      break;
    case 19.30:
      return 79;
      break;
    case 19.45:
      return 80;
      break;
    case 20.00:
      return 81;
      break;
    case 20.15:
      return 82;
      break;
    case 20.30:
      return 83;
      break;
    case 20.45:
      return 84;
      break;
    case 21.00:
      return 85;
      break;
    case 21.15:
      return 86;
      break;
    case 21.30:
      return 87;
      break;
    case 21.45:
      return 88;
      break;
    case 22.00:
      return 89;
      break;
    case 22.15:
      return 90;
      break;
    case 22.30:
      return 91;
      break;
    case 22.45:
      return 92;
      break;
    case 23.00:
      return 93;
      break;
    case 23.15:
      return 94;
      break;
    case 23.30:
      return 95;
      break;
    case 23.45:
      return 96;
      break;
    case 24.00:
      return 97;
      break;
    case 24.15:
      return 98;
      break;
    case 24.30:
      return 99;
      break;
    case 24.45:
      return 100;
      break;
    case 25.00:
      return 101;
      break;
    case 25.15:
      return 102;
      break;
    case 25.30:
      return 103;
      break;
    case 25.45:
      return 104;
      break;
    case 26.00:
      return 105;
      break;
    case 26.15:
      return 106;
      break;
    case 26.30:
      return 107;
      break;
    case 26.45:
      return 108;
      break;
    case 27.00:
      return 109;
      break;
    case 27.15:
      return 110;
      break;
    case 27.30:
      return 111;
      break;
    case 27.45:
      return 112;
      break;
    case 28.00:
      return 113;
  }
}