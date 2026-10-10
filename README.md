<div align="center">
  <img src="public/logo.png" alt="Hanzi Logo" width="200" />

  # Hanzi

  **A modern, lightning-fast Chinese-Vietnamese dictionary web application.**

  [![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
</div>

---

## ✨ Features

- 📖 **In-Depth Lookup**: Rich Chinese-Vietnamese vocabulary with meanings grouped by part of speech (verbs, nouns, adjectives...) and plenty of contextual example sentences.
- ✍️ **Stroke Order Diagrams**: Accurate animated stroke-order guides for every Hanzi character, powered by `hanzi-writer`.
- 🔊 **Audio & Karaoke Highlighting**: Listen to example sentences with real-time word-by-word highlighting (Karaoke-style) to easily catch rhythm and pronunciation.
- 🤖 **AI Grammar Explanations**: Built-in AI module to explain tricky grammar structures in depth.
- ⚡ **Lightning Fast**: Local-first state architecture combined with TanStack Query caching for zero-latency search as you type.
- 🌓 **Dark Mode Ready**: Clean, minimal UI with automatic theme switching based on your system preference.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) (powered by [Base UI](https://base-ui.com/))
- **State Management**: [TanStack Query](https://tanstack.com/query)
- **Forms & Validation**: [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev/)
- **Chinese Handwriting**: [hanzi-writer](https://chanind.github.io/hanzi-writer/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v20+) and [pnpm](https://pnpm.io/) installed.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yngpiu/hanzi.git
cd hanzi
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```
The application will be running at `http://localhost:5173`.

## 🌐 Environment Variables

Create a `.env` file in the root directory (optional, used for dynamic SEO generation during build):

```env
VITE_SITE_URL=https://your-domain.com
```

## 📦 Build for Production

To build an optimized static bundle for production (Vercel, Cloudflare Pages, etc.):
```bash
pnpm build
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
