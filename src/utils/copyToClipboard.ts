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