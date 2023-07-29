export const blobToBase64 = (blob : Blob, callback: (value: string) => void) => {
  var a = new FileReader();
  a.onload = function(e) {
    if (e.target) {
      callback(e.target.result as string);
    }
  }
  a.readAsDataURL(blob);
}