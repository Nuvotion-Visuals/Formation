export const getZoomScale = () : number => 
  1 / Number(getComputedStyle(document.documentElement).getPropertyValue('--F_Zoom'))
