import { init } from "@instantdb/react"
import { ListEntry } from "./types"

type Schema = {
  travelAppInfo: ListEntry
  travelAppSchedule: ListEntry
  travelAppWants: ListEntry
}

export const db = init<Schema>({
  appId: "19a74fad-044b-4faf-a492-1c9acee9bd59",
})
