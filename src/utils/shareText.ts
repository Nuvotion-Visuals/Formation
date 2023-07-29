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