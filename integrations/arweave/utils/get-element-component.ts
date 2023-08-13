import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const getElement: { [key: string]: any } = {
  textArea: Textarea,
  input: Input,
}

export function getComponent(key: string): any {
  return getElement[key] || Input
}
