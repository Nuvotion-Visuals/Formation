type ScrollOptions = {
  behavior?: "auto" | "smooth";
  block?: "start" | "center" | "end" | "nearest";
  inline?: "start" | "center" | "end" | "nearest";
}

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