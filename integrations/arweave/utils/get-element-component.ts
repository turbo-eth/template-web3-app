import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type InputTypes = typeof Input | typeof Textarea

const getElement: { [key: string]: InputTypes } = {
  textArea: Textarea,
  input: Input,
}

export function getComponent(key: string): InputTypes {
  return getElement[key] || Input
}
