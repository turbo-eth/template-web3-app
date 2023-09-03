export function truncateString(fullStr: string, strLen: number, separator: string | undefined = '...') {
  if (fullStr.length <= strLen) return fullStr

  const sepLen = separator.length
  const charsToShow = strLen - sepLen
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)

  return fullStr.substring(0, frontChars) + separator + fullStr.substring(fullStr.length - backChars)
}

export function formatDateTime(dateTimeString) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }

  const date = new Date(dateTimeString)
  return date.toLocaleDateString('en-US', options)
}
