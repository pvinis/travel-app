"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserSelector } from "./user-selector"
import { motion, PanInfo } from "framer-motion"
import type { ListEntry, ListType } from "../types"

interface ListSectionProps {
  title: string
  entries: ListEntry[]
  type: ListType
  onAddEntry: (text: string, author: string, type: ListType) => void
  onDeleteEntry: (id: string, type: ListType) => void
  filterUser: string | "all"
}

export function ListSection({
  title,
  entries,
  type,
  onAddEntry,
  onDeleteEntry,
  filterUser,
}: ListSectionProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const constraintsRef = useRef(null)
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEntry.trim() && selectedUser) {
      onAddEntry(newEntry.trim(), selectedUser, type)
      setNewEntry("")
      setIsAdding(false)
    }
  }

  const handleDragEnd = (entryId: string, info: PanInfo) => {
    if (info.offset.x < -100) {
      setEntryToDelete(entryId)
    }
  }

  const filteredEntries =
    filterUser === "all"
      ? entries
      : entries.filter((entry) => entry.author === filterUser)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {/*Select component removed*/}
      </div>
      <div className="space-y-2" ref={constraintsRef}>
        {filteredEntries.map((entry) => (
          <motion.div
            key={entry.id}
            className="relative flex items-center justify-between overflow-hidden rounded-lg border bg-white p-3"
            drag="x"
            dragConstraints={constraintsRef}
            onDragEnd={(_, info) => handleDragEnd(entry.id, info)}
          >
            <div className="mr-2 flex-1">
              <span className="text-m">{entry.text}</span>
            </div>
            <span className="text-sm text-orange-800">{entry.author}</span>
          </motion.div>
        ))}
      </div>
      {isAdding ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Enter text..."
            className="w-full"
            autoFocus
          />
          <UserSelector value={selectedUser} onChange={setSelectedUser} />
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Add
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAdding(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          className="w-full bg-sky-700 hover:bg-sky-800"
        >
          + Add entry
        </Button>
      )}
      {entryToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-4">
            <p>Are you sure you want to delete this entry?</p>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setEntryToDelete(null)}
                variant="outline"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onDeleteEntry(entryToDelete, type)
                  setEntryToDelete(null)
                }}
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}