import { useState } from 'react'
import { classes, classTypes, trainers } from '../data/data'
import { useDebounce } from '../hooks/useDebounce'

// Bỏ dấu để gõ "thu 2" vẫn ra "Thứ 2"
const normalize = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')

// Gắn huấn luyện viên vào từng lớp, tính 1 lần ngoài component
const allClasses = classes.map((c) => ({
  ...c,
  trainer: trainers.find((t) => t.id === c.trainerId),
}))

export default function Schedule() {
  const [tab, setTab] = useState('Tất cả')
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const keyword = normalize(debouncedQuery.trim())
  const list = allClasses.filter((c) => {
    const matchTab = tab === 'Tất cả' || c.type === tab
    const text = normalize(`${c.name} ${c.day} ${c.trainer?.name ?? ''}`)
    return matchTab && text.includes(keyword)
  })

  return (
    <section id="schedule" className="scroll-mt-16 bg-white py-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Lịch lớp
          </p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Chọn lớp phù hợp với bạn
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" className="flex flex-wrap gap-2">
            {classTypes.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  tab === t
                    ? 'bg-orange-500 text-white shadow'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm lớp, ngày hoặc huấn luyện viên..."
            aria-label="Tìm kiếm lớp học"
            className="w-full rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 md:w-80 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        <p aria-live="polite" className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
          Tìm thấy <strong className="text-orange-500">{list.length}</strong> lớp phù hợp
        </p>

        {list.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 py-16 text-center text-zinc-500 dark:border-zinc-700">
            Không tìm thấy lớp phù hợp. Thử đổi bộ môn hoặc từ khóa khác nhé.
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
                    {c.type}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{c.level}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{c.name}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {c.day} · {c.time} · {c.duration}
                </p>
                <p className="mt-4 text-sm">
                  Huấn luyện viên: <span className="font-semibold">{c.trainer?.name}</span>
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}