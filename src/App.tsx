import { db } from "./db"
import { Message } from "./Message"
import { sortBy } from "lodash"
import { cn } from "./utils"

export function App() {
	const { isLoading, error, data } = db.useQuery({ locations: {} })
