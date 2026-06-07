---
Task ID: 1
Agent: Main Agent
Task: Import xCelero Labs project from GitHub repo https://github.com/Questy708/celero

Work Log:
- Cloned the GitHub repository to /tmp/celero
- Analyzed project structure: Next.js 16 app with hash-based client-side router (Artemis), 20+ pages, 7 API routes, Prisma SQLite database, shadcn/ui components
- Copied src/artemis/ directory (router, components, pages, data) - 25+ files
- Updated core app files: page.tsx, layout.tsx, globals.css
- Copied all API routes (admin, capital, careers, programs, applications)
- Updated Prisma schema with 5 models (Subscriber, InvestmentInquiry, Application, JobApplication, ProgramApplication)
- Pushed Prisma schema to database (db:push)
- Copied public assets (favicon, logo, manifest, robots.txt, program images, route images, sector images)
- Installed missing npm dependencies: katex, react-markdown, react-syntax-highlighter, rehype-katex, remark-gfm, remark-math, @types/katex, @types/react-syntax-highlighter
- Updated next.config.ts with allowedDevOrigins for preview domain
- Started dev server and verified all pages render correctly
- Lint passes cleanly with no errors

Stage Summary:
- Successfully imported the xCelero Labs project from GitHub
- All 20+ pages verified working: Home, About, Approach, Capital, Careers, Community, Insights, Manifesto, Platform, Programs, Routes, TownSquare, Ventures, and more
- API routes operational: /api, /api/admin, /api/capital/invest, /api/capital/subscribe, /api/careers/apply, /api/programs/apply, /api/applications
- Database schema with 5 models pushed to SQLite
- Mobile responsive layout confirmed (hamburger menu on mobile, full nav on desktop)
- No compilation errors or runtime errors
