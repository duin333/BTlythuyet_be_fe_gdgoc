import { useEffect, useRef } from 'react'
import { classes } from '../data/data'
import { useOverlay } from '../hooks/useOverlay'

export default function TrainerModal({ trainer, onClose }) {
  const closeRef = useRef(null)

  // Hook phải gọi trước lệnh return sớm bên dưới
  useOverlay(Boolean(trainer), onClose)

  useEffect(() => {
    if (trainer) closeRef.current?.focus() // chuyển focus vào nút đóng khi mở
  }, [trainer])

  if (!trainer) return null

  const teaching = classes.filter((c) => c.trainerId === trainer.id)

  return (
    <div
      className="animate-fade fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="trainer-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-pop relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white text-zinc-900 shadow-2xl md:grid-cols-5 dark:bg-zinc-900 dark:text-white"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-orange-500"
        >
          ✕
        </button>

        <img
          src={trainer.photo}
          alt={trainer.name}
          className="h-64 w-full object-cover md:col-span-2 md:h-full"
        />

        <div className="p-6 md:col-span-3 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            {trainer.role}
          </p>
          <h3 id="trainer-title" className="mt-1 text-3xl font-extrabold">
            {trainer.name}
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {trainer.exp} năm kinh nghiệm
          </p>

          <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300">{trainer.bio}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {trainer.skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400"
              >
                {s}
              </span>
            ))}
          </div>

          <h4 className="mt-6 font-bold">Lớp đang dạy</h4>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            {teaching.map((c) => (
              <li key={c.id}>
                <span className="font-semibold text-zinc-900 dark:text-white">{c.name}</span>
                {' · '}
                {c.day} · {c.time}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={onClose}
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-2.5 font-semibold text-white transition hover:bg-orange-600"
          >
            Đăng ký tập thử với {trainer.name}
          </a>
        </div>
      </div>
    </div>
  )
}