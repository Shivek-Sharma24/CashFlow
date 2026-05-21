
import { Routes , Route} from 'react-router-dom'
import './App.css'
import Header from './components/Pages/Header'
import LandingPage from './components/Pages/Landing'
import { Toaster } from 'react-hot-toast'
import Home from './components/Pages/Home'

function App() {
const token = localStorage.getItem("token");
  return (
    <>
    <Header/>
    <Toaster/>
    <Routes>
        <Route path="*" element={"Not Found"} />
      <Route path='/' element={token ? <Home/> : <LandingPage />} />
    </Routes>
   
    <footer className="border-t border-zinc-700 bg-zinc-900 sticky bottom-0 ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">CashFlow</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {["Privacy", "Terms", "Security", "Status"].map((l) => (
              <span key={l} className="hover:text-zinc-300 cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
          <span>© 2026 CashFlow, Inc.</span>
        </div>
      </footer>
    </>
  )
}

export default App
