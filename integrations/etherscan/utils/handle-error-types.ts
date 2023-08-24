export function handleErrorTypes(error: unknown) {
  if (typeof error === "string") {
    throw new Error(error)
  }
}

export default handleErrorTypes
