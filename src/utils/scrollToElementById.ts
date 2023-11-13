type ScrollOptions = {
  behavior?: "auto" | "smooth";
  block?: "start" | "center" | "end" | "nearest";
  inline?: "start" | "center" | "end" | "nearest";
}

/**
 * @function scrollToElementById
 * 
 * This function scrolls an HTML element into visible area of the browser window
 * identified by an id, with an optional smooth scrolling animation and various scroll options.
 * 
 * @param {string} id - The id of the HTML element to be scrolled into view.
 * @param {ScrollOptions} options - The options that define the scrolling into view behavior.
 * @param {("auto"|"smooth")} options.behavior - Defines the transition animation type for the scrolling process.
 * @param {("start"|"center"|"end"|"nearest")} options.block - Defines vertical alignment of the scrolled element in the visible area.
 * @param {("start"|"center"|"end"|"nearest")} options.inline - Defines horizontal alignment of the scrolled element in the visible area.
 * 
 * @example
 * scrollToElementById('id', { behavior: 'smooth', block: 'start' });
 */
export const scrollToElementById = (id: string, options: ScrollOptions) => {
setTimeout(() => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView(options);
  } 
  else {
    console.error(`Element with ID 'top_${id}' not found.`);
  }
}, 100);
}