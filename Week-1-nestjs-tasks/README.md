# Tasks API (NestJS)

API quản lý danh sách công việc cá nhân (To-do), xây dựng trên [nestjs-boilerplate của GDSC-DUT](https://github.com/dscdut/nestjs-boilerplate).

## Công nghệ

- NestJS + TypeScript
- PostgreSQL 16 (chạy bằng Docker)
- TypeORM (có migration)
- `class-validator` / `class-transformer` để kiểm tra dữ liệu đầu vào

## Yêu cầu

- Node.js v16+
- Docker Desktop (để chạy PostgreSQL)

## Cách chạy

```bash
# 1. Cài thư viện
npm install

# 2. Tạo file .env từ file mẫu (Windows: copy .env.example .env)
cp .env.example .env

# 3. Bật PostgreSQL bằng Docker (chỉ service db)
docker compose up -d db

# 4. Chạy migration để tạo bảng (có bảng tasks)
npm run typeorm:run-migration

# 5. Chạy app ở chế độ dev
npm run start:dev
```

App chạy ở `http://localhost:3000`, tiền tố API là `/api/v1`.

> Các giá trị trong `.env.example` chỉ là mẫu. Phần `TYPEORM_*` đã khớp với container PostgreSQL trong `docker-compose.yml`. Các khóa Google, Cloudinary, MoMo không cần cho bài này.

## Mô hình dữ liệu (bảng `tasks`)

| Field | Kiểu | Ghi chú |
| :-- | :-- | :-- |
| `id` | number | Tự tăng (`SERIAL`) |
| `title` | string | Bắt buộc, 1 - 255 ký tự |
| `category` | string | Tùy chọn, chủ đề của công việc |
| `description` | string | Tùy chọn |
| `isCompleted` | boolean | Mặc định `false` |
| `createdAt` | Date | Thời điểm tạo |
| `updatedAt` | Date | Thời điểm cập nhật gần nhất |

## Endpoint

| Method | Endpoint | Mô tả | Status thành công |
| :-- | :-- | :-- | :-- |
| POST | `/api/v1/tasks` | Tạo công việc | `201` |
| GET | `/api/v1/tasks` | Lấy danh sách (có lọc) | `200` |
| GET | `/api/v1/tasks/:id` | Lấy chi tiết | `200` |
| PATCH | `/api/v1/tasks/:id` | Cập nhật (mọi field optional) | `200` |
| DELETE | `/api/v1/tasks/:id` | Xóa | `200` |

### Tạo công việc

`POST /api/v1/tasks`

```json
{
  "title": "Học NestJS cơ bản",
  "category": "Backend",
  "description": "Tìm hiểu về DTO, Controller, Service và Module"
}
```

Phản hồi `201 Created`:

```json
{
  "id": 1,
  "title": "Học NestJS cơ bản",
  "category": "Backend",
  "description": "Tìm hiểu về DTO, Controller, Service và Module",
  "isCompleted": false,
  "createdAt": "2026-10-29T07:16:06.960Z",
  "updatedAt": "2026-10-29T07:16:06.960Z"
}
```

### Lấy danh sách

`GET /api/v1/tasks`

Query tùy chọn:

- `isCompleted=true|false`: lọc theo trạng thái hoàn thành
- `category=<chuỗi>`: lọc theo chủ đề

Ví dụ: `GET /api/v1/tasks?isCompleted=true&category=Backend`. Kết quả sắp xếp theo `createdAt` mới nhất trước.

### Cập nhật

`PATCH /api/v1/tasks/:id`, chỉ cần gửi field muốn đổi:

```json
{ "isCompleted": true }
```

### Xóa

`DELETE /api/v1/tasks/:id` trả `200`:

```json
{ "message": "Tasks with ID 1 deleted" }
```

## Xử lý lỗi

| Trường hợp | Status |
| :-- | :-- |
| Dữ liệu không hợp lệ (thiếu `title`, `title` rỗng hoặc dài hơn 255, sai kiểu dữ liệu) | `400 Bad Request` |
| `:id` không phải số | `400 Bad Request` |
| Không tìm thấy bản ghi khi GET, PATCH, DELETE theo `:id` | `404 Not Found` |
| Lỗi hệ thống / mất kết nối DB | `500 Internal Server Error` |

Message của lỗi 404: `Tasks with ID ${id} not found`. Message lỗi được boilerplate xử lý nên khi trả về có thêm tiền tố `errors.`.

## Lựa chọn thiết kế

- `id` dùng số tự tăng thay vì UUID, giống các bảng có sẵn trong boilerplate.
- `DELETE` trả `200` kèm message (đề cho phép `200` hoặc `204`).
- Việc kiểm tra tồn tại (404) nằm ở `TasksService`, controller chỉ nhận request và gọi service.
- Schema DB được tạo bằng migration (`src/database/typeorm/migrations`), không dùng `synchronize`.

## Cấu trúc mã nguồn của module

```
src/modules/tasks/
├── dto/
│   ├── create-task.dto.ts      # dữ liệu tạo mới
│   ├── update-task.dto.ts      # dữ liệu cập nhật (mọi field optional)
│   └── get-tasks-query.dto.ts  # query lọc danh sách
├── tasks.controller.ts         # định nghĩa 5 route
├── tasks.service.ts            # logic nghiệp vụ, truy vấn DB
└── tasks.module.ts             # đăng ký controller, service, entity
src/database/typeorm/
├── entities/task.entity.ts
└── migrations/1793168600000-create-tasks-table.ts
```

## Thử nhanh bằng curl

Trên PowerShell, truyền JSON trực tiếp bằng `-d` dễ bị mất dấu `"`. Nên lưu JSON vào file rồi dùng `-d "@file.json"`:

```powershell
Set-Content -Path create.json -Value '{"title":"Hoc NestJS","category":"Backend"}'
curl.exe -i -X POST http://localhost:3000/api/v1/tasks -H "Content-Type: application/json" -d "@create.json"
curl.exe http://localhost:3000/api/v1/tasks
```
