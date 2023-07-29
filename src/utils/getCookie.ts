// This function retrieves the value of a cookie with a given name. It does this by concatenating 
export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts?.pop()?.split(';')?.shift()
}
  