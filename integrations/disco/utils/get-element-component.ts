import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const getElement: { [key: string]: any } = {
  textArea: Textarea,
  input: Input,
  select: Select,
}

export function getComponent(key: string): any {
  return getElement[key] || Input
}
