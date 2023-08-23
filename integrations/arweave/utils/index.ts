export function truncateString(fullStr: string, strLen: number, separator: string | undefined = '...') {
  if (fullStr.length <= strLen) return fullStr

  const sepLen = separator.length
  const charsToShow = strLen - sepLen
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)

  return fullStr.substring(0, frontChars) + separator + fullStr.substring(fullStr.length - backChars)
}

export const convertBlobToBase64 = (blob: Blob): Promise<ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => (reader.result ? resolve(reader.result as ArrayBuffer) : reject('Unable to handle file'))
    reader.onerror = reject
    reader.readAsArrayBuffer(blob)
  })

export function humanFileSize(size: string | number) {
  if (size == null) {
    return ''
  }
  if (size == 0) {
    return '0 B'
  }
  const i = Math.floor(Math.log(+size) / Math.log(1024))
  return (+size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}
