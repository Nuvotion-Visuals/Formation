export const blobURLToFile = async (blobUrl: string, fileName: string): Promise<File> => {
  const response = await fetch(blobUrl)
  const blob = await response.blob()
  return new File([blob], fileName, { type: blob.type })
}
