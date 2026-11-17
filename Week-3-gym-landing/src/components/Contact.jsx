import { useState, useCallback } from 'react'
import { classTypes } from '../data/data'
import Toast from './Toast'

const interests = classTypes.filter((t) => t !== 'Tất cả')
const initialForm = { name: '', phone: '', email: '', interest: interests[0], note: '' }

const infos = [
  { icon: '📍', label: 'Địa chỉ', value: '123 Đường Sức Khỏe, Quận Trung Tâm' },
  { icon: '📞', label: 'Hotline', value: '0901 234 567' },
  { icon: '✉️', label: 'Email', value: 'hello@pulsefitness.vn' },
  { icon: '🕒', label: 'Giờ mở cửa', value: '05:30 – 22:00 (Chủ nhật đến 20:00)' },
]

const validate = (f) => {
  const e = {}
  if (!f.name.trim()) e.name = 'Vui lòng nhập họ tên'
  else if (f.name.trim().length < 2) e.name = 'Họ tên quá ngắn'
  if (!/^(0|\+84)\d{9}$/.test(f.phone.replace(/\s/g, '')))
    e.phone = 'Số điện thoại không hợp lệ (VD: 0912345678)'
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Email không hợp lệ'
  return e
}

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 dark:bg-zinc-900 ${
    hasError
      ? 'border-red-500 focus:ring-red-500/30'
      : 'border-zinc-300 focus:border-orange-500 focus:ring-orange-500/30 dark:border-zinc-700'
  }`

// Để NGOÀI component Contact, nếu để trong thì mỗi lần gõ phím sẽ bị tạo lại và mất focus
function Field({ label, name, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const closeToast = useCallback(() => setToast(null), [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined })) // gõ lại thì xóa lỗi
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (loading) return

    const errs = validate(form)
    setErrors(errs)
    const firstKey = Object.keys(errs)[0]
    if (firstKey) {
      ev.currentTarget.elements[firstKey]?.focus() // đưa con trỏ tới ô lỗi đầu tiên
      return
    }

    const name = form.name.trim()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500)) // giả lập gọi API
    setLoading(false)
    setForm(initialForm)
    setToast({ id: Date.now(), text: `Đăng ký thành công! PULSE sẽ liên hệ ${name} trong vòng 24 giờ.` })
  }

  return (
    <section id="contact" className="scroll-mt-16 bg-white py-20 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Đăng ký
          </p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Tập thử miễn phí buổi đầu tiên
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Để lại thông tin, PULSE sẽ gọi xác nhận lịch và tư vấn lớp phù hợp với bạn.
          </p>

          <ul className="mt-8 space-y-5">
            {infos.map((i) => (
              <li key={i.label} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-lg">
                  {i.icon}
                </span>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{i.label}</p>
                  <p className="font-semibold">{i.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm md:p-8 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <Field label="Họ và tên" name="name" error={errors.name}>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={inputClass(errors.name)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Số điện thoại" name="phone" error={errors.phone}>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="0912 345 678"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={inputClass(errors.phone)}
              />
            </Field>
            <Field label="Email" name="email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ban@email.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={inputClass(errors.email)}
              />
            </Field>
          </div>

          <Field label="Bộ môn quan tâm" name="interest">
            <select
              id="interest"
              name="interest"
              value={form.interest}
              onChange={handleChange}
              className={inputClass(false)}
            >
              {interests.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Ghi chú (không bắt buộc)" name="note">
            <textarea
              id="note"
              name="note"
              rows={3}
              value={form.note}
              onChange={handleChange}
              placeholder="Khung giờ bạn muốn tập, tình trạng sức khỏe..."
              className={inputClass(false)}
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {loading ? 'Đang gửi...' : 'Đăng ký tập thử'}
          </button>
        </form>
      </div>

      <Toast toast={toast} onClose={closeToast} />
    </section>
  )
}