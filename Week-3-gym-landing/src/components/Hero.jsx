const stats = [
  { value: '12+', label: 'Lớp mỗi tuần' },
  { value: '4', label: 'Huấn luyện viên' },
  { value: '1.200+', label: 'Hội viên' },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-br from-zinc-950 via-zinc-900 to-orange-700 text-white"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-600/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
          Gym · Yoga · HIIT · Boxing · Pilates
        </p>
        <h1 className="mt-4 text-5xl font-extrabold leading-tight md:text-7xl">
          Nâng nhịp tim,
          <br />
          <span className="text-orange-500">nâng cuộc sống</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-300">
          PULSE Fitness & Yoga có lớp nhóm mỗi ngày, huấn luyện viên chứng chỉ quốc tế
          và buổi tập thử đầu tiên miễn phí.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-full bg-orange-500 px-7 py-3 font-semibold transition hover:bg-orange-600"
          >
            Đăng ký tập thử miễn phí
          </a>
          <a
            href="#schedule"
            className="rounded-full border border-white/40 px-7 py-3 font-semibold transition hover:bg-white/10"
          >
            Xem lịch lớp
          </a>
        </div>

        <dl className="mt-16 flex flex-wrap gap-10">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-3xl font-extrabold text-orange-400">{s.value}</dt>
              <dd className="text-sm text-zinc-300">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}