interface IHealthFactorProps {
  value: number
}

export const HealthFactor = ({ value }: IHealthFactorProps) => {
  let healthFactorColor = ''
  if (value >= 3) {
    healthFactorColor = 'text-green-500'
  } else if (value > 1.5) {
    healthFactorColor = 'text-yellow-500'
  } else {
    healthFactorColor = 'text-red-500'
  }

  return <span className={healthFactorColor}>{value.toFixed(2)}</span>
}
