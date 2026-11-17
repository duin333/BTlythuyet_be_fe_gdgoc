import { useState, useRef, useCallback } from 'react'
import { trainers } from '../data/data'
import TrainerModal from './TrainerModal'

export default function Trainers() {
  const [selected, setSelected] = useState(null) // null = modal đóng
  const triggerRef = useRef(null)

  const openModal = (trainer, e) => {
    triggerRef.current = e.currentTarget // nhớ nút đã bấm
    setSelected(trainer)
  }

  const closeModal = useCallback(() => {
    setSelected(null)
    triggerRef.current?.focus() // trả focus về nút cũ khi đóng
  }, [])

  return (
    <section id="trainers" className="scroll-mt-16 bg-zinc-50 py-20 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Huấn luyện viên
          </p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Đội ngũ đồng hành cùng bạn</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((t) => (
            <article
              key={t.id}
              className="group overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-950"
            >
              <div className="overflow-hidden">
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{t.name}</h3>
                <p className="text-sm text-orange-500">{t.role}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {t.exp} năm kinh nghiệm
                </p>
                <button
                  onClick={(e) => openModal(t, e)}
                  className="mt-4 w-full rounded-full border border-orange-500 py-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white"
                >
                  Xem chi tiết
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <TrainerModal trainer={selected} onClose={closeModal} />
    </section>
  )
}