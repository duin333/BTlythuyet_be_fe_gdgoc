import { useEffect } from 'react'

export default function Toast({ toast, onClose, duration = 3500 }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer) // cleanup: toast mới hoặc unmount thì hủy timer cũ
  }, [toast, onClose, duration])

  return (
    // Vùng thông báo luôn tồn tại để trình đọc màn hình đọc được nội dung mới
    <div role="status" aria-live="polite" className="fixed bottom-6 right-4 z-[60]">
      {toast && (
        <div className="animate-pop flex max-w-sm items-start gap-3 rounded-2xl bg-zinc-900 px-5 py-4 text-white shadow-2xl ring-1 ring-white/10">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold">
            ✓
          </span>
          <p className="text-sm leading-relaxed">{toast.text}</p>
          <button
            onClick={onClose}
            aria-label="Đóng thông báo"
            className="ml-2 text-zinc-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}