import { Select } from '@gnosis.pm/safe-react-components'
import { SelectItem } from '@gnosis.pm/safe-react-components/dist/inputs/Select'

type SelectContractFieldTypes = {
  options: SelectItem[]
  onChange: (id: string) => void
  value: string
  label: string
  name: string
  id: string
}

const SelectContractField = ({
  value,
  onChange,
  options,
  label,
  name,
  id,
}: SelectContractFieldTypes) => {
  return (
    <Select
      id={id}
      inputProps={{
        id: `${id}-input`,
      }}
      name={name}
      disabled={options.length === 1}
      label={label}
      items={options}
      fullWidth
      activeItemId={value}
      onItemClick={(id: string) => {
        onChange(id)
      }}
    />
  )
}

export default SelectContractField
