# Casa Jannat · Jaco Escape

Marketing site for Casa Jannat in Jacó, Costa Rica. Bookings go to Airbnb for now; direct booking is planned. English at `/`, Spanish at `/es`.

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) (or the port Next prints).

## Site settings

Edit root [`constant.properties`](constant.properties), then restart `pnpm run dev` (or rebuild) so values load:

| Key | Purpose |
| --- | --- |
| `site.url` | Canonical domain (`https://jacoescape.com`) |
| `support.email` | Host email |
| `airbnb.url` / `airbnb.id` | Live listing |
| `show_website_dev_in_progress` | `true` / `false` — top “in development” bar |
| `seenstay.embedUrl` | HTTPS SeenStay badge URL (empty hides the section; localhost is ignored in production) |
| `support.whatsapp` | Digits only; empty → email the host |
| `analytics.ga4` / `analytics.metaPixel` | Optional; only load after consent |

## Before launch

- Confirm Airbnb URL, email, check-in/out, and policy pages
- Set a production SeenStay embed URL when you have one (HTTPS)
- Add WhatsApp / phone / social when live
- Add GA4 / Meta Pixel IDs when ready
- Run `pnpm run build` and smoke-test `/`, `/stays/casa-jannat`, `/es`, `/faq`, `/contact`

Experiences on this site are informational only — not bookable here.
