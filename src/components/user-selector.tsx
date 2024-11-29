import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UserSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function UserSelector({ value, onChange }: UserSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select user" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Io">Io</SelectItem>
        <SelectItem value="Pa">Pa</SelectItem>
        <SelectItem value="Da">Da</SelectItem>
        <SelectItem value="Fo">Fo</SelectItem>
        <SelectItem value="Gi">Gi</SelectItem>
      </SelectContent>
    </Select>
  )
}
