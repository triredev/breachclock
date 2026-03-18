import HackTimer from "./components/HackTimer"
import WhoamiProfile from "./components/WhoamiProfile"

function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <h1 className="text-green-500 text-4xl font-mono font-bold">
        {"> TARGET ACQUIRED. AWAITING COMMANDS..."}
      </h1>

      <HackTimer />

      <WhoamiProfile />

    </div>
  )
}

export default App