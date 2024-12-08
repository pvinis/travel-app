export interface ClassName {
  className?: string
}

export type ListType = "schedule" | "travel" | "wants"

export interface ListEntry {
  id: string
  text: string
  author: string
}

export type Doc = {
  wants: ListEntry[]
  schedule: ListEntry[]
  travel: ListEntry[]
}
