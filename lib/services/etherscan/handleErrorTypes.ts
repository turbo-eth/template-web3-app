export function handleErrorTypes(error: any) {
  if (typeof error === 'string') {
    throw new Error(error)
  }
}

export default handleErrorTypes
