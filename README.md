# Bhadrakshi Saw Mill & Furniture Industry — website

Marketing and enquiry site for the saw mill and furniture workshop in masuriya-3, Dang, Lumbini Province, Nepal.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript** — every page is statically generated
- **Tailwind CSS 4** for styling
- **Three.js** via **React Three Fiber** — the procedural log → boards → chair scene (no model or image downloads)
- **GSAP ScrollTrigger** — scroll-scrubbed "How a log becomes a chair" section
- **Motion** (Framer Motion) — reveals, menu, catalogue filter, form states
- **Lenis** — smooth scrolling
- **Zod** — server-side validation of the enquiry form

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Where to edit

| What | File |
| --- | --- |
| Business name, address, phone, email, WhatsApp, hours | `src/lib/site.ts` |
| Products, categories, sizes | `src/lib/products.ts` |
| Product drawings | `src/components/product-drawing.tsx` |
| Home page copy | `src/app/page.tsx`, `src/components/home/` |
| Colours and type | `src/app/globals.css` |
| Security headers / CSP | `next.config.ts` |

## Enquiry form

The form posts to a Server Action (`src/app/contact/actions.ts`) which validates input, rejects bots (honeypot) and rate-limits per IP.

- With `RESEND_API_KEY` and `ENQUIRY_TO_EMAIL` set (see `.env.example`), each enquiry is emailed through [Resend](https://resend.com).
- Without them, enquiries are appended to `.data/enquiries.jsonl` — fine for local development or a single self-hosted server, but **not** for serverless hosts such as Vercel, where the filesystem is read-only. Set the email variables before deploying there.

## Before going live

1. Confirm the opening hours in `src/lib/site.ts` (still placeholders).
2. Set `NEXT_PUBLIC_SITE_URL` to the real domain.
3. Configure email delivery for the enquiry form.
4. Review the product list and wording so it matches what the business actually makes.
