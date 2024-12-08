import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import { isValidAutomergeUrl, Repo } from "@automerge/automerge-repo"
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket"
import { Doc } from "./types"
import { RepoContext } from "@automerge/automerge-repo-react-hooks"

const repo = new Repo({
  network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
})

const rootDocUrl = "automerge:4STZRQ5hFgauWPStPgEMzax1j6zR"
let handle
if (isValidAutomergeUrl(rootDocUrl)) {
  handle = repo.find(rootDocUrl)
} else {
  handle = repo.create<Doc>({ wants: [], schedule: [], travel: [] })
}
const docUrl = (document.location.hash = handle.url)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <App docUrl={docUrl} />
    </RepoContext.Provider>
  </React.StrictMode>,
)
