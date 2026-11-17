export const navLinks = [
  { id: 'schedule', label: 'Lịch lớp' },
  { id: 'trainers', label: 'Huấn luyện viên' },
  { id: 'pricing', label: 'Gói tập' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Đăng ký' },
]

export const classTypes = ['Tất cả', 'Yoga', 'HIIT', 'Boxing', 'Pilates']

export const trainers = [
  { id: 1, name: 'Minh Anh', role: 'Yoga Master', exp: 8, photo: 'https://i.pravatar.cc/400?img=47',
    bio: 'Chứng chỉ Yoga Alliance RYT-500. Chuyên Hatha và Vinyasa, giúp học viên giảm căng thẳng và cải thiện tư thế.',
    skills: ['Hatha Yoga', 'Vinyasa', 'Thiền'] },
  { id: 2, name: 'Quốc Bảo', role: 'HIIT Coach', exp: 6, photo: 'https://i.pravatar.cc/400?img=12',
    bio: 'Cựu vận động viên điền kinh. Thiết kế giáo án đốt mỡ cường độ cao, phù hợp từ người mới đến nâng cao.',
    skills: ['HIIT', 'Cardio', 'Functional'] },
  { id: 3, name: 'Hoàng Long', role: 'Boxing Coach', exp: 10, photo: 'https://i.pravatar.cc/400?img=15',
    bio: 'Từng thi đấu boxing bán chuyên. Dạy kỹ thuật đấm, né, di chuyển chân và thể lực chiến đấu.',
    skills: ['Boxing', 'Kickfit', 'Conditioning'] },
  { id: 4, name: 'Thu Hà', role: 'Pilates Instructor', exp: 5, photo: 'https://i.pravatar.cc/400?img=32',
    bio: 'Chứng chỉ Pilates Mat và Reformer. Tập trung vào sức mạnh cốt lõi, độ dẻo và phục hồi sau chấn thương.',
    skills: ['Mat Pilates', 'Reformer', 'Core'] },
]

export const classes = [
  { id: 1, name: 'Hatha Yoga', type: 'Yoga', day: 'Thứ 2', time: '18:00', duration: '60 phút', level: 'Cơ bản', trainerId: 1 },
  { id: 2, name: 'HIIT Burn', type: 'HIIT', day: 'Thứ 2', time: '19:30', duration: '45 phút', level: 'Nâng cao', trainerId: 2 },
  { id: 3, name: 'Boxing Cơ bản', type: 'Boxing', day: 'Thứ 3', time: '18:30', duration: '60 phút', level: 'Cơ bản', trainerId: 3 },
  { id: 4, name: 'Mat Pilates', type: 'Pilates', day: 'Thứ 3', time: '19:30', duration: '50 phút', level: 'Cơ bản', trainerId: 4 },
  { id: 5, name: 'Vinyasa Flow', type: 'Yoga', day: 'Thứ 4', time: '06:00', duration: '60 phút', level: 'Trung cấp', trainerId: 1 },
  { id: 6, name: 'HIIT Tabata', type: 'HIIT', day: 'Thứ 4', time: '18:00', duration: '40 phút', level: 'Trung cấp', trainerId: 2 },
  { id: 7, name: 'Boxing Cardio', type: 'Boxing', day: 'Thứ 5', time: '19:00', duration: '60 phút', level: 'Trung cấp', trainerId: 3 },
  { id: 8, name: 'Core Pilates', type: 'Pilates', day: 'Thứ 5', time: '18:00', duration: '50 phút', level: 'Trung cấp', trainerId: 4 },
  { id: 9, name: 'Yoga Thư giãn', type: 'Yoga', day: 'Thứ 6', time: '19:00', duration: '60 phút', level: 'Cơ bản', trainerId: 1 },
  { id: 10, name: 'Fat Burn HIIT', type: 'HIIT', day: 'Thứ 7', time: '08:00', duration: '45 phút', level: 'Nâng cao', trainerId: 2 },
  { id: 11, name: 'Boxing Sparring', type: 'Boxing', day: 'Thứ 7', time: '10:00', duration: '75 phút', level: 'Nâng cao', trainerId: 3 },
  { id: 12, name: 'Sunday Yoga', type: 'Yoga', day: 'Chủ nhật', time: '09:00', duration: '75 phút', level: 'Cơ bản', trainerId: 1 },
]

export const plans = [
  { id: 1, name: 'Basic', price: '299.000', highlight: false,
    perks: ['Dùng phòng gym không giới hạn', 'Tủ đồ cá nhân', '2 buổi PT giới thiệu'] },
  { id: 2, name: 'Pro', price: '499.000', highlight: true,
    perks: ['Toàn bộ quyền lợi Basic', 'Không giới hạn lớp nhóm', 'Đo InBody hằng tháng', 'Khăn và nước miễn phí'] },
  { id: 3, name: 'Elite', price: '799.000', highlight: false,
    perks: ['Toàn bộ quyền lợi Pro', '4 buổi PT 1:1 mỗi tháng', 'Thực đơn dinh dưỡng riêng', 'Ưu tiên đặt lớp'] },
]

export const faqs = [
  { id: 1, q: 'Tập thử có mất phí không?', a: 'Buổi tập thử đầu tiên hoàn toàn miễn phí. Bạn chỉ cần đăng ký trước qua form và mang theo giày thể thao.' },
  { id: 2, q: 'Mình chưa từng tập thì có theo kịp không?', a: 'Có. Các lớp Cơ bản dành cho người mới, huấn luyện viên sẽ chỉnh từng động tác cho bạn.' },
  { id: 3, q: 'Có được bảo lưu gói tập không?', a: 'Gói 3 tháng trở lên được bảo lưu tối đa 30 ngày khi báo trước 3 ngày.' },
  { id: 4, q: 'Phòng tập mở cửa lúc mấy giờ?', a: 'Từ 05:30 đến 22:00 các ngày trong tuần, Chủ nhật đóng cửa lúc 20:00.' },
  { id: 5, q: 'Có chỗ gửi xe và phòng tắm không?', a: 'Có bãi giữ xe miễn phí, phòng tắm nước nóng và tủ đồ cho mọi hội viên.' },
]