import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <Navbar dark={dark} setDark={setDark} />

      <section id="top" className="flex h-screen items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-orange-700 text-white">
        <h1 className="text-5xl font-extrabold">PULSE Fitness & Yoga</h1>
      </section>

      <section id="schedule" className="h-[150vh] p-8">
        <h2 className="text-3xl font-bold">Lịch lớp (đang làm)</h2>
      </section>
    </div>
  )
}