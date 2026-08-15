# Aura Jewellery

Premium piercing jewellery website — gold & diamond studs, interactive ear map, visible filters, guides, and dual-email appointments.

## Theme

- **Top & bottom:** Royal blue
- **Centre:** White
- **Accent:** Soft gold

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (GitHub Pages)

Live site: [https://neuroautomatalabs.github.io/AURA-Jewellery/](https://neuroautomatalabs.github.io/AURA-Jewellery/)

Pushes to `main` build a static export and deploy via GitHub Actions. In the repo settings, set **Pages → Source** to **GitHub Actions**.

**Gold rates on Pages:** CJA rates are fetched at build time into `public/gold-rates.json` (also refreshed by a daily scheduled deploy). Local `npm run dev` still uses the live `/api/gold-rate` scrape.

Appointment booking on Pages opens the visitor’s email app (no SMTP server) and also appears in the owner dashboard on that same browser. Local/server deploys can still use the `/api/appointment` route.

**Owner dashboard on Pages:** [https://neuroautomatalabs.github.io/AURA-Jewellery/admin/](https://neuroautomatalabs.github.io/AURA-Jewellery/admin/) — password `aura-demo`. Changes stay in that browser (localStorage) so the client can try products, orders, appointments and custom requests. Razorpay checkout still needs a Node host.

## Appointment emails

Copy `.env.example` → `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-studio@gmail.com
SMTP_PASS=your-app-password
BUSINESS_EMAIL=studio-inbox@yourdomain.com
```

Without SMTP, the form runs in demo mode (logs to the server console).

## Cart payments (Razorpay)

Cart checkout uses **Razorpay** (UPI, cards, netbanking) — not WhatsApp.

1. Create keys at [Razorpay Dashboard → API Keys](https://dashboard.razorpay.com/app/keys).
2. Add to `.env.local`:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

3. Run `npm run dev`, add items to cart, pay with Razorpay test cards/UPI.

**Note:** Payment APIs need a Node server (`npm run dev` / Vercel / similar). GitHub Pages static export removes `/api` routes, so live payments won’t work on Pages alone — deploy the Next app to a host that supports API routes.

## Owner dashboard

Local Node: [http://localhost:3000/admin](http://localhost:3000/admin)

GitHub Pages preview: [https://neuroautomatalabs.github.io/AURA-Jewellery/admin/](https://neuroautomatalabs.github.io/AURA-Jewellery/admin/) — sign in with `aura-demo`. Sample orders and bookings are included so the client can click through the dashboard. Product edits on Pages show on Shop in the same browser.

Local/server deploys persist to `data/aura-store.json`. Add to `.env.local`:

```env
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SECRET=another-long-random-string
```

From the dashboard the owner can:

- See open orders, month revenue, live products, and new bookings
- Filter, add, edit, publish, and delete products (those changes go live on Shop)
- Track each order: paid → confirmed → in production → packed → shipped → delivered, plus cancel / refund / return
- Add courier + tracking, internal notes, and a status timeline
- Manage appointment requests and custom-made requests

Orders are saved when a customer starts Razorpay checkout and marked **Paid** after verification. Product/order data is stored in `data/aura-store.json` on the server (keep a backup if you deploy to a host with an ephemeral filesystem).

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
