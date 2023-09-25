export function humanNumber(num: string | number): string {
  if (num == null) {
    return ""
  }
  if (num == 0) {
    return "0"
  }
  const i = Math.floor(Math.log(+num) / Math.log(1000))
  return (+num / Math.pow(1000, i)).toFixed(1) + ["", "K", "M", "B"][i]
}
