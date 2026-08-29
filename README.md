# Aura Jewellery

Premium piercing jewellery website — gold & diamond studs, interactive ear map, visible filters, guides, and dual-email appointments.

## Theme

- **Top & bottom:** Royal blue
- **Centre:** White
- **Accent:** Soft gold

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` → `.env.local` and fill in SMTP, Razorpay, and admin credentials.

## Deploy (Vercel)

Production: [https://aura-jewellery-zeta.vercel.app/](https://aura-jewellery-zeta.vercel.app/)

1. Import the GitHub repo in [Vercel](https://vercel.com).
2. Framework preset: **Next.js** (defaults are fine).
3. Add environment variables from `.env.example`.
4. Deploy — do **not** set `GITHUB_PAGES`.

**Gold rates:** fetched live from CJA on each page load via `/api/gold-rate`. A Vercel cron also pings the route daily as a warm-up.

**Appointment & customize forms:** send email through GoDaddy SMTP when configured.

**Cart:** Razorpay checkout via `/api/checkout/*`.

**Admin:** `/admin` — requires `ADMIN_PASSWORD` and `ADMIN_SECRET` in Vercel env vars.

> **Note:** Product/order data is stored in `data/aura-store.json`. On Vercel the filesystem is ephemeral — orders and admin edits may not persist across deploys until you move to Postgres + cloud uploads.

## Environment variables

```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_USER=info@aurajewellery.in
SMTP_PASS=your-mailbox-password
BUSINESS_EMAIL=info@aurajewellery.in

NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SECRET=another-long-random-string
```

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Product-first home |
| `/shop` | Shop + Gold / Diamond / Ear / Nose filters |
| `/piercings` | Interactive ear map |
| `/guides` | Piercing guides |
| `/appointment` | Booking → email to studio + client |
| `/cart` | Cart → Razorpay payment |
| `/checkout/success` | Payment confirmation |
| `/admin` | Owner dashboard (login required) |
