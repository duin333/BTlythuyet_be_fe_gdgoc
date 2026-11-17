import { useState, useEffect, useCallback } from 'react'
import { navLinks } from '../data/data'
import { useOverlay } from '../hooks/useOverlay'

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useOverlay(menuOpen, closeMenu)

  const text = scrolled ? 'text-zinc-900 dark:text-white' : 'text-white'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${text} ${
          scrolled
            ? 'bg-white/70 py-2 shadow-md backdrop-blur-md dark:bg-zinc-900/70'
            : 'bg-transparent py-4'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <a href="#top" className="text-xl font-extrabold tracking-wider">
            PULSE<span className="text-orange-500">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-sm font-medium transition hover:text-orange-500">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              aria-label="Đổi giao diện sáng/tối"
              className="rounded-full p-2 text-lg transition hover:bg-orange-500/20"
            >
              {dark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Mở menu"
              className="rounded-full p-2 text-xl md:hidden"
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={closeMenu}>
          <div className="absolute inset-0 bg-black/60" />
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-72 flex-col gap-6 bg-white p-6 text-zinc-900 shadow-xl dark:bg-zinc-900 dark:text-white"
          >
            <button onClick={closeMenu} aria-label="Đóng menu" className="self-end text-2xl">
              ✕
            </button>
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={closeMenu}
                className="text-lg font-semibold hover:text-orange-500"
              >
                {l.label}
              </a>
            ))}
          </aside>
        </div>
      )}
    </>
  )
}