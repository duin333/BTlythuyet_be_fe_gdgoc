import { navLinks } from '../data/data'

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-10 text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <a href="#top" className="text-xl font-extrabold tracking-wider text-white">
          PULSE<span className="text-orange-500">.</span>
        </a>

        <ul className="flex flex-wrap justify-center gap-6 text-sm">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="transition hover:text-orange-500">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm">© {new Date().getFullYear()} PULSE Fitness & Yoga. Demo bài tập.</p>
      </div>
    </footer>
  )
}