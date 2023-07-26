interface ICoinApiResponse {
  time: string
  asset_id_base: string
  asset_id_quote: string
  rate: string
}

export const limitDecimals = (input: string, decimalPlaces: number): string => {
  const parts = input.split('.')
  if (parts[1]) {
    parts[1] = parts[1].slice(0, decimalPlaces)
    return parts.join('.')
  } else {
    return input
  }
}

export const getTokenPrice = async (symbol: string): Promise<ICoinApiResponse> => {
  try {
    const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=EF7D1235-5AC4-4044-9443-32908878A370`)
    const data: ICoinApiResponse = await response.json()
    return data
  } catch (e) {
    console.error(e)
    throw e // If you need to propagate the error.
  }
}
