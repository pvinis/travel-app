import { useState } from "react"
import { ListSection } from "@/components/list-section"
import type { Doc, ListType } from "./types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDocument } from "@automerge/automerge-repo-react-hooks"
import { AutomergeUrl } from "@automerge/automerge-repo"

const USERS = ["Io", "Pa", "Da", "Fo", "Gi"]

export function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [doc, changeDoc] = useDocument<Doc>(docUrl)

  const [filterUser, setFilterUser] = useState<string | "all">("all")

  if (!doc) {
    return <p>Loading...</p>
  }

  const handleAddEntry = (text: string, author: string, type: ListType) => {
    if (type === "wants") {
      changeDoc((d) => d.wants.push({ id: crypto.randomUUID(), text, author }))
    } else if (type === "schedule") {
      changeDoc((d) =>
        d.schedule.push({ id: crypto.randomUUID(), text, author }),
      )
    } else if (type === "travel") {
      console.log("add travel")
      changeDoc((d) => d.travel.push({ id: crypto.randomUUID(), text, author }))
    }
  }

  const handleDeleteEntry = (id: string, type: ListType) => {
    if (type === "wants") {
      changeDoc((d) =>
        d.wants.splice(
          d.wants.findIndex((e) => e.id === id),
          1,
        ),
      )
    } else if (type === "schedule") {
      changeDoc((d) =>
        d.schedule.splice(
          d.schedule.findIndex((e) => e.id === id),
          1,
        ),
      )
    } else if (type === "travel") {
      changeDoc((d) =>
        d.travel.splice(
          d.travel.findIndex((e) => e.id === id),
          1,
        ),
      )
    }
  }

  const handleEditEntry = (
    id: string,
    author: string,
    text: string,
    type: ListType,
  ) => {
    if (type === "wants") {
      changeDoc((d) => {
        const entry = d.wants.find((e) => e.id === id)
        if (entry) {
          entry.text = text
          entry.author = author
        }
      })
    } else if (type === "schedule") {
      changeDoc((d) => {
        const entry = d.schedule.find((e) => e.id === id)
        if (entry) {
          entry.text = text
          entry.author = author
        }
      })
    } else if (type === "travel") {
      changeDoc((d) => {
        const entry = d.travel.find((e) => e.id === id)
        if (entry) {
          entry.text = text
          entry.author = author
        }
      })
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
          entries={doc?.travel ?? []}
          type="travel"
          onAddEntry={handleAddEntry}
          onDeleteEntry={handleDeleteEntry}
          onEditEntry={handleEditEntry}
          filterUser={filterUser}
        />
        <ListSection
          title="Already Scheduled"
          entries={doc?.schedule ?? []}
          type="schedule"
          onAddEntry={handleAddEntry}
          onDeleteEntry={handleDeleteEntry}
          onEditEntry={handleEditEntry}
          filterUser={filterUser}
        />
        <ListSection
          title="Maybe Visit/Suggestions"
          entries={doc?.wants ?? []}
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
