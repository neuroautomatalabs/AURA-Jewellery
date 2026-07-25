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

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Product-first home |
| `/shop` | Shop + ear map + Gold / Diamond / 18K / 22K filters |
| `/piercings` | Interactive ear map |
| `/guides` | Piercing guides |
| `/appointment` | Booking → email to studio + client |
