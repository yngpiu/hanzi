<div align="center">
  <img src="public/logo.png" alt="Minihanzi Logo" width="150" />
  <h1 align="center">Minihanzi - Từ điển Trung-Việt</h1>

  **A modern, lightning-fast Chinese-Vietnamese dictionary web application.**

  [![React](https://img.shields.io/badge/React-19.3-blue?logo=react&logoColor=white)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
</div>

---

## ✨ Tính năng nổi bật (Features)

- 📖 **Tra cứu chuyên sâu**: Dữ liệu từ vựng Hán-Việt phong phú, phân loại nghĩa theo từ loại (Động từ, Danh từ, Tính từ...) kèm theo nhiều câu ví dụ minh họa ngữ cảnh.
- ✍️ **Sơ đồ nét chữ (Stroke Order)**: Hiển thị và chạy animation hướng dẫn cách viết từng nét của chữ Hán chuẩn xác (tích hợp `hanzi-writer`).
- 🔊 **Phát âm & Karaoke Highlight**: Tính năng đọc audio câu ví dụ đồng bộ highlight từng chữ theo thời gian thực (Karaoke-style) giúp người học dễ dàng nắm bắt nhịp điệu.
- 🤖 **Giải thích ngữ pháp bằng AI**: Tích hợp module AI để giải nghĩa sâu các cấu trúc ngữ pháp khó hiểu trong câu.
- ⚡ **Hiệu năng siêu tốc**: Kiến trúc State cục bộ kết hợp với cơ chế Catching của TanStack Query giúp gõ tìm kiếm không độ trễ.
- 🌓 **Giao diện hiện đại**: Thiết kế tối giản, hỗ trợ tự động chuyển đổi Dark/Light mode dựa theo cấu hình thiết bị.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (powered by [Base UI](https://base-ui.com/))
- **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Cài đặt & Chạy dự án (Getting Started)

### Yêu cầu hệ thống

Hãy chắc chắn máy tính của bạn đã cài đặt [Node.js](https://nodejs.org/) (v20+) và [pnpm](https://pnpm.io/).

### Các bước khởi chạy

1. Clone repository về máy:
```bash
git clone https://github.com/yngpiu/hanzi.git
cd hanzi
```

2. Cài đặt các thư viện (dependencies):
```bash
pnpm install
```

3. Khởi động server môi trường phát triển (Development):
```bash
pnpm dev
```
Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173`.

## 📦 Build lên Production

Để build ra file tĩnh tối ưu nhất cho Production (như Vercel, Cloudflare Pages...):
```bash
pnpm build
```

---

*Được phát triển với mục đích học tập và cung cấp công cụ tra cứu tối ưu nhất cho người học tiếng Trung.*
