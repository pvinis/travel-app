import { id, tx } from "@instantdb/react"
import { db } from "./db"

export function useInfo() {
  return db.useQuery({
    travelAppInfo: { $: { order: { serverCreatedAt: "asc" } } },
  })
}

export function useAddInfo() {
  const addInfo = ({ text, author }: { text: string; author: string }) =>
    db.transact([tx.travelAppInfo[id()].update({ text, author })])
  return addInfo
}

export function useDeleteInfo() {
  const deleteInfo = (id: string) =>
    db.transact([tx.travelAppInfo[id].delete()])
  return deleteInfo
}

export function useEditInfo() {
  const editInfo = ({
    id,
    text,
    author,
  }: {
    id: string
    text: string
    author: string
  }) => db.transact([tx.travelAppInfo[id].update({ text, author })])
  return editInfo
}

export function useSchedule() {
  return db.useQuery({
    travelAppSchedule: { $: { order: { serverCreatedAt: "asc" } } },
  })
}

export function useAddSchedule() {
  const addSchedule = ({ text, author }: { text: string; author: string }) =>
    db.transact([tx.travelAppSchedule[id()].update({ text, author })])
  return addSchedule
}

export function useDeleteSchedule() {
  const deleteSchedule = (id: string) =>
    db.transact([tx.travelAppSchedule[id].delete()])
  return deleteSchedule
}

export function useEditSchedule() {
  const editSchedule = ({
    id,
    text,
    author,
  }: {
    id: string
    text: string
    author: string
  }) => db.transact([tx.travelAppSchedule[id].update({ text, author })])
  return editSchedule
}

export function useWants() {
  return db.useQuery({
    travelAppWants: { $: { order: { serverCreatedAt: "asc" } } },
  })
}

export function useAddWant() {
  const addWant = ({ text, author }: { text: string; author: string }) =>
    db.transact([tx.travelAppWants[id()].update({ text, author })])
  return addWant
}

export function useDeleteWant() {
  const deleteWant = (id: string) =>
    db.transact([tx.travelAppWants[id].delete()])
  return deleteWant
}

export function useEditWant() {
  const editWant = ({
    id,
    text,
    author,
  }: {
    id: string
    text: string
    author: string
  }) => db.transact([tx.travelAppWants[id].update({ text, author })])
  return editWant
}
