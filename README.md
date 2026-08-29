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

Without `DATABASE_URL`, the app uses `data/aura-store.json` locally. Without `BLOB_READ_WRITE_TOKEN`, uploads go to `public/uploads/`.

## Deploy (Vercel)

Production: [https://aura-jewellery-zeta.vercel.app/](https://aura-jewellery-zeta.vercel.app/)

### 1. Connect Postgres (orders, products, admin data)

1. In [Vercel](https://vercel.com) → your project → **Storage** → **Create Database** → **Postgres** (or connect [Neon](https://neon.tech)).
2. Link it to the project — Vercel adds `DATABASE_URL` automatically.
3. Redeploy. The app creates the `aura_store` table on first request.

Optional manual init:

```bash
DATABASE_URL=postgresql://... npm run db:init
```

### 2. Connect Blob (product & custom-request photos)

1. Vercel project → **Storage** → **Create Store** → **Blob**.
2. Link to the project — Vercel adds `BLOB_READ_WRITE_TOKEN`.
3. Redeploy.

### 3. Other environment variables

Add SMTP, Razorpay, and admin vars (see `.env.example`). Do **not** set `GITHUB_PAGES`.

**Gold rates:** live from CJA via `/api/gold-rate`.

**Cart:** Razorpay checkout via `/api/checkout/*`.

**Admin:** `/admin` with `ADMIN_PASSWORD` + `ADMIN_SECRET`.

## Environment variables

```env
DATABASE_URL=postgresql://...
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

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
