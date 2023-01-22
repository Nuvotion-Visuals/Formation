import SparkMD5 from 'spark-md5';

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

export const isTouchCapable = () => typeof document !== 'undefined' ? 'ontouchstart' in document?.documentElement : false

export const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone

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

export const getLabelColor = (color: ColorType): string => {
  switch(color) {
    case 'red':
      return 'var(--F_Label_Background_Red)'
      case 'orange':
        return 'var(--F_Label_Background_Orange)'
    case 'yellow':
      return 'var(--F_Label_Background_Yellow)'
    case 'green':
      return 'var(--F_Label_Background_Green)'
    case 'blue':
      return 'var(--F_Label_Background_Blue)'
    case 'indigo':
      return 'var(--F_Label_Background_Indigo)'
    case 'violet':
      return 'var(--F_Label_Background_Violet)'
    case 'pink':
      return 'var(--F_Label_Background_Pink)'
    case 'cyan':
      return 'var(--F_Label_Background_Cyan)'
    case 'teal':
      return 'var(--F_Label_Background_Teal)'
    case 'gray':
      return 'var(--F_Label_Background_Gray)'
    default:
      return 'none'
  }
}

export const getColorFromGuid = (guid : string) => {
  if (guid) {
    const range = guid?.split('').map(i => i.charCodeAt(0)).reduce((a, b) => a + b, 0) % 100
    var hue = Math.floor((range / 100) * 360);
    var pastel = 'hsl(' + hue + ', 100%, 45%)'   
    return pastel 
  }
  return 'white'
}

function shadeColor(color: string, percent: number) {

  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = R * (100 + percent) / 100;
  G = G * (100 + percent) / 100;
  B = B * (100 + percent) / 100;

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
B = (B<255)?B:255;  

  R = Math.round(R)
  G = Math.round(G)
  B = Math.round(B)

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

export function calculateHoverColor(hex: string): string {
  return shadeColor(hex, -8)
}

export function calculateActiveColor(hex: string): string {
  return shadeColor(hex, -12)
}

export const getInitials = (name : string) => 
  name?.split(' ').map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join('')


export const capitalizeFirstLetter = (string: string) => string[0].toUpperCase() + string.substring(1)

export const copyToClipboard = (str: string, onSuccess?: () => void, onError?: (err: Error) => void) => {
  navigator.clipboard.writeText(str)
    .then(() => {
      if (onSuccess) {
        onSuccess()
      }
    })
    .catch((err) => {
      if (onError) {
        onError(err)
      }
    })
}
// copyToClipboard('Hello, world!', () => {
//   // clipboard successfully updated
// }, (err) => {
//   // an error occurred
// });


export const downloadFile = (str: string, filename: string, mimeType: string) => {
  const link = document.createElement('a');
  link.setAttribute('download', filename);
  link.setAttribute('href', `data:${mimeType};charset=utf-8,${encodeURIComponent(str)}`);
  link.click();
}
// downloadFile('<h1>Hello, world!</h1>', 'hello-world.html', 'text/html');
// downloadFile('#include <iostream>\nint main() {\n  std::cout << "Hello, world!" << std::endl;\n  return 0;\n}', 'hello-world.cpp', 'text/plain');
// downloadFile('{"message": "Hello, world!"}', 'hello-world.json', 'application/json');
// downloadFile('# Hello, world!', 'hello-world.md', 'text/markdown');
// downloadFile('Hello, world!', 'hello-world.pdf', 'application/pdf');
// downloadFile('Hello, world!', 'hello-world.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
// downloadFile('Hello, world!', 'hello-world.pdf', 'application/pdf');

export const shareText = (str: string, onError?: (err: Error) => void) => {
  if ('share' in navigator) {
    navigator.share({
      title: '',
      text: str,
      url: ''
    });
  } else {
    if (onError) {
      onError(new Error('Sharing is not supported on this device'));
    }
  }
}
// shareText('Hello, world!', (err) => {
//   // sharing is not supported on this device
// });

export const shareTextViaEmail = (text: string, subject?: string, sender?: string) => {
  let email = 'mailto:';

  if (sender) {
    email += `?sender=${encodeURIComponent(sender)}`;
  }

  if (subject) {
    email += `&subject=${encodeURIComponent(subject)}`;
  }

  email += `&body=${encodeURIComponent(text)}`;

  window.location.href = email;
}

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export const getTimeAgo = (date : Date) : string => {
  try { TimeAgo.addDefaultLocale(en) } catch(e) {}
  const timeAgo = new TimeAgo('en-US')
  return timeAgo.format(new Date(date), 'round')  
}


export const blobToBase64 = (blob : Blob, callback: (value: string) => void) => {
  var a = new FileReader();
  a.onload = function(e) {
    if (e.target) {
      callback(e.target.result as string);
    }
  }
  a.readAsDataURL(blob);
}

/**
 * Creates a timestamp in the format YYYY-MM-DD-HH-MM-SS by using the Date object in JavaScript.
 * This timestamp can be used to record the current date and time in a consistent format.
 * 
 * @returns {string} timestamp
 * 
 * @example
 * // returns timestamp
 * timestamp()
 */
export const timestamp = () : string => {
  const now = new Date()
  const pad = (number: number) => number.toString().padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDay())}-${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`
}
// console.log(timestamp()) // Output: "2022-12-13-23-45-30"

export const getZoomScale = () : number => 
  1 / Number(getComputedStyle(document.documentElement).getPropertyValue('--F_Zoom'))


// This function checks if a given string exists in an array of strings. 
export const stringInArray = (str: string, array: string[]): boolean =>
  array.filter((item: string) => str === item).length > 0

// This function retrieves the value of a cookie with a given name. It does this by concatenating 
export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts?.pop()?.split(';')?.shift()
}
  
/**
 * Convert resource url to data url
 * 
 * @param {string} url - The resource url
 * @returns {Promise<string>} dataUrl
 * 
 * @example
 * // returns dataUrl
 * resourceUrlToDataUrl("https://example.com/image.jpg")
 */
export const resourceUrlToDataUrl = async (url : string)  => {
  try {
    const blob = await fetch(url).then(response => response.blob())
    const dataUrl = await new Promise<string>(resolve => {
      let reader = new FileReader()
      reader.onload = () => resolve((reader.result as string))
      reader.readAsDataURL(blob)
    }) 
    return (dataUrl as string)
  }
  catch (e) {
    console.log(e)
    return ''
  }
}


/**
 * Resizes an image dataURL to fit within maximum width and height and returns the resized image dataURL
 * 
 * @param {string} dataURL - The image dataURL
 * @param {number} [maxWidth=512] - The maximum width of the resized image
 * @param {number} [maxHeight=512] - The maximum height of the resized image
 * @param {string} [format="jpeg"] - The format of the resized image. Can be "jpeg" or "png"
 * @param {number} [compression=1.0] - The compression of the resized image (for JPEG format only)
 * @returns {string} The resized image dataURL
 * 
 * @example
 * // returns resized image dataURL
 * resizeDataURL("data:image/png;base64,iVBORw0KG...", 512, 512, "png", 0.7)
 */
export const resizeDataURL = (
  dataURL: string,
  maxWidth?: number,
  maxHeight?: number,
  format?: string,
  compression?: number,
): string => {
  const img = document.createElement("img");
  img.src = dataURL;

  const canvas = document.createElement("canvas");
  // @ts-ignore
  canvas.getContext("2d").drawImage(img, 0, 0);

  maxWidth = maxWidth || 512;
  maxHeight = maxHeight || 512;
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  }
  canvas.width = width;
  canvas.height = height;
  // @ts-ignore
  canvas.getContext("2d").drawImage(img, 0, 0, width, height);

  const resizedDataURL = canvas.toDataURL(
    format === "jpeg" || format === "jpg" || !format ? "image/jpeg" : "image/png",
    compression || 1.0,
  );

  return resizedDataURL;
};

interface HashFunction {
  (file: File): Promise<string>;
}

export const calculateFileHash: HashFunction = (file) => {
  const chunkSize = file.size / Math.floor(file.size / 2048); // Use variable chunk size based on file size
  const chunks = Math.floor(file.size / chunkSize); // Ensure all chunks are the same size (except for the last chunk)
  let currentChunk = 0;
  const spark = new SparkMD5.ArrayBuffer();
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
      // read chunk
      // @ts-ignore
      spark.append(e?.target?.result);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        resolve(spark.end());
      }
    };

    fileReader.onerror = (error) => {
      reject(error); // Reject the promise with the error
    };

    const loadNext = () => {
      const start = currentChunk * chunkSize;
      const end = (start + chunkSize >= file.size) ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(file.slice(start, end));
    };

    loadNext();
  });
};

import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import showdown from 'showdown'
const converter = new showdown.Converter()
/**
 * Converts markdown to html and sanitize it 
 * 
 * @param {string} markdown 
 * @returns {string} html
 * 
 * @example
 * // returns html
 * markdownToHTML("# Hello World")
 */
export const markdownToHTML = (markdown: string ) => {
    //convert markdown to html using showdown library
    const html = converter.makeHtml(markdown)
    //sanitize the html using DOMPurify
    return DOMPurify.sanitize(marked(html), {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
    });
}

import TurndownService from 'turndown'
import { ColorType } from 'types';

const turndownService = new TurndownService()

export const HTMLtoMarkdown = (html: string) => 
  turndownService.turndown(html)

/**
Converts a title string to a "slug" string, which replaces all non-alphanumeric characters with hyphens and converts it to lowercase
*
@param {string} title - The input title string
@returns {string} The "slug" string
@example
// returns "how-to-train-your-dragon"
titleToSlug("How To Train Your Dragon")
*
@example
// returns "the-hitchhiker's-guide-to-the-galaxy"
titleToSlug("The Hitchhiker's Guide To The Galaxy")
*/
export const titleToSlug = (title: string): string => {
  // Replace all non-alphanumeric characters with hyphens
  return title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

/**
Converts a "slug" string to a title case string, meaning the first letter of each word is capitalized, while considering certain lowercase words that should not be capitalized
*
@param {string} slug - The input "slug" string
@returns {string} The title case string
@example
// returns "How To Train Your Dragon"
slugToTitle("how-to-train-your-dragon")
*
@example
// returns "The Hitchhiker's Guide To The Galaxy"
slugToTitle("the-hitchhiker's-guide-to-the-galaxy")
*/
export const slugToTitle = (slug: string): string => {
  // Replace hyphens with spaces
  const title = slug.replace(/-/g, ' ');

  // Split the title into words
  const words = title.split(' ');

  // Create an array of lowercase words that should not be capitalized
  const lowercaseWords = [
    'a', 'an', 'and', 'as', 'at', 'but', 'by',
    'for', 'if', 'in', 'nor', 'of', 'off', 'on',
    'or', 'per', 'so', 'the', 'to', 'up', 'via', 'yet'
  ];

  // Capitalize each word, unless it should be lowercase
  return words.map((word) => {
    return lowercaseWords.includes(word) ? word : word.replace(/\b\w/g, (w) => w.toUpperCase());
  }).join(' ');
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