export interface ClassName {
  className?: string
}

export type ListType = "schedule" | "travel" | "wants"

export interface ListEntry {
  id: string
  text: string
  author: string
}
