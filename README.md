# Momence SDR Handbook

The SDR Handbook site (Cloudflare Worker + static assets), now with certifications.

- `src/worker.mjs` – sign-in check (Cloudflare Access), page and asset routing.
- `src/certs/api.mjs` – certification API: quiz engine, progress, team view, admin tools.
- `src/certs/bank-f1.json` – the approved F1 question bank. Edit here, then use the admin "sync bank" action; changed questions get a new version and old attempts keep what the rep saw.
- `public/` – the handbook page, slides, PDFs, `quiz.html`, and the certifications add-on (`content/certs.js`, `content/certs.css`).
- `migrations/` – database schema (Cloudflare D1).
- `wrangler.jsonc` – deploys the **test** copy (`sdr-handbook-test`). The live handbook is a separate Worker and is not touched by this config.

Training videos are not included in this repo yet; the test copy shows them as unavailable.
