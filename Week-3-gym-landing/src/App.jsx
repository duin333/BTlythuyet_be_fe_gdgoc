import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Schedule from './components/Schedule'

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <Schedule />
      {/* Bước sau: Trainers + Modal, Pricing, Faq, Contact */}
    </div>
  )
}