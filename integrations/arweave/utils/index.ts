export function truncateString(fullStr: string, strLen: number, separator: string | undefined = '...') {
  if (fullStr.length <= strLen) return fullStr

  const sepLen = separator.length
  const charsToShow = strLen - sepLen
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)

  return fullStr.substring(0, frontChars) + separator + fullStr.substring(fullStr.length - backChars)
}
