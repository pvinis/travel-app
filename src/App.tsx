import { useState } from "react"
import { ListSection } from "@/components/list-section"
import type { ListType } from "./types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  useAddInfo,
  useAddSchedule,
  useAddWant,
  useAllTheStuff,
  useDeleteInfo,
  useDeleteSchedule,
  useDeleteWant,
  useEditInfo,
  useEditSchedule,
  useEditWant,
} from "./queries"

export function App() {
  const USERS = ["Io", "Pa", "Da", "Fo", "Gi"]

  const allTheStuff = useAllTheStuff()
  const addInfo = useAddInfo()
  const deleteInfo = useDeleteInfo()
  const editInfo = useEditInfo()
  const addSchedule = useAddSchedule()
  const deleteSchedule = useDeleteSchedule()
  const editSchedule = useEditSchedule()
  const addWant = useAddWant()
  const deleteWant = useDeleteWant()
  const editWant = useEditWant()

  const [filterUser, setFilterUser] = useState<string | "all">("all")

  if (allTheStuff.error) {
    return <p>Error fetching data: {allTheStuff.error.message}</p>
  }

  if (allTheStuff.isLoading) {
    return <p>Loading...</p>
  }

  const handleAddEntry = (text: string, author: string, type: ListType) => {
    if (type === "wants") {
      addWant({ text, author })
    } else if (type === "schedule") {
      addSchedule({ text, author })
    } else if (type === "travel") {
      addInfo({ text, author })
    }
  }

  const handleDeleteEntry = (id: string, type: ListType) => {
    if (type === "wants") {
      deleteWant(id)
    } else if (type === "schedule") {
      deleteSchedule(id)
    } else if (type === "travel") {
      deleteInfo(id)
    }
  }

  const handleEditEntry = (
    id: string,
    author: string,
    text: string,
    type: ListType,
  ) => {
    if (type === "wants") {
      editWant({ id, author, text })
    } else if (type === "schedule") {
      editSchedule({ id, author, text })
    } else if (type === "travel") {
      editInfo({ id, author, text })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md space-y-6 p-4">
        <div className="flex justify-end">
          <Select value={filterUser} onValueChange={setFilterUser}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {USERS.map((user) => (
                <SelectItem key={user} value={user}>
                  {user}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ListSection
          title="Travel & Stay Info"
          entries={allTheStuff.data?.travelAppInfo ?? []}
          type="travel"
          onAddEntry={handleAddEntry}
          onDeleteEntry={handleDeleteEntry}
          onEditEntry={handleEditEntry}
          filterUser={filterUser}
        />
        <ListSection
          title="Already Scheduled"
          entries={allTheStuff.data?.travelAppSchedule ?? []}
          type="schedule"
          onAddEntry={handleAddEntry}
          onDeleteEntry={handleDeleteEntry}
          onEditEntry={handleEditEntry}
          filterUser={filterUser}
        />
        <ListSection
          title="Maybe Visit/Suggestions"
          entries={allTheStuff.data?.travelAppWants ?? []}
          type="wants"
          onAddEntry={handleAddEntry}
          onDeleteEntry={handleDeleteEntry}
          onEditEntry={handleEditEntry}
          filterUser={filterUser}
        />
      </div>
    </div>
  )
}
