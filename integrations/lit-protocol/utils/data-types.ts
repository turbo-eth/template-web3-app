/**
 * Convert a blob to a string
 * @param blob  - The blob to convert
 * @returns Promise that resolves to the string
 */
export const blobToString = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })
}
