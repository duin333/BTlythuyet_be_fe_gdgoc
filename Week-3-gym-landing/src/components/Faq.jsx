import { useState } from 'react'
import { faqs } from '../data/data'

export default function Faq() {
  const [openId, setOpenId] = useState(null) // chỉ 1 câu mở tại một thời điểm

  const toggle = (id) => setOpenId(openId === id ? null : id)

  return (
    <section id="faq" className="scroll-mt-16 bg-zinc-50 py-20 dark:bg-zinc-900">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">FAQ</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Câu hỏi thường gặp</h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f) => {
            const open = openId === f.id
            return (
              <div
                key={f.id}
                className={`overflow-hidden rounded-2xl border bg-white transition dark:bg-zinc-950 ${
                  open
                    ? 'border-orange-500 shadow-md'
                    : 'border-zinc-200 dark:border-zinc-800'
                }`}
              >
                <h3>
                  <button
                    id={`faq-btn-${f.id}`}
                    onClick={() => toggle(f.id)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${f.id}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold"
                  >
                    {f.q}
                    <span
                      aria-hidden="true"
                      className={`text-2xl leading-none text-orange-500 transition-transform duration-300 ${
                        open ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                {/* Mẹo animation: grid 0fr -> 1fr, con bên trong overflow-hidden */}
                <div
                  id={`faq-panel-${f.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${f.id}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}