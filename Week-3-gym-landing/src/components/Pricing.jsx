import { plans } from '../data/data'

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 bg-white py-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Gói tập
          </p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Chọn gói phù hợp với mục tiêu
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Giá theo tháng, không phí ẩn. Tập thử buổi đầu miễn phí.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.id}
              className={`relative rounded-3xl p-8 transition hover:-translate-y-1 ${
                p.highlight
                  ? 'bg-linear-to-br from-orange-500 to-orange-700 text-white shadow-2xl md:scale-105'
                  : 'border border-zinc-200 bg-zinc-50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Phổ biến nhất
                </span>
              )}

              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="mt-4">
                <span className="text-4xl font-extrabold">{p.price}đ</span>
                <span className={p.highlight ? 'text-orange-100' : 'text-zinc-500'}> /tháng</span>
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className={p.highlight ? 'text-white' : 'text-orange-500'}>✓</span>
                    {perk}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 block rounded-full py-3 text-center font-semibold transition ${
                  p.highlight
                    ? 'bg-white text-orange-600 hover:bg-zinc-100'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                Chọn gói {p.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}