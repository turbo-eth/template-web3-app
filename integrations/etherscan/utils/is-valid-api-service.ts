export function isValidApiService(
  service: string,
  validServiceProviders: Array<string>
) {
  return validServiceProviders.includes(service)
}

export default isValidApiService
