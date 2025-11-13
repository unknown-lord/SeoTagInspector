📘 SEO Tag Inspector

SEO Tag Inspector is a full-stack tool that extracts and analyzes essential SEO metadata from any public webpage.
It provides a fast API for scraping meta tags and a modern React + Vite frontend for an interactive UI.

Built using Node.js, TypeScript, Express, Axios, Cheerio, and Vite.

🚀 Features
🔍 SEO Analysis

Extracts key metadata:

Title

Meta description

Canonical URL

Robots meta

Viewport

Open Graph tags (og:title, og:description, og:image)

Twitter Card tags

Twitter image/title/description

⚡ Reliable URL Filtering

Blocks private/local URLs

Allows only public http/https URLs

Validated using Zod

🛠️ Backend

Express server with middleware logging

SEO scraping using Axios

HTML parsing with Cheerio

Error-safe, timed, sanitized requests

Vite middleware dev mode

Serves React app in production

🎨 Frontend

Vite + React

Hot Module Reloading (HMR) in dev

Clean UI for SEO inspection

🏗️ Project Structure
.
├── client/               # React frontend (Vite)
├── server/               # Express backend
├── shared/               # Shared Zod schemas
├── dist/                 # Production build output
├── package.json
└── README.md

📦 Installation
1️⃣ Clone the repo
git clone https://github.com/<your-username>/SeoTagInspector.git
cd SeoTagInspector

2️⃣ Install dependencies
npm install

3️⃣ Install Vite (if missing)
npm install -D vite

4️⃣ Install cross-env (Windows fix)
npm install -D cross-env

🧪 Development

Run the backend + Vite dev server together:

npm run dev


Expected output:

[express] serving on port 5000
[vite] ready in xxx ms


Visit:

http://localhost:5000


Vite handles the frontend, Express handles API requests.

🏭 Production Build
1️⃣ Build frontend
npm run build

2️⃣ Start production server
npm start


The server will:

Serve static files from dist/public

Expose SEO API on /api/analyze-seo

🔌 API Reference
POST /api/analyze-seo
Request Body
{
  "url": "https://example.com"
}

Response (example)
{
  "title": "Example Domain",
  "description": "Example meta description",
  "canonical": "https://example.com",
  "ogTitle": "Example OG Title",
  "ogImage": "https://example.com/og-image.jpg",
  "twitterCard": "summary_large_image",
  "robots": "index, follow",
  "viewport": "width=device-width, initial-scale=1"
}

Possible Errors
{ "error": "Invalid URL. Only public HTTP/HTTPS URLs are allowed." }
{ "error": "Request timed out. The website took too long to respond." }
{ "error": "Could not find the website. Please check the URL and try again." }
{ "error": "Invalid URL format. Please provide a valid URL." }

🧱 Architecture Overview
 ┌────────────────────┐         ┌────────────────────────────┐
 │   React Frontend    │ <────> │      Express Backend        │
 │ (Vite Dev Server)   │         │  API + SSR + Static Assets │
 └────────────────────┘         └────────────▲───────────────┘
                                             │
                                     ┌───────┴────────┐
                                     │   SEO Scraper   │
                                     │ Axios + Cheerio │
                                     └─────────────────┘

Backend Mode Handling
Mode	Behavior
Development	Vite runs in middleware mode with HMR
Production	React SPA served from dist/public
🖼️ Screenshots (Add Yours)

Replace these with real screenshots after building UI.

🔍 SEO Scanner Input

📊 SEO Results Page

🤝 Contributing

PRs and suggestions are welcome!
If you find a bug or want a new feature, open an issue.

📄 License

MIT License © 2025
