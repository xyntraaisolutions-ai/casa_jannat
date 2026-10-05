# Casa Jannat

Direct-booking site for Casa Jannat in Jacó, Costa Rica. English lives at `/`. Spanish lives at `/es`.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before taking payment

Rates, the promo code, the cleaning fee, IVA, and the security deposit live in `src/lib/rates.ts`. Experience prices live on each option in `src/content/experiences.ts`. Package savings are calculated from those prices.

Set these when you have them:

- `NEXT_PUBLIC_SITE_URL` — the real domain
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_WHATSAPP` — digits only, country code, no plus. Until this is set, messages open an email.
- `NEXT_PUBLIC_PHONE_DISPLAY` and `NEXT_PUBLIC_PHONE_TEL`
- `NEXT_PUBLIC_INSTAGRAM` and `NEXT_PUBLIC_FACEBOOK`
- `NEXT_PUBLIC_GA4_ID` and `NEXT_PUBLIC_META_PIXEL_ID` — loaded only after the visitor allows analytics

Confirm the overnight maximum (the listing header says 8; the description has also said 6), check-in and checkout times, and have the policy pages reviewed before launch.

A request on this site is not a charge. Dates are held when you confirm them and send payment. Connect a channel manager before promising a live blocked calendar, and Stripe before charging cards here.
