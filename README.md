# Vue.js Base Project

A modern Vue.js base project with TypeScript, Vite, Pinia, Vue Router, and more.

## Features

- ⚡️ [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework
- 🎯 [TypeScript](https://www.typescriptlang.org/) - Type safety and enhanced IDE support
- 📦 [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- 🗃️ [Pinia](https://pinia.vuejs.org/) - State management with persistence support
- 🌍 [Vue I18n](https://vue-i18n.intlify.dev/) - Internationalization
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🔄 [Vue Router](https://router.vuejs.org/) - Official router for Vue.js
- 📡 [Axios](https://axios-http.com/) - Promise based HTTP client
- 🕒 [Day.js](https://day.js.org/) - Date and time manipulation
- 🔧 [Auto Import](https://github.com/antfu/unplugin-auto-import) - Auto import components and APIs
- 🔄 [PM2](https://pm2.keymetrics.io/) - Production process manager

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

4. Start production server:
```bash
pm2 start ecosystem.config.cjs
```

## Environment Variables

If you don't have an `.env` file, create a copy from the example (`.env.example`) and set it up.

## Project Configuration

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `ecosystem.config.cjs` - PM2 deployment configuration

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build

## Directory Structure

```
.
├── src/
│   ├── api/              # API integration files
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── components/       # Reusable Vue components
│   ├── composables/      # Vue composition functions
│   ├── core/            # Core application logic
│   ├── locales/         # i18n translation files
│   ├── pages/           # Page components
│   ├── routes/          # Vue Router configuration
│   ├── store/           # Pinia store modules
│   ├── types/           # TypeScript type definitions
│   ├── App.vue          # Root Vue component
│   ├── main.ts          # Application entry point
│   └── vite-env.d.ts    # Vite environment declarations
├── public/
│   └── vite.svg         # Public assets
├── app.cjs              # Application server configuration
├── auto-imports.d.ts    # Auto-generated imports declaration
├── components.d.ts      # Auto-generated components declaration
├── ecosystem.config.cjs # PM2 deployment configuration
├── index.html          # Entry HTML file
├── package.json        # Project dependencies and scripts
├── pnpm-lock.yaml      # PNPM lock file
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── tsconfig.node.json  # TypeScript Node configuration
└── vite.config.ts      # Vite configuration
```