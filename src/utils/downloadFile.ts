export const downloadFile = (str: string, filename: string, mimeType: string) => {
  const link = document.createElement('a');
  link.setAttribute('download', filename);
  link.setAttribute('href', `data:${mimeType};charset=utf-8,${encodeURIComponent(str)}`);
  link.click();
}